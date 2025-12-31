import { useState, useRef, useEffect } from 'react';
import { Settings, ImageIcon, FileText, Mic, X, ArrowUp, MoreHorizontal, CornerDownRight, PanelLeft, Send, ArrowRight } from 'lucide-react';
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
      inputRef.current.focus();
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
    // Don't clear messages on collapse - preserve chat history
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isLoading) return;

    // Expand if not already expanded
    if (!isExpanded) {
      setIsExpanded(true);
    }

    const userMessage = createUserMessage(text.trim());
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const assistantMessage = createAssistantMessage('', true);
    setMessages((prev) => [...prev, assistantMessage]);

    // Callbacks for streaming response
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

    // Use real KRUPS API for brownmarket theme, mock for others
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
    // Reset KRUPS session for new chat
    if (themeName === 'brownmarket') {
      resetKrupsSession();
    }
  };

  // Get theme-specific assistant description
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
    return 'Ask a question or describe what you are looking for, and I will help you find the best solution.';
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[843px] px-4">
      <div
        className="relative transition-all duration-300 ease-out"
        style={{
          backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Expanded content - slides up */}
        <div
          className="transition-all duration-300 ease-out overflow-hidden"
          style={{
            maxHeight: isExpanded ? '500px' : '0px',
            opacity: isExpanded ? 1 : 0,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-6 pt-6 pb-4">
            <div className="flex items-center gap-3">
              <button
                className="p-2 rounded-lg transition-colors hover:bg-black/5"
                style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
              >
                <PanelLeft className="w-5 h-5" />
              </button>
              <h2
                className="text-[28px] font-bold"
                style={{ color: 'var(--primary)' }}
              >
                AI Smart assistant
              </h2>
            </div>
            {hasMessages && (
              <button
                onClick={handleNewChat}
                className="text-[14px] px-3 py-1.5 rounded-lg transition-colors hover:opacity-70"
                style={{
                  color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)',
                  backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                }}
              >
                New chat
              </button>
            )}
          </div>

          {/* Content area - either intro or chat messages */}
          <div
            className="overflow-y-auto"
            style={{ maxHeight: '340px' }}
          >
            {!hasMessages ? (
              /* Initial state - description + suggested questions */
              <>
                <p
                  className="px-6 pb-6 text-[16px] leading-relaxed"
                  style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-900)' }}
                >
                  {getAssistantDescription()}
                </p>

                {/* Suggested questions */}
                <div className="px-6 pb-6 space-y-4">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleSend(q.text)}
                      className="flex items-start gap-3 w-full text-left transition-colors hover:opacity-70"
                    >
                      <CornerDownRight
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                      />
                      <span
                        className="text-[18px] font-medium"
                        style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                      >
                        {q.text}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Chat messages */
              <div className="px-6 pb-4 space-y-4">
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

                {/* Follow-up suggestions after assistant response */}
                {hasMessages && !isLoading && (
                  <div className="pt-2">
                    <p
                      className="text-[12px] mb-2"
                      style={{ color: 'var(--neutral-500)' }}
                    >
                      You might also be interested in
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.slice(0, 3).map((q, index) => (
                        <button
                          key={q.id}
                          onClick={() => handleSend(q.text)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] transition-all hover:scale-105"
                          style={{
                            backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
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
            )}
          </div>
        </div>

        {/* Input bar - always visible */}
        <div
          className="flex items-center gap-4 px-6 py-5"
          style={{ minHeight: '88px' }}
        >
          {/* Left section: Menu dots + icons */}
          <div className="flex items-center gap-4">
            {!isExpanded && (
              <>
                <button
                  className="p-1 transition-colors hover:opacity-70"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal
                    className="w-5 h-5"
                    style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                  />
                </button>
                <div
                  className="w-px h-6"
                  style={{ backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-300)' }}
                />
              </>
            )}
            <div className="flex items-center gap-3">
              <Settings
                className="w-5 h-5 cursor-pointer transition-colors hover:opacity-70"
                style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
              />
              <ImageIcon
                className="w-5 h-5 cursor-pointer transition-colors hover:opacity-70"
                style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
              />
              <FileText
                className="w-5 h-5 cursor-pointer transition-colors hover:opacity-70"
                style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
              />
            </div>
          </div>

          {/* Center: Input */}
          <div className="flex-1 flex items-center">
            {isExpanded ? (
              <div
                className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                  border: `1px solid ${isDark ? 'var(--neutral-600)' : 'var(--neutral-200)'}`,
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={hasMessages ? 'Ask a follow-up question...' : 'Ask me anything...'}
                  className="flex-1 bg-transparent border-none outline-none text-[16px]"
                  style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                  disabled={isLoading}
                />
                {inputValue && (
                  <button
                    onClick={() => setInputValue('')}
                    className="p-1 rounded-full hover:bg-black/5 transition-colors"
                  >
                    <X
                      className="w-4 h-4"
                      style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                    />
                  </button>
                )}
              </div>
            ) : (
              <div
                onClick={handleExpand}
                className="flex-1 cursor-pointer"
              >
                <span
                  className="text-[16px]"
                  style={{ color: 'var(--neutral-400)' }}
                >
                  Ask me anything...
                </span>
              </div>
            )}
          </div>

          {/* Right section: Send button + Voice */}
          <div className="flex items-center gap-3">
            {/* Send button */}
            <button
              onClick={() => isExpanded ? handleSend() : handleExpand()}
              disabled={isExpanded && isLoading}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:opacity-80 disabled:opacity-50"
              style={{
                backgroundColor: isExpanded && inputValue.trim()
                  ? 'var(--primary)'
                  : isDark ? 'var(--neutral-700)' : 'var(--neutral-200)',
                color: isExpanded && inputValue.trim()
                  ? '#FFFFFF'
                  : isDark ? 'var(--neutral-400)' : 'var(--neutral-500)',
              }}
            >
              {isExpanded && hasMessages ? (
                <Send className="w-5 h-5" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </button>

            {/* Voice mode button */}
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all hover:opacity-80"
              style={{
                backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Mic className="w-4 h-4" />
              <span>{isExpanded ? 'Voice mode' : 'Label'}</span>
            </button>
          </div>
        </div>

        {/* Close button - only when expanded */}
        {isExpanded && (
          <button
            onClick={handleCollapse}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{
              backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)',
              color: isDark ? '#FFFFFF' : 'var(--neutral-600)',
            }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Animation keyframes */}
      <style>{`
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
    </div>
  );
}
