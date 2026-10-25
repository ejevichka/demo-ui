/**
 * Analytics service for tracking user visits and interactions.
 * Sends events to Google Sheets via Apps Script webhook.
 */

import { REQUIRE_LOGIN } from './access';

const WEBHOOK_URL = import.meta.env.VITE_ANALYTICS_WEBHOOK_URL as string | undefined;

interface UserInfo {
  userId?: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

function getUserInfo(): UserInfo | null {
  // With the access gate off (src/lib/access.ts) no form collects these details, so a record left
  // in localStorage by an earlier visit must not be attached to today's events: the visitor sees
  // no form and gives no consent, yet their name, email and company would still be sent.
  if (!REQUIRE_LOGIN) {
    return null;
  }

  try {
    const stored = localStorage.getItem('brainform_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

async function sendEvent(event: string, extra?: Record<string, unknown>): Promise<void> {
  if (!WEBHOOK_URL) {
    console.debug('[Analytics] No webhook URL configured, skipping event:', event);
    return;
  }

  const user = getUserInfo();

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        userId: user?.userId,
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        company: user?.company,
        extra,
        timestamp: new Date().toISOString(),
      }),
    });
    console.debug('[Analytics] Event sent:', event);
  } catch (error) {
    console.warn('[Analytics] Failed to send event:', event, error);
  }
}

export const analytics = {
  /**
   * Track user login with their details
   */
  trackLogin: (user: UserInfo): void => {
    sendEvent('login', {
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
    });
  },

  /**
   * Track when user selects an industry
   */
  trackIndustrySelect: (industry: string): void => {
    sendEvent('industry_select', { industry });
  },

  /**
   * Track chat messages sent by user
   */
  trackChatMessage: (industry: string, question: string): void => {
    sendEvent('chat_message', { industry, question });
  },

  /**
   * Track when user views a product (opens modal)
   */
  trackProductView: (industry: string, productId: string, productTitle: string): void => {
    sendEvent('product_view', { industry, productId, productTitle });
  },
};
