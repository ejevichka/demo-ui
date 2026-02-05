import type { Product } from '@/types';
import { createSSEParser } from './sseParser';

// Bluemarket (Sport & Outdoor) API Configuration - always use proxy to avoid CORS
const BLUEMARKET_API_URL = '/bluemarket-api';

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

function generateSessionId(): string {
  return `session-${crypto.randomUUID()}`;
}

function generateUserId(): string {
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

const AUTH_STORAGE_KEY = 'bluemarket_auth';

function getStoredAuth(): AuthState | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;

    const auth = JSON.parse(stored) as AuthState;

    if (auth.expiresAt < Date.now() + 5 * 60 * 1000) {
      console.log('[BLUEMARKET Auth] Token expired, clearing');
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
  console.log('[BLUEMARKET Auth] Token saved, expires:', new Date(auth.expiresAt).toISOString());
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

  console.log('[BLUEMARKET Auth] Loading CAPTCHA script...');

  captchaScriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('[BLUEMARKET Auth] CAPTCHA script loaded');
      captchaScriptLoaded = true;
      resolve();
    };

    script.onerror = () => {
      console.error('[BLUEMARKET Auth] Failed to load CAPTCHA script');
      captchaScriptLoading = null;
      reject(new Error('Failed to load CAPTCHA script'));
    };

    document.head.appendChild(script);
  });

  return captchaScriptLoading;
}

async function getCaptchaToken(): Promise<string> {
  await loadCaptchaScript();

  let attempts = 0;
  while (!window.smartCaptcha && attempts < 50) {
    await new Promise(r => setTimeout(r, 100));
    attempts++;
  }

  if (!window.smartCaptcha) {
    throw new Error('SmartCaptcha not available after loading');
  }

  console.log('[BLUEMARKET Auth] Getting CAPTCHA token (invisible mode)...');

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
          console.log('[BLUEMARKET Auth] CAPTCHA token received');
          container.remove();
          resolve(token);
        },
        'error-callback': () => {
          console.error('[BLUEMARKET Auth] CAPTCHA verification failed');
          container.remove();
          reject(new Error('CAPTCHA verification failed'));
        },
      });
    } catch (err) {
      container.remove();
      reject(err);
      return;
    }

    setTimeout(() => {
      console.log('[BLUEMARKET Auth] Executing CAPTCHA...');
      window.smartCaptcha?.execute();
    }, 500);
  });
}

// ============================================
// User Creation & Token Management
// ============================================

async function createUser(): Promise<AuthState> {
  const generatedUserId = generateUserId();
  console.log('[BLUEMARKET Auth] Creating user:', generatedUserId);

  const captchaToken = await getCaptchaToken();
  console.log('[BLUEMARKET Auth] CAPTCHA token length:', captchaToken?.length);

  const requestBody = {
    userId: generatedUserId,
    captchaToken,
    isAnonymous: true,
  };

  const response = await fetch(`${BLUEMARKET_API_URL}/auth/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[BLUEMARKET Auth] Create user failed:', response.status);
    throw new Error(`Failed to create user: ${response.status} - ${errorText || 'Server error'}`);
  }

  const data = await response.json();
  console.log('[BLUEMARKET Auth] User created successfully');

  const returnedUserId = data.result?.userId || data.result?.user?.userId || data.user?.userId || data.userId || generatedUserId;
  const accessToken = data.result?.accessToken || data.result?.token?.accessToken || data.token?.accessToken || data.accessToken;

  if (!accessToken) {
    console.error('[BLUEMARKET Auth] Invalid response structure - missing accessToken:', data);
    throw new Error('Invalid response from create-user endpoint: missing accessToken');
  }

  const auth: AuthState = {
    userId: returnedUserId,
    accessToken,
    expiresAt: Date.now() + 23 * 60 * 60 * 1000,
  };

  saveAuth(auth);
  return auth;
}

async function refreshToken(userId: string): Promise<AuthState> {
  console.log('[BLUEMARKET Auth] Refreshing token for:', userId);

  const response = await fetch(`${BLUEMARKET_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    console.log('[BLUEMARKET Auth] Token refresh failed, need to re-authenticate');
    clearAuth();
    return createUser();
  }

  const data = await response.json();
  console.log('[BLUEMARKET Auth] Token refreshed successfully');

  const auth: AuthState = {
    userId,
    accessToken: data.result.token.accessToken,
    expiresAt: Date.now() + 23 * 60 * 60 * 1000,
  };

  saveAuth(auth);
  return auth;
}

async function getValidAuth(): Promise<AuthState> {
  const existingAuth = getStoredAuth();
  if (existingAuth) {
    console.log('[BLUEMARKET Auth] Using existing token');
    return existingAuth;
  }

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

  if (response.status === 401) {
    console.log('[BLUEMARKET Auth] Got 401, refreshing token...');
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
    documents: BluemarketProduct[];
    totalFound: number;
    appliedFilters: Record<string, unknown>;
  };
}

interface BluemarketProduct {
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
  onSuggestionsReceived?: (suggestions: string[]) => void;
  onError: (error: Error) => void;
}

// ============================================
// Product Transformation
// ============================================

function transformProduct(doc: BluemarketProduct): Product {
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

/**
 * Transform array of products from SSE displayedProducts
 */
function transformSSEProducts(rawProducts: unknown[]): Product[] {
  return rawProducts.map(p => transformProduct(p as BluemarketProduct));
}

// ============================================
// Session Management
// ============================================

interface SessionState {
  sessionId: string;
  products: Product[];
}

let currentSession: SessionState | null = null;

function getCurrentSession(): SessionState {
  if (!currentSession) {
    currentSession = {
      sessionId: generateSessionId(),
      products: [],
    };
  }
  return currentSession;
}

export function resetBluemarketSession(): void {
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
  console.log('[BLUEMARKET API] checkQuery:', { question, sessionId });

  const response = await authFetch(`${BLUEMARKET_API_URL}/checkQuery`, {
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
  console.log('[BLUEMARKET API] checkQuery result:', data.result);
  return data.result;
}

async function findProducts(question: string, sessionId: string): Promise<Product[]> {
  const auth = await getValidAuth();
  console.log('[BLUEMARKET API] findProducts:', { question, sessionId });

  const response = await authFetch(`${BLUEMARKET_API_URL}/findProducts`, {
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
  console.log('[BLUEMARKET API] findProducts result:', data.result.documents?.length, 'products');

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
  console.log('[BLUEMARKET API] generateAnswer (streaming):', { sessionId });

  const response = await fetch(`${BLUEMARKET_API_URL}/generateAnswer`, {
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
  const parser = createSSEParser();
  let fullMessage = '';
  // Track products from SSE stream (from result.displayedProducts)
  let sseProducts: Product[] | undefined;

  console.log('[BLUEMARKET API] Starting to read stream...');

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      console.log('[BLUEMARKET API] Stream done, fullMessage length:', fullMessage.length);
      // Process any remaining buffered content
      const results = parser.flush();
      for (const result of results) {
        if (result.content) {
          fullMessage += result.content;
          callbacks.onChunk(result.content);
        }
        // Extract products from SSE if present
        if (result.products && result.products.length > 0) {
          sseProducts = transformSSEProducts(result.products);
          console.log('[BLUEMARKET API] Got products from SSE flush:', sseProducts.length);
        }
        // result.answer is the authoritative final version - always use it
        if (result.fullAnswer) {
          fullMessage = result.fullAnswer;
        }
      }
      break;
    }

    const chunk = decoder.decode(value, { stream: true });

    // Use SSE parser with proper buffering
    const results = parser.processChunk(chunk);

    for (const result of results) {
      // Extract products from SSE if present (from result.displayedProducts)
      if (result.products && result.products.length > 0) {
        sseProducts = transformSSEProducts(result.products);
        console.log('[BLUEMARKET API] Got products from SSE:', sseProducts.length);
      }

      if (result.done) {
        // result.answer is the authoritative final version - always use it
        if (result.fullAnswer) {
          fullMessage = result.fullAnswer;
        }
        // Only use products explicitly provided by backend in displayedProducts
        console.log('[BLUEMARKET API] Products from SSE:', sseProducts?.length ?? 0);
        callbacks.onComplete(fullMessage, sseProducts);
        return;
      }

      if (result.content) {
        fullMessage += result.content;
        callbacks.onChunk(result.content);
      }
    }
  }

  console.log('[BLUEMARKET API] Stream complete');
  // Only use products explicitly provided by backend in displayedProducts
  console.log('[BLUEMARKET API] Final products from SSE:', sseProducts?.length ?? 0);
  callbacks.onComplete(fullMessage, sseProducts);
}

// ============================================
// Generate Suggestions
// ============================================

export async function getBluemarketSuggestions(): Promise<string[]> {
  try {
    const auth = await getValidAuth();
    const session = getCurrentSession();

    console.log('[BLUEMARKET API] generateSuggestions:', { sessionId: session.sessionId });

    const response = await authFetch(`${BLUEMARKET_API_URL}/generateSuggestions`, {
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
      console.warn('[BLUEMARKET API] generateSuggestions failed:', response.status);
      return [];
    }

    const data = await response.json();
    console.log('[BLUEMARKET API] generateSuggestions result:', data.result?.suggestions);
    return data.result?.suggestions || [];
  } catch (error) {
    console.error('[BLUEMARKET API] generateSuggestions error:', error);
    return [];
  }
}

// ============================================
// Main Export: Send Message
// ============================================

export async function sendBluemarketMessage(
  message: string,
  callbacks: StreamCallbacks
): Promise<void> {
  try {
    const session = getCurrentSession();

    await checkQuery(message, session.sessionId);
    await findProducts(message, session.sessionId);
    await generateAnswerStream(session.sessionId, callbacks);

    // Fetch suggestions after answer is complete
    if (callbacks.onSuggestionsReceived) {
      const suggestions = await getBluemarketSuggestions();
      callbacks.onSuggestionsReceived(suggestions);
    }
  } catch (error) {
    console.error('[BLUEMARKET API] Error:', error);
    callbacks.onError(error instanceof Error ? error : new Error('Unknown error'));
  }
}

// ============================================
// Feedback: Submit user feedback for a message
// ============================================

interface FeedbackRequest {
  messageId: string;
  isPositive: boolean;
  comment?: string;
}

interface FeedbackResponse {
  result: {
    success: boolean;
    feedback: {
      isPositive: boolean;
      comment?: string;
      timestamp: string;
    };
  };
}

export async function submitBluemarketFeedback(request: FeedbackRequest): Promise<FeedbackResponse> {
  try {
    const session = getCurrentSession();

    console.log('[BLUEMARKET API] submitFeedback:', {
      sessionId: session.sessionId,
      messageId: request.messageId,
      isPositive: request.isPositive,
    });

    const response = await authFetch(
      `${BLUEMARKET_API_URL}/sessions/${session.sessionId}/messages/${request.messageId}/feedback`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPositive: request.isPositive,
          comment: request.comment,
        }),
      }
    );

    if (!response.ok) {
      console.warn('[BLUEMARKET API] submitFeedback failed:', response.status);
      return {
        result: {
          success: true,
          feedback: {
            isPositive: request.isPositive,
            comment: request.comment,
            timestamp: new Date().toISOString(),
          },
        },
      };
    }

    return response.json();
  } catch (error) {
    console.error('[BLUEMARKET API] submitFeedback error:', error);
    return {
      result: {
        success: true,
        feedback: {
          isPositive: request.isPositive,
          comment: request.comment,
          timestamp: new Date().toISOString(),
        },
      },
    };
  }
}
