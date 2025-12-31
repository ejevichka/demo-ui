import { useState, useRef, useEffect } from 'react';
import { X, History, PenSquare, Send, ArrowRight } from 'lucide-react';
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

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:h-[600px] z-50 flex overflow-hidden rounded-2xl"
        style={{
          backgroundColor: isDark ? 'var(--neutral-999)' : '#FFFFFF',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
          animation: 'modalIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar */}
        <div
          className="flex flex-col transition-all duration-300 border-r"
          style={{
            width: sidebarOpen ? '240px' : '56px',
            backgroundColor: isDark ? 'var(--neutral-900)' : 'var(--neutral-0)',
            borderColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)',
          }}
        >
          {/* Sidebar buttons */}
          <div className="p-2 space-y-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
              style={{
                backgroundColor: isDark ? 'var(--neutral-800)' : 'var(--neutral-100)',
                color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
              }}
            >
              <History className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="text-[14px] font-medium">История</span>}
            </button>

            <button
              onClick={() => setMessages([])}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:opacity-80"
              style={{
                color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)',
              }}
            >
              <PenSquare className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="text-[14px]">Новый запрос</span>}
            </button>
          </div>

          {/* History list */}
          {sidebarOpen && (
            <div className="flex-1 overflow-y-auto px-2 pb-2">
              <p
                className="text-[11px] font-semibold uppercase tracking-wider px-3 py-2"
                style={{ color: 'var(--neutral-500)' }}
              >
                История
              </p>
              {messages.filter((m) => m.role === 'user').length === 0 ? (
                <p
                  className="text-[13px] px-3 py-1"
                  style={{ color: 'var(--neutral-500)' }}
                >
                  Нет истории
                </p>
              ) : (
                messages
                  .filter((m) => m.role === 'user')
                  .map((m) => (
                    <div
                      key={m.id}
                      className="px-3 py-2 text-[13px] rounded-lg cursor-pointer truncate transition-colors hover:opacity-80"
                      style={{
                        color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
                        backgroundColor: 'transparent',
                      }}
                    >
                      {m.content}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{
              backgroundColor: isDark ? 'var(--neutral-800)' : 'var(--neutral-100)',
              color: isDark ? '#FFFFFF' : 'var(--neutral-600)',
            }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-6 relative">
            {!hasMessages ? (
              /* Initial state - floating suggestion chip */
              <div className="h-full flex items-start justify-end pt-8 pr-4">
                <button
                  onClick={() => handleSend(suggestedQuestions[0]?.text || '')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] transition-all hover:scale-105"
                  style={{
                    backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
                    color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                    animation: 'fadeInUp 0.5s ease-out',
                  }}
                >
                  {suggestedQuestions[0]?.text || 'How to choose a coffee machine?'}
                </button>
              </div>
            ) : (
              /* Chat messages */
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    style={{
                      animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                    }}
                  >
                    <ChatMessage message={message} />
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-4 border-t" style={{ borderColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)' }}>
            {/* Input field */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                backgroundColor: isDark ? 'var(--neutral-800)' : 'var(--neutral-100)',
                border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={hasMessages ? 'Задайте уточняющий вопрос' : 'Задайте вопрос'}
                className="flex-1 bg-transparent border-none outline-none text-[14px]"
                style={{
                  color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
                }}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: theme.id === 'brownmarket' ? 'var(--accent)' : 'var(--primary)',
                  color: '#FFFFFF',
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Suggested questions - shown after first message */}
            {hasMessages && (
              <div className="mt-4">
                <p
                  className="text-[12px] mb-2"
                  style={{ color: 'var(--neutral-500)' }}
                >
                  Возможно Вас также заинтересует
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 3).map((q, index) => (
                    <button
                      key={q.id}
                      onClick={() => handleSend(q.text)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] transition-all hover:scale-105"
                      style={{
                        backgroundColor: isDark ? 'var(--neutral-800)' : 'var(--neutral-100)',
                        color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                        animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`,
                      }}
                    >
                      {q.text}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
