import type { Product } from '@/types';

// KRUPS API Configuration
const KRUPS_API_URL = import.meta.env.DEV
  ? '/krups-api'
  : (import.meta.env.VITE_KRUPS_API_URL || 'https://ai-search-api-krups-production.containerapps.ru');

const CAPTCHA_SITE_KEY = import.meta.env.VITE_YANDEX_SMARTCAPTCHA_SITE_KEY;

// Declare smartCaptcha global
declare global {
  interface Window {
    smartCaptcha?: {
      render: (containerId: string, options: {
        sitekey: string;
        invisible?: boolean;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
      }) => number;
      execute: (widgetId?: number) => void;
      reset: (widgetId?: number) => void;
    };
  }
}

// ============================================
// ID Generation
// ============================================

export function generateSessionId(): string {
  return `session-${crypto.randomUUID()}`;
}

export function generateUserId(): string {
  // API requires: user-{uuid} format
  return `user-${crypto.randomUUID()}`;
}

// ============================================
// Auth State Management
// ============================================

interface AuthState {
  userId: string;
  accessToken: string;
  expiresAt: number;
}

const AUTH_STORAGE_KEY = 'krups_auth';

function getStoredAuth(): AuthState | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;

    const auth = JSON.parse(stored) as AuthState;

    // Check if token is expired (with 5 min buffer)
    if (auth.expiresAt < Date.now() + 5 * 60 * 1000) {
      console.log('[KRUPS Auth] Token expired, clearing');
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return auth;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function saveAuth(auth: AuthState): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  console.log('[KRUPS Auth] Token saved, expires:', new Date(auth.expiresAt).toISOString());
}

function clearAuth(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

// ============================================
// CAPTCHA Integration
// ============================================

let captchaScriptLoaded = false;
let captchaScriptLoading: Promise<void> | null = null;

function loadCaptchaScript(): Promise<void> {
  if (captchaScriptLoaded && window.smartCaptcha) {
    return Promise.resolve();
  }

  if (captchaScriptLoading) {
    return captchaScriptLoading;
  }

  console.log('[KRUPS Auth] Loading CAPTCHA script...');

  captchaScriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('[KRUPS Auth] CAPTCHA script loaded');
      captchaScriptLoaded = true;
      resolve();
    };

    script.onerror = () => {
      console.error('[KRUPS Auth] Failed to load CAPTCHA script');
      captchaScriptLoading = null;
      reject(new Error('Failed to load CAPTCHA script'));
    };

    document.head.appendChild(script);
  });

  return captchaScriptLoading;
}

async function getCaptchaToken(): Promise<string> {
  await loadCaptchaScript();

  // Wait for smartCaptcha to be available
  let attempts = 0;
  while (!window.smartCaptcha && attempts < 50) {
    await new Promise(r => setTimeout(r, 100));
    attempts++;
  }

  if (!window.smartCaptcha) {
    throw new Error('SmartCaptcha not available after loading');
  }

  console.log('[KRUPS Auth] Getting CAPTCHA token (invisible mode)...');

  return new Promise((resolve, reject) => {
    const containerId = `captcha-${Date.now()}`;
    const container = document.createElement('div');
    container.id = containerId;
    container.style.display = 'none';
    document.body.appendChild(container);

    try {
      window.smartCaptcha!.render(containerId, {
        sitekey: CAPTCHA_SITE_KEY,
        invisible: true,
        callback: (token: string) => {
          console.log('[KRUPS Auth] CAPTCHA token received');
          container.remove();
          resolve(token);
        },
        'error-callback': () => {
          console.error('[KRUPS Auth] CAPTCHA verification failed');
          container.remove();
          reject(new Error('CAPTCHA verification failed'));
        },
      });
    } catch (err) {
      container.remove();
      reject(err);
      return;
    }

    // Execute CAPTCHA after short delay (without widgetId as per docs)
    setTimeout(() => {
      console.log('[KRUPS Auth] Executing CAPTCHA...');
      window.smartCaptcha?.execute();
    }, 500);
  });
}

// ============================================
// User Creation & Token Management
// ============================================

async function createUser(): Promise<AuthState> {
  const generatedUserId = generateUserId();
  console.log('[KRUPS Auth] Creating user:', generatedUserId);

  const captchaToken = await getCaptchaToken();
  console.log('[KRUPS Auth] CAPTCHA token length:', captchaToken?.length);

  const requestBody = {
    userId: generatedUserId,
    captchaToken,
    isAnonymous: true,
  };
  console.log('[KRUPS Auth] Request body (token truncated):', {
    ...requestBody,
    captchaToken: captchaToken?.substring(0, 50) + '...',
  });

  const response = await fetch(`${KRUPS_API_URL}/auth/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[KRUPS Auth] Create user failed:', response.status);
    console.error('[KRUPS Auth] Response headers:', Object.fromEntries(response.headers.entries()));
    console.error('[KRUPS Auth] Response body:', errorText || '(empty)');
    throw new Error(`Failed to create user: ${response.status} - ${errorText || 'Server error'}`);
  }

  const data = await response.json();
  console.log('[KRUPS Auth] User created successfully, response:', JSON.stringify(data, null, 2));

  // Handle different response structures - API may return in various formats
  const returnedUserId = data.result?.userId || data.result?.user?.userId || data.user?.userId || data.userId || generatedUserId;
  const accessToken = data.result?.accessToken || data.result?.token?.accessToken || data.token?.accessToken || data.accessToken;

  if (!accessToken) {
    console.error('[KRUPS Auth] Invalid response structure - missing accessToken:', data);
    throw new Error('Invalid response from create-user endpoint: missing accessToken');
  }

  const auth: AuthState = {
    userId: returnedUserId,
    accessToken,
    expiresAt: Date.now() + 23 * 60 * 60 * 1000, // 23 hours
  };

  saveAuth(auth);
  return auth;
}

async function refreshToken(userId: string): Promise<AuthState> {
  console.log('[KRUPS Auth] Refreshing token for:', userId);

  const response = await fetch(`${KRUPS_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    console.log('[KRUPS Auth] Token refresh failed, need to re-authenticate');
    clearAuth();
    return createUser();
  }

  const data = await response.json();
  console.log('[KRUPS Auth] Token refreshed successfully');

  const auth: AuthState = {
    userId,
    accessToken: data.result.token.accessToken,
    expiresAt: Date.now() + 23 * 60 * 60 * 1000,
  };

  saveAuth(auth);
  return auth;
}

async function getValidAuth(): Promise<AuthState> {
  // Check for existing valid auth
  const existingAuth = getStoredAuth();
  if (existingAuth) {
    console.log('[KRUPS Auth] Using existing token');
    return existingAuth;
  }

  // Create new user with CAPTCHA
  return createUser();
}

// ============================================
// Authenticated Fetch
// ============================================

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const auth = await getValidAuth();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${auth.accessToken}`,
    },
  });

  // Handle 401 - token expired
  if (response.status === 401) {
    console.log('[KRUPS Auth] Got 401, refreshing token...');
    const newAuth = await refreshToken(auth.userId);

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${newAuth.accessToken}`,
      },
    });
  }

  return response;
}

// ============================================
// API Response Types
// ============================================

interface CheckQueryResponse {
  result: {
    vibe: string;
    needsProductSearch: boolean;
    userId: string;
    sessionId: string;
  };
}

interface FindProductsResponse {
  result: {
    documents: KrupsProduct[];
    totalFound: number;
    appliedFilters: Record<string, unknown>;
  };
}

interface KrupsProduct {
  id: string;
  title: string;
  price?: number;
  oldPrice?: number;
  description?: string;
  imageUrl?: string;
  image?: string;
  category?: string;
  metadata?: Record<string, unknown>;
}

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: (fullMessage: string, products?: Product[]) => void;
  onError: (error: Error) => void;
}

// ============================================
// Product Transformation
// ============================================

function transformProduct(doc: KrupsProduct): Product {
  return {
    id: doc.id,
    title: doc.title,
    image: doc.imageUrl || doc.image || 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop',
    oldPrice: doc.oldPrice || doc.price || 0,
    newPrice: doc.price || 0,
    currency: '€',
    discount: doc.oldPrice && doc.price ? `-${Math.round((1 - doc.price / doc.oldPrice) * 100)}%` : undefined,
  };
}

// ============================================
// Session Management
// ============================================

interface SessionState {
  sessionId: string;
  products: Product[];
}

let currentSession: SessionState | null = null;

export function getCurrentSession(): SessionState {
  if (!currentSession) {
    currentSession = {
      sessionId: generateSessionId(),
      products: [],
    };
  }
  return currentSession;
}

export function resetSession(): void {
  currentSession = {
    sessionId: generateSessionId(),
    products: [],
  };
}

// ============================================
// API Methods
// ============================================

async function checkQuery(question: string, sessionId: string): Promise<CheckQueryResponse['result']> {
  const auth = await getValidAuth();
  console.log('[KRUPS API] checkQuery:', { question, sessionId });

  const response = await authFetch(`${KRUPS_API_URL}/checkQuery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
      sessionId,
      userId: auth.userId,
      isAnonymous: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`checkQuery failed: ${response.status} - ${error}`);
  }

  const data: CheckQueryResponse = await response.json();
  console.log('[KRUPS API] checkQuery result:', data.result);
  return data.result;
}

async function findProducts(question: string, sessionId: string): Promise<Product[]> {
  const auth = await getValidAuth();
  console.log('[KRUPS API] findProducts:', { question, sessionId });

  const response = await authFetch(`${KRUPS_API_URL}/findProducts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
      sessionId,
      userId: auth.userId,
      limit: 10,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`findProducts failed: ${response.status} - ${error}`);
  }

  const data: FindProductsResponse = await response.json();
  console.log('[KRUPS API] findProducts result:', data.result.documents?.length, 'products');

  const products = (data.result.documents || []).map(transformProduct);

  const session = getCurrentSession();
  session.products = products;

  return products;
}

async function generateAnswerStream(
  sessionId: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const auth = await getValidAuth();
  console.log('[KRUPS API] generateAnswer (streaming):', { sessionId });

  const response = await fetch(`${KRUPS_API_URL}/generateAnswer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      'Authorization': `Bearer ${auth.accessToken}`,
    },
    body: JSON.stringify({
      sessionId,
      userId: auth.userId,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`generateAnswer failed: ${response.status} - ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  let fullMessage = '';

  console.log('[KRUPS API] Starting to read stream...');

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      console.log('[KRUPS API] Stream done, fullMessage length:', fullMessage.length);
      break;
    }

    const chunk = decoder.decode(value, { stream: true });
    console.log('[KRUPS API] Raw chunk:', chunk.substring(0, 200));
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        console.log('[KRUPS API] SSE data:', data.substring(0, 100));

        if (data === '[DONE]') {
          const session = getCurrentSession();
          callbacks.onComplete(fullMessage, session.products);
          return;
        }

        try {
          const parsed = JSON.parse(data);

          // Handle different response formats:
          // 1. {"message": "chunk"} - streaming chunks
          // 2. {"type": "content", "text": "chunk"} - documented format
          // 3. {"result": {"answer": "..."}} - final complete response
          // 4. {"type": "done"} - stream end signal

          if (parsed.message) {
            // Actual API format: {"message": "chunk"}
            fullMessage += parsed.message;
            callbacks.onChunk(parsed.message);
          } else if (parsed.type === 'content' && parsed.text) {
            // Documented format
            fullMessage += parsed.text;
            callbacks.onChunk(parsed.text);
          } else if (parsed.result?.answer) {
            // Final response with complete answer - use it if we haven't accumulated anything
            if (!fullMessage) {
              fullMessage = parsed.result.answer;
            }
            const session = getCurrentSession();
            callbacks.onComplete(fullMessage, session.products);
            return;
          } else if (parsed.type === 'done') {
            const session = getCurrentSession();
            callbacks.onComplete(fullMessage, session.products);
            return;
          } else if (parsed.content) {
            fullMessage += parsed.content;
            callbacks.onChunk(parsed.content);
          }
        } catch {
          // Not JSON, might be plain text
          if (data.trim()) {
            fullMessage += data;
            callbacks.onChunk(data);
          }
        }
      }
    }
  }

  console.log('[KRUPS API] Stream complete, total message:', fullMessage.substring(0, 100));
  const session = getCurrentSession();
  callbacks.onComplete(fullMessage, session.products);
}

// ============================================
// Main Export: Send Message
// ============================================

export async function sendKrupsMessage(
  message: string,
  callbacks: StreamCallbacks
): Promise<void> {
  try {
    const session = getCurrentSession();

    // Step 1: Check Query
    await checkQuery(message, session.sessionId);

    // Step 2: Find Products
    await findProducts(message, session.sessionId);

    // Step 3: Generate Answer with streaming
    await generateAnswerStream(session.sessionId, callbacks);
  } catch (error) {
    console.error('[KRUPS API] Error:', error);
    callbacks.onError(error instanceof Error ? error : new Error('Unknown error'));
  }
}

// ============================================
// Additional: Get Suggestions
// ============================================

export async function getKrupsSuggestions(): Promise<string[]> {
  try {
    const auth = await getValidAuth();
    const session = getCurrentSession();

    const response = await authFetch(`${KRUPS_API_URL}/generateSuggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: session.sessionId,
        userId: auth.userId,
      }),
    });

    if (!response.ok) {
      console.warn('[KRUPS API] generateSuggestions failed:', response.status);
      return [];
    }

    const data = await response.json();
    return data.result?.suggestions || [];
  } catch (error) {
    console.error('[KRUPS API] generateSuggestions error:', error);
    return [];
  }
}
