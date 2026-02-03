import type { Product } from '@/types';
import { createSSEParser } from './sseParser';

// Beauty (Cosmetics) API Configuration - always use proxy to avoid CORS
const BEAUTY_API_URL = '/beauty-api';

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

const AUTH_STORAGE_KEY = 'beauty_auth';

function getStoredAuth(): AuthState | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;

    const auth = JSON.parse(stored) as AuthState;

    if (auth.expiresAt < Date.now() + 5 * 60 * 1000) {
      console.log('[BEAUTY Auth] Token expired, clearing');
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
  console.log('[BEAUTY Auth] Token saved, expires:', new Date(auth.expiresAt).toISOString());
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

  console.log('[BEAUTY Auth] Loading CAPTCHA script...');

  captchaScriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('[BEAUTY Auth] CAPTCHA script loaded');
      captchaScriptLoaded = true;
      resolve();
    };

    script.onerror = () => {
      console.error('[BEAUTY Auth] Failed to load CAPTCHA script');
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

  console.log('[BEAUTY Auth] Getting CAPTCHA token (invisible mode)...');

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
          console.log('[BEAUTY Auth] CAPTCHA token received');
          container.remove();
          resolve(token);
        },
        'error-callback': () => {
          console.error('[BEAUTY Auth] CAPTCHA verification failed');
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
      console.log('[BEAUTY Auth] Executing CAPTCHA...');
      window.smartCaptcha?.execute();
    }, 500);
  });
}

// ============================================
// User Creation & Token Management
// ============================================

async function createUser(): Promise<AuthState> {
  const generatedUserId = generateUserId();
  console.log('[BEAUTY Auth] Creating user:', generatedUserId);

  const captchaToken = await getCaptchaToken();
  console.log('[BEAUTY Auth] CAPTCHA token length:', captchaToken?.length);

  const requestBody = {
    userId: generatedUserId,
    captchaToken,
    isAnonymous: true,
  };

  const response = await fetch(`${BEAUTY_API_URL}/auth/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[BEAUTY Auth] Create user failed:', response.status);
    throw new Error(`Failed to create user: ${response.status} - ${errorText || 'Server error'}`);
  }

  const data = await response.json();
  console.log('[BEAUTY Auth] User created successfully');

  const returnedUserId = data.result?.userId || data.result?.user?.userId || data.user?.userId || data.userId || generatedUserId;
  const accessToken = data.result?.accessToken || data.result?.token?.accessToken || data.token?.accessToken || data.accessToken;

  if (!accessToken) {
    console.error('[BEAUTY Auth] Invalid response structure - missing accessToken:', data);
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
  console.log('[BEAUTY Auth] Refreshing token for:', userId);

  const response = await fetch(`${BEAUTY_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    console.log('[BEAUTY Auth] Token refresh failed, need to re-authenticate');
    clearAuth();
    return createUser();
  }

  const data = await response.json();
  console.log('[BEAUTY Auth] Token refreshed successfully');

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
    console.log('[BEAUTY Auth] Using existing token');
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
    console.log('[BEAUTY Auth] Got 401, refreshing token...');
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
    documents: BeautyProduct[];
    totalFound: number;
    appliedFilters: Record<string, unknown>;
  };
}

interface BeautyProduct {
  id: string;
  title: string;
  price?: number;
  oldPrice?: number;
  priceOld?: number;
  description?: string;
  imageUrl?: string;
  image?: string;
  category?: string;
  availability?: boolean;
  url?: string;
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

function transformProduct(doc: BeautyProduct): Product {
  const oldPrice = doc.oldPrice || doc.priceOld || doc.price || 0;
  const newPrice = doc.price || 0;
  return {
    id: doc.id,
    title: doc.title,
    image: doc.imageUrl || doc.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    oldPrice,
    newPrice,
    currency: '€',
    discount: oldPrice > newPrice ? `-${Math.round((1 - newPrice / oldPrice) * 100)}%` : undefined,
    description: doc.description,
    availability: doc.availability,
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

function getCurrentSession(): SessionState {
  if (!currentSession) {
    currentSession = {
      sessionId: generateSessionId(),
      products: [],
    };
  }
  return currentSession;
}

export function resetBeautySession(): void {
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
  console.log('[BEAUTY API] checkQuery:', { question, sessionId });

  const response = await authFetch(`${BEAUTY_API_URL}/checkQuery`, {
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
  console.log('[BEAUTY API] checkQuery result:', data.result);
  return data.result;
}

async function findProducts(question: string, sessionId: string): Promise<Product[]> {
  const auth = await getValidAuth();
  console.log('[BEAUTY API] findProducts:', { question, sessionId });

  const response = await authFetch(`${BEAUTY_API_URL}/findProducts`, {
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
  console.log('[BEAUTY API] findProducts result:', data.result.documents?.length, 'products');

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
  console.log('[BEAUTY API] generateAnswer (streaming):', { sessionId });

  const response = await fetch(`${BEAUTY_API_URL}/generateAnswer`, {
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

  console.log('[BEAUTY API] Starting to read stream...');

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      console.log('[BEAUTY API] Stream done, fullMessage length:', fullMessage.length);
      // Process any remaining buffered content
      const results = parser.flush();
      for (const result of results) {
        if (result.content) {
          fullMessage += result.content;
          callbacks.onChunk(result.content);
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
      if (result.done) {
        // result.answer is the authoritative final version - always use it
        if (result.fullAnswer) {
          fullMessage = result.fullAnswer;
        }
        const session = getCurrentSession();
        callbacks.onComplete(fullMessage, session.products);
        return;
      }

      if (result.content) {
        fullMessage += result.content;
        callbacks.onChunk(result.content);
      }
    }
  }

  console.log('[BEAUTY API] Stream complete');
  const session = getCurrentSession();
  callbacks.onComplete(fullMessage, session.products);
}

// ============================================
// Main Export: Send Message
// ============================================

export async function sendBeautyMessage(
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
      const suggestions = await getBeautySuggestions();
      callbacks.onSuggestionsReceived(suggestions);
    }
  } catch (error) {
    console.error('[BEAUTY API] Error:', error);
    callbacks.onError(error instanceof Error ? error : new Error('Unknown error'));
  }
}

// ============================================
// Additional: Get Suggestions
// ============================================

export async function getBeautySuggestions(): Promise<string[]> {
  try {
    const auth = await getValidAuth();
    const session = getCurrentSession();

    const response = await authFetch(`${BEAUTY_API_URL}/generateSuggestions`, {
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
      console.warn('[BEAUTY API] generateSuggestions failed:', response.status);
      return [];
    }

    const data = await response.json();
    return data.result?.suggestions || [];
  } catch (error) {
    console.error('[BEAUTY API] generateSuggestions error:', error);
    return [];
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

export async function submitBeautyFeedback(request: FeedbackRequest): Promise<FeedbackResponse> {
  try {
    const session = getCurrentSession();

    console.log('[BEAUTY API] submitFeedback:', {
      sessionId: session.sessionId,
      messageId: request.messageId,
      isPositive: request.isPositive,
    });

    const response = await authFetch(
      `${BEAUTY_API_URL}/sessions/${session.sessionId}/messages/${request.messageId}/feedback`,
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
      console.warn('[BEAUTY API] submitFeedback failed:', response.status);
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
    console.error('[BEAUTY API] submitFeedback error:', error);
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
