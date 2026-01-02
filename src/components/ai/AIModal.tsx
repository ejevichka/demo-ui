import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, PenSquare, ArrowRight, Settings, ImageIcon, FileText, Mic, ArrowUp } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { useTheme } from '@/hooks/useTheme';
import { suggestedQuestions } from '@/lib/themes';
import {
  sendChatMessageMock,
  createUserMessage,
  createAssistantMessage,
} from '@/lib/api';
import type { ChatMessage as ChatMessageType } from '@/types';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIModal({ isOpen, onClose }: AIModalProps) {
  const { theme, themeName } = useTheme();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDark = theme.isDark;
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = createUserMessage(text.trim());
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantMessage = createAssistantMessage('', true);
    setMessages((prev) => [...prev, assistantMessage]);

    await sendChatMessageMock(
      { message: text, theme: themeName },
      {
        onChunk: (chunk) => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage.role === 'assistant') {
              lastMessage.content += chunk;
            }
            return updated;
          });
        },
        onComplete: (fullMessage, products) => {
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
        onError: (error) => {
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
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Liquid Bloom animation variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 60,
      filter: 'blur(20px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 200,
        mass: 0.8,
        delayChildren: 0.15,
        staggerChildren: 0.05,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 30,
      filter: 'blur(10px)',
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Liquid Glass Overlay - Soft backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            onClick={onClose}
          />

          {/* Modal Container - Liquid Bloom Animation */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:h-[600px] z-50 flex overflow-hidden md:rounded-[32px] glass-highlight ${isDark ? 'glass-heavy-dark' : 'glass-heavy'}`}
            style={{ willChange: 'transform, opacity, filter' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Specular Highlight Layer - Animated shimmer */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent pointer-events-none z-20 rounded-[inherit]"
            />

            {/* Sidebar - Nested Glass */}
            <motion.div
              animate={{ width: sidebarOpen ? 240 : 64 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`hidden md:flex flex-col border-r z-30 ${isDark ? 'glass-nested-dark' : 'glass-nested'}`}
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)' }}
            >
              {/* Sidebar buttons */}
              <div className="p-3 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-2xl transition-colors"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)',
                    color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
                  }}
                >
                  <History className="w-5 h-5 shrink-0" />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-[14px] font-medium"
                      >
                        История
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMessages([])}
                  className="w-full flex items-center gap-3 p-2.5 rounded-2xl transition-colors hover:bg-white/10"
                  style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
                >
                  <PenSquare className="w-5 h-5 shrink-0" />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-[14px]"
                      >
                        Новый запрос
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* History list */}
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 overflow-y-auto px-3 pb-3"
                  >
                    <p
                      className="text-[11px] font-semibold uppercase tracking-wider px-2 py-2"
                      style={{ color: 'var(--neutral-500)' }}
                    >
                      История
                    </p>
                    {messages.filter((m) => m.role === 'user').length === 0 ? (
                      <p className="text-[13px] px-2 py-1" style={{ color: 'var(--neutral-500)' }}>
                        Нет истории
                      </p>
                    ) : (
                      messages
                        .filter((m) => m.role === 'user')
                        .map((m) => (
                          <div
                            key={m.id}
                            className="px-2 py-2 text-[13px] rounded-xl cursor-pointer truncate transition-colors hover:bg-white/10"
                            style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                          >
                            {m.content}
                          </div>
                        ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Main Content */}
            <motion.div
              variants={contentVariants}
              className="flex-1 flex flex-col min-w-0 relative z-10"
            >
              {/* Close button - Bloom in with rotation */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', damping: 15, stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full flex items-center justify-center z-30 transition-colors"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                  color: isDark ? '#FFFFFF' : 'var(--neutral-600)',
                }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-16 md:pt-8 relative">
                {!hasMessages ? (
                  /* Initial state - floating glass chip with bloom */
                  <div className="h-full flex items-start justify-end pt-4 md:pt-8">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8, y: 30, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.4, type: 'spring', damping: 18, stiffness: 200 }}
                      whileHover={{ scale: 1.05, y: -4, boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSend(suggestedQuestions[0]?.text || '')}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[14px] font-medium"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.4)'}`,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
                      }}
                    >
                      {suggestedQuestions[0]?.text || 'How to choose a coffee machine?'}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                ) : (
                  /* Chat messages */
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
                  </div>
                )}
              </div>

              {/* Input area - Floating Island */}
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Desktop: Icons + Input + Send in one row */}
                  <div className="flex items-center gap-3 flex-1">
                    {/* Icons - desktop */}
                    <div className="hidden md:flex items-center gap-2">
                      {[Settings, ImageIcon, FileText].map((Icon, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon
                            className="w-5 h-5 cursor-pointer transition-colors hover:opacity-70"
                            style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Input field - Glass Island */}
                    <div className="relative flex-1 group">
                      {/* Glow effect on focus */}
                      <div
                        className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(135deg, var(--primary)20, transparent)` }}
                      />
                      <div
                        className="relative flex items-center gap-2 px-4 py-3 rounded-2xl transition-all"
                        style={{
                          backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
                          backdropFilter: 'blur(20px)',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'var(--primary)'}`,
                        }}
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Ask me anything..."
                          className="flex-1 bg-transparent border-none outline-none text-[15px]"
                          style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                          disabled={isLoading}
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSend()}
                          disabled={!input.trim() || isLoading}
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                          style={{
                            backgroundColor: input.trim() ? 'var(--primary)' : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'),
                            color: input.trim() ? '#FFFFFF' : (isDark ? 'var(--neutral-400)' : 'var(--neutral-500)'),
                            boxShadow: input.trim() ? '0 4px 12px rgba(84, 28, 249, 0.3)' : 'none',
                          }}
                        >
                          <ArrowUp className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Voice mode button - desktop */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium whitespace-nowrap"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                        color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                      }}
                    >
                      <Mic className="w-4 h-4" />
                      Voice mode
                    </motion.button>
                  </div>

                  {/* Mobile: Icons row below input */}
                  <div className="flex md:hidden items-center justify-between">
                    <div className="flex items-center gap-4">
                      {[Settings, ImageIcon, FileText].map((Icon, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Icon
                            className="w-5 h-5 cursor-pointer"
                            style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
                        color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                      }}
                    >
                      <Mic className="w-4 h-4" />
                      Voice mode
                    </motion.button>
                  </div>
                </div>

                {/* Suggested questions - Glass chips */}
                {hasMessages && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <p className="text-[12px] mb-2" style={{ color: 'var(--neutral-500)' }}>
                      You might also be interested in
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.slice(0, 3).map((q, index) => (
                        <motion.button
                          key={q.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSend(q.text)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px]"
                          style={{
                            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
                            backdropFilter: 'blur(8px)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                            color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                          }}
                        >
                          {q.text}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
