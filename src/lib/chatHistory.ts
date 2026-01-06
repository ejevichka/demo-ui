import type { ChatMessage } from '@/types';

const SESSIONS_KEY_PREFIX = 'chat_sessions_';

export interface StoredChatState {
  messages: ChatMessage[];
  inputValue: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}

export interface ThemeSessions {
  activeSessionId: string | null;
  sessions: ChatSession[];
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get title from first user message or default
 */
function getTitleFromMessages(messages: ChatMessage[]): string {
  const firstUserMessage = messages.find(m => m.role === 'user');
  if (firstUserMessage?.content) {
    const text = firstUserMessage.content.slice(0, 40);
    return text.length < firstUserMessage.content.length ? `${text}...` : text;
  }
  return 'New chat';
}

/**
 * Get all sessions for a theme
 */
export function getThemeSessions(themeName: string): ThemeSessions {
  try {
    const stored = localStorage.getItem(`${SESSIONS_KEY_PREFIX}${themeName}`);
    if (!stored) {
      return { activeSessionId: null, sessions: [] };
    }
    return JSON.parse(stored) as ThemeSessions;
  } catch {
    console.warn(`[ChatHistory] Failed to load sessions for ${themeName}`);
    return { activeSessionId: null, sessions: [] };
  }
}

/**
 * Save all sessions for a theme
 */
function saveThemeSessions(themeName: string, data: ThemeSessions): void {
  try {
    localStorage.setItem(`${SESSIONS_KEY_PREFIX}${themeName}`, JSON.stringify(data));
  } catch (error) {
    console.warn(`[ChatHistory] Failed to save sessions for ${themeName}:`, error);
  }
}

/**
 * Get or create active session for a theme
 */
export function getActiveSession(themeName: string): ChatSession | null {
  const data = getThemeSessions(themeName);
  if (!data.activeSessionId) return null;
  return data.sessions.find(s => s.id === data.activeSessionId) || null;
}

/**
 * Create a new session and make it active
 */
export function createNewSession(themeName: string): ChatSession {
  const data = getThemeSessions(themeName);
  const newSession: ChatSession = {
    id: generateSessionId(),
    title: 'New chat',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [],
  };

  data.sessions.unshift(newSession);
  data.activeSessionId = newSession.id;
  saveThemeSessions(themeName, data);

  return newSession;
}

/**
 * Update active session with new messages
 */
export function updateActiveSession(themeName: string, messages: ChatMessage[]): void {
  const data = getThemeSessions(themeName);

  // If no active session, create one
  if (!data.activeSessionId) {
    const newSession = createNewSession(themeName);
    data.activeSessionId = newSession.id;
    data.sessions = [newSession, ...data.sessions.filter(s => s.id !== newSession.id)];
  }

  const sessionIndex = data.sessions.findIndex(s => s.id === data.activeSessionId);
  if (sessionIndex !== -1) {
    data.sessions[sessionIndex].messages = messages;
    data.sessions[sessionIndex].updatedAt = Date.now();
    data.sessions[sessionIndex].title = getTitleFromMessages(messages);
    saveThemeSessions(themeName, data);
  }
}

/**
 * Switch to a different session
 */
export function switchToSession(themeName: string, sessionId: string): ChatSession | null {
  const data = getThemeSessions(themeName);
  const session = data.sessions.find(s => s.id === sessionId);

  if (session) {
    data.activeSessionId = sessionId;
    saveThemeSessions(themeName, data);
    return session;
  }

  return null;
}

/**
 * Delete a session
 */
export function deleteSession(themeName: string, sessionId: string): void {
  const data = getThemeSessions(themeName);
  data.sessions = data.sessions.filter(s => s.id !== sessionId);

  if (data.activeSessionId === sessionId) {
    data.activeSessionId = data.sessions[0]?.id || null;
  }

  saveThemeSessions(themeName, data);
}

/**
 * Clear all sessions for a theme
 */
export function clearAllSessions(themeName: string): void {
  try {
    localStorage.removeItem(`${SESSIONS_KEY_PREFIX}${themeName}`);
  } catch {
    console.warn(`[ChatHistory] Failed to clear sessions for ${themeName}`);
  }
}

// ============================================
// Legacy functions for backward compatibility
// ============================================

export function getChatHistory(themeName: string): StoredChatState {
  const session = getActiveSession(themeName);
  return {
    messages: session?.messages || [],
    inputValue: '',
  };
}

export function saveChatHistory(themeName: string, state: StoredChatState): void {
  if (state.messages.length > 0) {
    updateActiveSession(themeName, state.messages);
  }
}

export function clearChatHistory(themeName: string): void {
  const data = getThemeSessions(themeName);
  if (data.activeSessionId) {
    // Don't delete, just create a new session
    createNewSession(themeName);
  }
}

export function loadAllChatHistories(): Record<string, StoredChatState> {
  const histories: Record<string, StoredChatState> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(SESSIONS_KEY_PREFIX)) {
      const themeName = key.replace(SESSIONS_KEY_PREFIX, '');
      histories[themeName] = getChatHistory(themeName);
    }
  }

  return histories;
}
