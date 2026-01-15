import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Settings, ImageIcon, Mic, X, ArrowUp, CornerDownRight, HelpCircle, Send, ArrowRight, Sparkles, Radio, History, Trash2 } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { suggestedQuestionsByTheme } from '@/lib/themes';
import { ChatMessage } from '@/components/ai/ChatMessage';
import {
  sendChatMessageMock,
  createUserMessage,
  createAssistantMessage,
} from '@/lib/api';
import { sendKrupsMessage, resetSession as resetKrupsSession } from '@/lib/krupsApi';
import { sendBluemarketMessage, resetBluemarketSession } from '@/lib/bluemarketApi';
import { sendBeautyMessage, resetBeautySession } from '@/lib/beautyApi';
import {
  loadAllChatHistories,
  saveChatHistory,
  clearChatHistory,
  getThemeSessions,
  switchToSession,
  deleteSession,
  type ChatSession,
} from '@/lib/chatHistory';
import type { ChatMessage as ChatMessageType } from '@/types';

// Liquid Glass 2025+ Animation Configuration
const SLIDE_DURATION = 1.0; // Stage 1: button → inputBar (slower, premium feel)
const MORPH_DURATION = 0.7; // Stage 2: inputBar → expanded

const SPRING_SLIDE = {
  type: 'spring' as const,
  damping: 35,
  stiffness: 100,
  mass: 1.2,
};

const SPRING_MORPH = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 120,
  mass: 1,
};

// Three-stage animation states
type ChatStage = 'collapsed' | 'inputBar' | 'expanded';

// Store chat state per theme
type ThemeChatState = {
  messages: ChatMessageType[];
  inputValue: string;
};

export function AISearchBar() {
  const { theme, themeName } = useTheme();
  const isDark = theme.isDark;
  const [stage, setStage] = useState<ChatStage>('inputBar');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [apiSuggestions, setApiSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputBarRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevStageRef = useRef<ChatStage | null>(null);

  // Per-theme chat state - initialize from localStorage
  const [chatStateByTheme, setChatStateByTheme] = useState<Record<string, ThemeChatState>>(() => {
    return loadAllChatHistories();
  });
  const prevThemeRef = useRef(themeName);

  // Get current theme's chat state
  const currentChatState = chatStateByTheme[themeName] || { messages: [], inputValue: '' };
  const messages = currentChatState.messages;
  const inputValue = currentChatState.inputValue;

  // Update input value for current theme
  const setInputValue = (value: string) => {
    setChatStateByTheme(prev => ({
      ...prev,
      [themeName]: { ...prev[themeName], messages: prev[themeName]?.messages || [], inputValue: value }
    }));
  };

  // Update messages for current theme
  const setMessages = (updater: ChatMessageType[] | ((prev: ChatMessageType[]) => ChatMessageType[])) => {
    setChatStateByTheme(prev => {
      const currentMessages = prev[themeName]?.messages || [];
      const newMessages = typeof updater === 'function' ? updater(currentMessages) : updater;
      return {
        ...prev,
        [themeName]: { ...prev[themeName], inputValue: prev[themeName]?.inputValue || '', messages: newMessages }
      };
    });
  };

  // Reset loading state when theme changes
  useEffect(() => {
    if (prevThemeRef.current !== themeName) {
      setIsLoading(false);
      prevThemeRef.current = themeName;
    }
  }, [themeName]);

  // Save chat history to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0 || inputValue) {
      saveChatHistory(themeName, { messages, inputValue });
    }
  }, [messages, inputValue, themeName]);

  // Load sessions when history panel opens or theme changes
  useEffect(() => {
    if (showHistory) {
      const data = getThemeSessions(themeName);
      setSessions(data.sessions);
    }
  }, [showHistory, themeName]);

  // Close history panel, disclaimer and clear API suggestions when theme changes
  useEffect(() => {
    setShowHistory(false);
    setShowDisclaimer(false);
    setApiSuggestions([]);
  }, [themeName]);

  const hasMessages = messages.length > 0;
  const isCollapsed = stage === 'collapsed';
  const isInputBar = stage === 'inputBar';
  const isExpanded = stage === 'expanded';
  const suggestedQuestions = suggestedQuestionsByTheme[themeName] || suggestedQuestionsByTheme.brownmarket;

  // Listen for openAIChat event from AI Agent button
  useEffect(() => {
    const handleOpenChat = () => setStage('inputBar');
    window.addEventListener('openAIChat', handleOpenChat);
    return () => window.removeEventListener('openAIChat', handleOpenChat);
  }, []);

  // Focus input when stage changes (only on actual transitions, not initial mount)
  useEffect(() => {
    const wasCollapsed = prevStageRef.current === 'collapsed';
    const wasInputBar = prevStageRef.current === 'inputBar';

    // Only auto-focus when transitioning FROM collapsed TO inputBar
    if (isInputBar && wasCollapsed && inputBarRef.current) {
      setTimeout(() => inputBarRef.current?.focus(), SLIDE_DURATION * 500);
    }
    // Auto-focus when expanding
    if (isExpanded && wasInputBar && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), MORPH_DURATION * 400);
    }

    prevStageRef.current = stage;
  }, [stage, isInputBar, isExpanded]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Click outside to close (simplified dependency)
  useEffect(() => {
    if (stage === 'collapsed') return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Ignore clicks inside product modal (rendered via Portal)
      if (target.closest('[data-product-modal="true"]')) {
        return;
      }
      if (containerRef.current && !containerRef.current.contains(target)) {
        setStage(stage === 'expanded' ? 'inputBar' : 'collapsed');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [stage]);

  const handleButtonClick = () => {
    setStage('inputBar');
  };

  const handleInputFocus = () => {
    if (isInputBar) {
      setStage('expanded');
    }
  };

  const handleCollapse = () => {
    if (isExpanded) {
      setStage('inputBar');
    } else {
      setStage('collapsed');
    }
  };

  const handleFullClose = () => {
    setStage('collapsed');
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isLoading) return;

    // Expand to full window when sending from inputBar
    if (stage !== 'expanded') {
      setStage('expanded');
    }

    const userMessage = createUserMessage(text.trim());
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const assistantMessage = createAssistantMessage('', true);
    setMessages((prev) => [...prev, assistantMessage]);

    const callbacks = {
      onChunk: (chunk: string) => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.role === 'assistant') {
            lastMessage.content += chunk;
          }
          return updated;
        });
      },
      onComplete: (fullMessage: string, products?: typeof assistantMessage.products) => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.role === 'assistant') {
            lastMessage.content = fullMessage;
            lastMessage.isStreaming = false;
            lastMessage.products = products;
          }
          return updated;
        });
        setIsLoading(false);
      },
      onError: (error: Error) => {
        console.error('Chat error:', error);
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.role === 'assistant') {
            lastMessage.content = 'Sorry, an error occurred. Please try again.';
            lastMessage.isStreaming = false;
          }
          return updated;
        });
        setIsLoading(false);
      },
      onSuggestionsReceived: (suggestions: string[]) => {
        setApiSuggestions(suggestions);
      },
    };

    if (themeName === 'brownmarket') {
      await sendKrupsMessage(text.trim(), callbacks);
    } else if (themeName === 'bluemarket') {
      await sendBluemarketMessage(text.trim(), callbacks);
    } else if (themeName === 'brainform') {
      await sendBeautyMessage(text.trim(), callbacks);
    } else {
      await sendChatMessageMock({ message: text, theme: themeName }, callbacks);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleSend();
    }
    if (e.key === 'Escape') {
      handleCollapse();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
    setApiSuggestions([]);
    clearChatHistory(themeName);
    if (themeName === 'brownmarket') {
      resetKrupsSession();
    } else if (themeName === 'bluemarket') {
      resetBluemarketSession();
    } else if (themeName === 'brainform') {
      resetBeautySession();
    }
    setShowHistory(false);
  };

  const handleSwitchSession = (sessionId: string) => {
    const session = switchToSession(themeName, sessionId);
    if (session) {
      setMessages(session.messages);
      setInputValue('');
      setShowHistory(false);
    }
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSession(themeName, sessionId);
    // Refresh sessions list
    const data = getThemeSessions(themeName);
    setSessions(data.sessions);
    // If deleted current session, load the new active one
    if (data.activeSessionId) {
      const activeSession = data.sessions.find(s => s.id === data.activeSessionId);
      if (activeSession) {
        setMessages(activeSession.messages);
      }
    } else {
      setMessages([]);
    }
  };

  const getAssistantDescription = () => {
    if (theme.id === 'brownmarket') {
      return 'Ask a question or describe what you are looking for, and I will help you find the best solution among KRUPS coffee machines.';
    }
    if (theme.id === 'redmarket') {
      return 'Ask a question or describe what you are looking for, and I will help you find the best electronics for your needs.';
    }
    if (theme.id === 'bluemarket') {
      return 'Ask a question or describe what you are looking for, and I will help you find the best outdoor gear.';
    }
    if (theme.id === 'brainform') {
      return 'Ask a question about beauty, skincare, fragrance, or haircare products.';
    }
    return 'Ask a question or describe what you are looking for, and I will help you find the best solution.';
  };

  // Calculate glow color based on theme
  const primaryGlow = theme.id === 'brownmarket' ? '255, 107, 0' :
                      theme.id === 'bluemarket' ? '0, 72, 217' :
                      theme.id === 'brainform' ? '184, 149, 69' : '195, 0, 0';

  // Animation dimensions for each stage
  // Use dvh (dynamic viewport height) for Safari iOS compatibility
  // Use smaller margins on mobile to prevent overflow
  const stageStyles = {
    collapsed: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },
    inputBar: {
      width: 'min(600px, calc(100vw - 32px))',
      height: 56,
      borderRadius: 28,
    },
    expanded: {
      width: 'min(782px, calc(100vw - 32px))',
      height: 'min(532px, calc(100dvh - 100px))',
      borderRadius: 12,
    },
  };

  return (
    <LayoutGroup>
      {/* Backdrop blur - only for expanded state */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{
              opacity: 1,
              backdropFilter: 'blur(20px)',
              transition: {
                opacity: { duration: MORPH_DURATION * 0.5, ease: 'easeOut' },
                backdropFilter: { duration: MORPH_DURATION, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            exit={{
              opacity: 0,
              backdropFilter: 'blur(0px)',
              transition: {
                opacity: { duration: MORPH_DURATION * 0.3 },
                backdropFilter: { duration: MORPH_DURATION * 0.5 }
              }
            }}
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            onClick={() => setStage('inputBar')}
          />
        )}
      </AnimatePresence>

      {/* Main morphing container */}
      <motion.div
        ref={containerRef}
        layout
        layoutId="ai-chat-morph"
        className={`fixed z-50 overflow-hidden ${isCollapsed ? 'cursor-pointer' : ''} ${!isCollapsed ? 'left-1/2 -translate-x-1/2' : ''}`}
        onClick={isCollapsed ? handleButtonClick : undefined}
        style={{
          // Position changes based on stage
          // Collapsed: bottom-right, Others: horizontally centered via Tailwind classes
          // Use safe-area-inset for iOS notch/home indicator
          bottom: isExpanded ? 'max(16px, env(safe-area-inset-bottom))' : 24,
          ...(isCollapsed ? { right: 24 } : {}),
        }}
        initial={false}
        animate={{
          ...stageStyles[stage],
          boxShadow: isExpanded
            ? `0 32px 64px rgba(0, 0, 0, 0.25), 0 0 80px rgba(${primaryGlow}, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.1)`
            : isInputBar
            ? `0 16px 48px rgba(0, 0, 0, 0.2), 0 0 40px rgba(${primaryGlow}, 0.15)`
            : `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0px rgba(${primaryGlow}, 0)`,
        }}
        whileHover={isCollapsed ? {
          scale: 1.1,
          boxShadow: `0 12px 40px rgba(0, 0, 0, 0.25), 0 0 30px rgba(${primaryGlow}, 0.4)`,
        } : undefined}
        whileTap={isCollapsed ? { scale: 0.95 } : undefined}
        transition={{
          layout: isExpanded ? SPRING_MORPH : SPRING_SLIDE,
          boxShadow: {
            duration: isExpanded ? MORPH_DURATION : SLIDE_DURATION,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }}
      >
        {/* Specular Highlight - slides across during stage transitions */}
        <AnimatePresence>
          {(isInputBar || isExpanded) && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                key={stage}
                className="absolute inset-0 w-[30%]"
                style={{
                  background: `linear-gradient(
                    105deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.12) 45%,
                    rgba(255, 255, 255, 0.25) 50%,
                    rgba(255, 255, 255, 0.12) 55%,
                    transparent 100%
                  )`,
                }}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{
                  x: '400%',
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: isExpanded ? MORPH_DURATION * 1.2 : SLIDE_DURATION * 1.2,
                  ease: [0.22, 1, 0.36, 1] as const,
                  delay: 0.1,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content based on stage */}
        <AnimatePresence mode="wait">
          {isCollapsed && (
            // Stage 1: Button
            <motion.div
              key="button-content"
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.12 } }}
              transition={{ duration: 0.2, delay: 0.05 }}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </motion.div>
          )}

          {isInputBar && (
            // Stage 2: Input Bar only - slides from right to left
            <motion.div
              key="inputbar-content"
              className="w-full h-full flex items-center gap-3 px-4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
              transition={{
                opacity: { duration: 0.3, delay: SLIDE_DURATION * 0.2 },
                x: { ...SPRING_SLIDE, delay: SLIDE_DURATION * 0.1 }
              }}
              style={{
                backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
                border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                borderRadius: 28,
              }}
            >
              {/* AI Icon */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                <Sparkles className="w-4 h-4" />
              </div>

              {/* Input */}
              <input
                ref={inputBarRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                placeholder="Ask AI anything..."
                className="flex-1 bg-transparent border-none outline-none text-[14px]"
                style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
              />

              {/* Send button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
                style={{
                  backgroundColor: inputValue.trim() ? 'var(--primary)' : (isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'),
                  color: inputValue.trim() ? '#FFFFFF' : (isDark ? 'var(--neutral-400)' : 'var(--neutral-500)'),
                }}
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFullClose}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                  color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)',
                }}
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>
          )}

          {isExpanded && (
            // Stage 3: Full chat panel
            <motion.div
              key="panel-content"
              className="w-full h-full flex flex-col"
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                  opacity: { duration: MORPH_DURATION * 0.5, delay: MORPH_DURATION * 0.2 },
                  filter: { duration: MORPH_DURATION * 0.4, delay: MORPH_DURATION * 0.3 }
                }
              }}
              exit={{
                opacity: 0,
                filter: 'blur(4px)',
                transition: { duration: 0.15 }
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
                border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                borderRadius: 12,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)' }}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <button
                      onClick={() => { setShowDisclaimer(!showDisclaimer); setShowHistory(false); }}
                      className="p-1.5 rounded-lg transition-colors hover:bg-black/5"
                      style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
                      title="About AI Shopping Mode"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>

                    {/* Disclaimer popup */}
                    <AnimatePresence>
                      {showDisclaimer && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-64 p-3 rounded-xl shadow-xl z-50"
                          style={{
                            backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
                            border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                          }}
                        >
                          <p
                            className="text-[13px] leading-relaxed"
                            style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-600)' }}
                          >
                            AI Shopping Mode is in beta and can make mistakes.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {!hasMessages && (
                    <h2
                      className="text-[20px] font-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      AI Shopping Mode
                    </h2>
                  )}
                  {hasMessages && (
                    <button
                      onClick={handleNewChat}
                      className="text-[13px] px-3 py-1.5 rounded-lg transition-colors hover:opacity-70"
                      style={{
                        color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)',
                        backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                      }}
                    >
                      New chat
                    </button>
                  )}
                  {/* History button */}
                  <div className="relative">
                    <button
                      onClick={() => { setShowHistory(!showHistory); setShowDisclaimer(false); }}
                      className="p-1.5 rounded-lg transition-colors hover:bg-black/5"
                      style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
                      title="Chat history"
                    >
                      <History className="w-5 h-5" />
                    </button>

                    {/* History dropdown - centered on mobile, under icon on desktop */}
                    <AnimatePresence>
                      {showHistory && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="fixed left-1/2 -translate-x-1/2 top-[55px] md:absolute md:top-full md:left-0 md:translate-x-0 mt-2 w-72 max-w-[calc(100vw-48px)] md:max-w-none max-h-80 overflow-y-auto rounded-xl shadow-xl z-[60]"
                          style={{
                            backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
                            border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                          }}
                        >
                          <div className="p-3 border-b" style={{ borderColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)' }}>
                            <h3 className="text-sm font-semibold" style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}>
                              Chat History
                            </h3>
                          </div>
                          {sessions.length === 0 ? (
                            <div className="p-4 text-center text-sm" style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}>
                              No previous chats
                            </div>
                          ) : (
                            <div className="p-2">
                              {sessions.map((session) => (
                                <button
                                  key={session.id}
                                  onClick={() => handleSwitchSession(session.id)}
                                  className="w-full flex items-center justify-between gap-2 p-2 rounded-lg text-left transition-colors hover:bg-black/5 group"
                                >
                                  <div className="flex-1 min-w-0">
                                    <div
                                      className="text-sm font-medium truncate"
                                      style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                                    >
                                      {session.title}
                                    </div>
                                    <div
                                      className="text-xs"
                                      style={{ color: isDark ? 'var(--neutral-500)' : 'var(--neutral-400)' }}
                                    >
                                      {new Date(session.updatedAt).toLocaleDateString()}
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => handleDeleteSession(session.id, e)}
                                    className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10"
                                    style={{ color: '#ef4444' }}
                                    title="Delete chat"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCollapse}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                    color: isDark ? '#FFFFFF' : 'var(--neutral-600)',
                  }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Content area */}
              <div
                className="flex-1 overflow-y-auto px-5 py-4"
                style={{ minHeight: 0 }}
              >
                {!hasMessages ? (
                  <>
                    <p
                      className="text-[15px] leading-relaxed mb-5"
                      style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-700)' }}
                    >
                      {getAssistantDescription()}
                    </p>

                    {/* Suggested questions */}
                    <div className="space-y-3">
                      {suggestedQuestions.map((q, index) => (
                        <motion.button
                          key={q.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleSend(q.text)}
                          className="flex items-start gap-3 w-full text-left transition-colors hover:opacity-70"
                        >
                          <CornerDownRight
                            className="w-4 h-4 mt-1 flex-shrink-0"
                            style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                          />
                          <span
                            className="text-[15px] font-medium"
                            style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                          >
                            {q.text}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ChatMessage message={message} />
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />

                    {/* Follow-up suggestions from API */}
                    {hasMessages && !isLoading && apiSuggestions.length > 0 && (
                      <div className="pt-3">
                        <p className="text-[11px] mb-2" style={{ color: 'var(--neutral-500)' }}>
                          You might also be interested in
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {apiSuggestions.slice(0, 3).map((suggestion, index) => (
                            <motion.button
                              key={`suggestion-${index}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.03 }}
                              onClick={() => handleSend(suggestion)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px]"
                              style={{
                                backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                                color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                              }}
                            >
                              {suggestion}
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Input area */}
              <div className="px-5 py-4 border-t" style={{ borderColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)' }}>
                {/* Desktop: Icons + Input + Send in one row */}
                <div className="hidden md:flex items-center gap-3">
                  {/* Icons */}
                  <div className="flex items-center gap-2">
                    {[Settings, ImageIcon, Mic].map((Icon, i) => (
                      <Icon
                        key={i}
                        className="w-5 h-5 cursor-pointer transition-colors hover:opacity-70"
                        style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                      />
                    ))}
                  </div>

                  {/* Input */}
                  <div
                    className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl"
                    style={{
                      backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                      border: `1px solid ${isDark ? 'var(--neutral-600)' : 'var(--primary)'}`,
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-transparent border-none outline-none text-[14px]"
                      style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Send button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: inputValue.trim() ? 'var(--primary)' : (isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'),
                      color: inputValue.trim() ? '#FFFFFF' : (isDark ? 'var(--neutral-400)' : 'var(--neutral-500)'),
                    }}
                  >
                    {hasMessages ? <Send className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                  </motion.button>

                  {/* Live button */}
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium"
                    style={{
                      backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                      color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                    }}
                  >
                    <Radio className="w-4 h-4" />
                    <span>Live</span>
                  </button>
                </div>

                {/* Mobile: Input row + Icons row below */}
                <div className="flex md:hidden flex-col gap-3">
                  {/* Input row */}
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl"
                      style={{
                        backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                        border: `1px solid ${isDark ? 'var(--neutral-600)' : 'var(--primary)'}`,
                      }}
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything..."
                        className="flex-1 bg-transparent border-none outline-none text-[15px]"
                        style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Send button */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend()}
                      disabled={!inputValue.trim() || isLoading}
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                      style={{
                        backgroundColor: inputValue.trim() ? 'var(--primary)' : (isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'),
                        color: inputValue.trim() ? '#FFFFFF' : (isDark ? 'var(--neutral-400)' : 'var(--neutral-500)'),
                      }}
                    >
                      {hasMessages ? <Send className="w-5 h-5" /> : <ArrowUp className="w-5 h-5" />}
                    </motion.button>
                  </div>

                  {/* Icons row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {[Settings, ImageIcon, Mic].map((Icon, i) => (
                        <Icon
                          key={i}
                          className="w-5 h-5 cursor-pointer transition-colors hover:opacity-70"
                          style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                        />
                      ))}
                    </div>
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium"
                      style={{
                        backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                        color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                      }}
                    >
                      <Radio className="w-4 h-4" />
                      <span>Live</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
