import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ImageIcon, FileText, Mic, X, ArrowUp, CornerDownRight, PanelLeft, Send, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { suggestedQuestions } from '@/lib/themes';
import { ChatMessage } from '@/components/ai/ChatMessage';
import {
  sendChatMessageMock,
  createUserMessage,
  createAssistantMessage,
} from '@/lib/api';
import { sendKrupsMessage, resetSession as resetKrupsSession } from '@/lib/krupsApi';
import type { ChatMessage as ChatMessageType } from '@/types';

export function AISearchBar() {
  const { theme, themeName } = useTheme();
  const isDark = theme.isDark;
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isExpanded]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isLoading) return;

    if (!isExpanded) {
      setIsExpanded(true);
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
    };

    if (themeName === 'brownmarket') {
      await sendKrupsMessage(text.trim(), callbacks);
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
    if (themeName === 'brownmarket') {
      resetKrupsSession();
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

  return (
    <>
      {/* Backdrop blur when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            onClick={handleCollapse}
          />
        )}
      </AnimatePresence>

      {/* Floating button (collapsed state) */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExpand}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            <ArrowUpRight className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel (expanded state) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[560px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
                border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)' }}>
                <div className="flex items-center gap-3">
                  <button
                    className="p-1.5 rounded-lg transition-colors hover:bg-black/5"
                    style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
                  >
                    <PanelLeft className="w-5 h-5" />
                  </button>
                  {!hasMessages && (
                    <h2
                      className="text-[20px] font-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      AI Smart assistant
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
                className="overflow-y-auto px-5 py-4"
                style={{ maxHeight: '400px' }}
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

                    {/* Follow-up suggestions */}
                    {hasMessages && !isLoading && (
                      <div className="pt-3">
                        <p className="text-[11px] mb-2" style={{ color: 'var(--neutral-500)' }}>
                          You might also be interested in
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedQuestions.slice(0, 2).map((q, index) => (
                            <motion.button
                              key={q.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.03 }}
                              onClick={() => handleSend(q.text)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px]"
                              style={{
                                backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                                color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                              }}
                            >
                              {q.text}
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
                <div className="flex items-center gap-3">
                  {/* Icons */}
                  <div className="flex items-center gap-2">
                    {[Settings, ImageIcon, FileText].map((Icon, i) => (
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

                  {/* Voice button */}
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium"
                    style={{
                      backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                      color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                    }}
                  >
                    <Mic className="w-4 h-4" />
                    <span className="hidden sm:inline">Label</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
