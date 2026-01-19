import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import type { ChatMessage as ChatMessageType, Product } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { submitFeedback } from '@/lib/feedbackApi';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { theme } = useTheme();
  const isUser = message.role === 'user';
  const isDark = theme.isDark;

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[70%] px-4 py-3 rounded-2xl rounded-tr-md text-[14px] leading-relaxed"
          style={{
            backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)',
            color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // Assistant message
  const showLoader = message.isStreaming && !message.content;
  const showFeedback = !message.isStreaming && message.content;

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        <div
          className="px-5 py-4 rounded-2xl rounded-tl-md"
          style={{
            backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
            color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
            boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.06)',
            border: isDark ? '1px solid var(--neutral-700)' : 'none',
          }}
        >
          <div className="text-[14px] leading-[1.7]">
            {showLoader ? (
              <TypingIndicator />
            ) : (
              <>
                <FormattedMessage content={message.content} isDark={isDark} products={message.products} />
                {message.isStreaming && <StreamingCursor />}
              </>
            )}
          </div>
        </div>

        {/* Feedback section */}
        {showFeedback && (
          <FeedbackSection
            messageId={message.id}
            isDark={isDark}
            themeName={theme.id}
          />
        )}
      </div>
    </div>
  );
}

function StreamingCursor() {
  return (
    <span
      className="inline-block w-[2px] h-[18px] ml-0.5 rounded-full animate-pulse"
      style={{ backgroundColor: 'var(--primary)' }}
    />
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1">
      <span
        className="w-2 h-2 rounded-full animate-bounce"
        style={{
          backgroundColor: 'var(--primary)',
          animationDelay: '0ms',
          animationDuration: '600ms',
        }}
      />
      <span
        className="w-2 h-2 rounded-full animate-bounce"
        style={{
          backgroundColor: 'var(--primary)',
          animationDelay: '150ms',
          animationDuration: '600ms',
        }}
      />
      <span
        className="w-2 h-2 rounded-full animate-bounce"
        style={{
          backgroundColor: 'var(--primary)',
          animationDelay: '300ms',
          animationDuration: '600ms',
        }}
      />
    </div>
  );
}

// Feedback section component
interface FeedbackSectionProps {
  messageId: string;
  isDark: boolean;
  themeName: string;
}

function FeedbackSection({ messageId, isDark, themeName }: FeedbackSectionProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<'positive' | 'negative' | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedbackClick = (type: 'positive' | 'negative') => {
    if (isSubmitted) return;
    setSelectedFeedback(type);
    setShowCommentForm(true);
  };

  const handleSubmit = async () => {
    if (!selectedFeedback) return;

    setIsSubmitting(true);
    try {
      await submitFeedback(
        {
          messageId,
          isPositive: selectedFeedback === 'positive',
          comment: comment.trim() || undefined,
        },
        themeName as 'brownmarket' | 'bluemarket' | 'brainform' | 'redmarket'
      );
      setIsSubmitted(true);
      setShowCommentForm(false);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowCommentForm(false);
    setSelectedFeedback(null);
    setComment('');
  };

  if (isSubmitted) {
    return (
      <div className="mt-2 flex items-center gap-2">
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[12px]"
          style={{
            backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
            color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)',
          }}
        >
          {selectedFeedback === 'positive' ? (
            <ThumbsUp className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
          ) : (
            <ThumbsDown className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
          )}
          <span>Thank you for your feedback</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      {/* Feedback buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleFeedbackClick('positive')}
          className={`p-1.5 rounded-lg transition-all ${
            selectedFeedback === 'positive' ? 'scale-110' : 'hover:scale-105'
          }`}
          style={{
            backgroundColor: selectedFeedback === 'positive'
              ? (isDark ? 'var(--neutral-600)' : 'var(--neutral-200)')
              : 'transparent',
            color: selectedFeedback === 'positive'
              ? 'var(--primary)'
              : (isDark ? 'var(--neutral-500)' : 'var(--neutral-400)'),
          }}
          title="Good response"
        >
          <ThumbsUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleFeedbackClick('negative')}
          className={`p-1.5 rounded-lg transition-all ${
            selectedFeedback === 'negative' ? 'scale-110' : 'hover:scale-105'
          }`}
          style={{
            backgroundColor: selectedFeedback === 'negative'
              ? (isDark ? 'var(--neutral-600)' : 'var(--neutral-200)')
              : 'transparent',
            color: selectedFeedback === 'negative'
              ? 'var(--primary)'
              : (isDark ? 'var(--neutral-500)' : 'var(--neutral-400)'),
          }}
          title="Bad response"
        >
          <ThumbsDown className="w-4 h-4" />
        </button>
      </div>

      {/* Comment form dropdown */}
      <AnimatePresence>
        {showCommentForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="mt-3 p-3 rounded-xl"
              style={{
                backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                border: `1px solid ${isDark ? 'var(--neutral-600)' : 'var(--neutral-200)'}`,
              }}
            >
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment (optional)"
                rows={3}
                className="w-full bg-transparent border rounded-lg px-3 py-2 text-[13px] resize-none outline-none focus:ring-1"
                style={{
                  borderColor: isDark ? 'var(--neutral-600)' : 'var(--neutral-300)',
                  color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
                }}
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-70 disabled:opacity-50"
                  style={{
                    backgroundColor: isDark ? 'var(--neutral-600)' : 'var(--neutral-200)',
                    color: isDark ? '#FFFFFF' : 'var(--neutral-700)',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Product card component - minimal version (image + title only)
interface ProductCardProps {
  name: string;
  url: string;
  price?: number;
  oldPrice?: number;
  imageUrl?: string;
  isDark: boolean;
  description?: string;
  availability?: boolean;
}

function ProductCard({ name, url, price, oldPrice, imageUrl, isDark, description, availability }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPlaceholderImage = () => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('капсульн')) {
      return 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop';
    }
    if (nameLower.includes('автоматическ')) {
      return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop';
  };

  const displayImage = imageUrl || getPlaceholderImage();

  return (
    <>
      <div
        className="rounded-xl overflow-hidden flex-shrink-0"
        style={{
          backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-50)',
          border: `1px solid ${isDark ? 'var(--neutral-600)' : 'var(--neutral-200)'}`,
          width: '140px',
        }}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getPlaceholderImage();
            }}
          />
        </div>
        <div className="p-2">
          <h4
            className="text-[11px] font-medium leading-tight line-clamp-2 mb-2"
            style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
          >
            {name}
          </h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-1.5 rounded-lg text-[11px] font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
            }}
          >
            Details
          </button>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          name={name}
          url={url}
          price={price}
          oldPrice={oldPrice}
          imageUrl={displayImage}
          isDark={isDark}
          description={description}
          availability={availability}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

// Product detail modal
interface ProductModalProps {
  name: string;
  url: string;
  price?: number;
  oldPrice?: number;
  imageUrl: string;
  isDark: boolean;
  description?: string;
  availability?: boolean;
  onClose: () => void;
}

function ProductModal({ name, url: _url, price, oldPrice, imageUrl, isDark, description, availability, onClose }: ProductModalProps) {
  const hasDiscount = oldPrice && price && oldPrice > price;
  const discountPercent = hasDiscount ? Math.round((1 - price / oldPrice) * 100) : 0;

  // Use createPortal to render modal at document.body level for proper centering
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      data-product-modal="true"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal content */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
            color: isDark ? '#FFFFFF' : 'var(--neutral-600)',
          }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0 bg-neutral-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain"
          />
          {hasDiscount && (
            <div
              className="absolute top-3 left-3 px-3 py-1.5 rounded-lg text-[14px] font-semibold text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              -{discountPercent}%
            </div>
          )}
          {/* Availability badge */}
          {availability !== undefined && (
            <div
              className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg text-[12px] font-medium"
              style={{
                backgroundColor: availability ? '#22c55e' : '#ef4444',
                color: '#FFFFFF',
              }}
            >
              {availability ? 'В наличии' : 'Нет в наличии'}
            </div>
          )}
        </div>

        {/* Scrollable Details */}
        <div className="p-5 overflow-y-auto flex-1">
          <h3
            className="text-[18px] font-semibold leading-tight mb-3"
            style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
          >
            {name}
          </h3>

          {price && (
            <div className="flex items-baseline gap-3 mb-4">
              {hasDiscount && (
                <span
                  className="text-[14px] line-through"
                  style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                >
                  {oldPrice!.toLocaleString('ru-RU')} ₽
                </span>
              )}
              <span
                className="text-[24px] font-bold"
                style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
              >
                {price.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="mb-4">
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-600)' }}
              >
                {description.length > 500 ? `${description.slice(0, 500)}...` : description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

interface FormattedMessageProps {
  content: string;
  isDark: boolean;
  products?: Product[];
}

function FormattedMessage({ content, isDark, products }: FormattedMessageProps) {
  return (
    <>
      {/* Full text content - no truncation */}
      <FormattedTextContent content={content} isDark={isDark} />

      {/* Product cards after text */}
      {products && products.length > 0 && (
        <div className="flex flex-row gap-3 overflow-x-auto pb-2 -mx-2 px-2 mt-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.title}
              url={`https://krups.ru/product/${product.id}`}
              price={product.newPrice}
              oldPrice={product.oldPrice}
              imageUrl={product.image}
              isDark={isDark}
              description={product.description}
              availability={product.availability}
            />
          ))}
        </div>
      )}
    </>
  );
}

// Preprocess markdown content from API
function preprocessMarkdown(content: string): string {
  return content
    // Convert literal \n to actual newlines
    .replace(/\\n/g, '\n')
    // Fix unclosed bold: **text* → **text**
    .replace(/\*\*([^*\n]+)\*(?!\*)/g, '**$1**')
    // Fix markdown links split across lines
    .replace(/\]\s*[\r\n]+\s*\(/g, '](')
    .replace(/\]\s+\(/g, '](');
}

function FormattedTextContent({ content, isDark }: { content: string; isDark: boolean }) {
  const processedContent = preprocessMarkdown(content);

  return (
    <Markdown
      components={{
        // Strong/bold text
        strong: ({ children }) => (
          <strong
            className="font-semibold"
            style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
          >
            {children}
          </strong>
        ),
        // Italic text
        em: ({ children }) => <em className="italic">{children}</em>,
        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-70 transition-opacity"
            style={{ color: 'var(--primary)' }}
          >
            {children}
          </a>
        ),
        // Unordered lists
        ul: ({ children }) => <ul className="my-1 space-y-0.5">{children}</ul>,
        // List items
        li: ({ children }) => (
          <li className="flex gap-2">
            <span style={{ color: 'var(--primary)' }}>•</span>
            <span className="flex-1">{children}</span>
          </li>
        ),
        // Horizontal rule
        hr: () => (
          <hr
            className="my-3 border-0 h-px"
            style={{ backgroundColor: isDark ? 'var(--neutral-600)' : 'var(--neutral-200)' }}
          />
        ),
        // Paragraphs
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-3 -mx-2">
            <table
              className="w-full text-[12px] border-collapse"
              style={{
                backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-50)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead style={{ backgroundColor: isDark ? 'var(--neutral-600)' : 'var(--neutral-100)' }}>
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th
            className="px-3 py-2 text-left font-semibold whitespace-nowrap"
            style={{
              color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
              borderBottom: `1px solid ${isDark ? 'var(--neutral-500)' : 'var(--neutral-200)'}`,
            }}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            className="px-3 py-2"
            style={{ color: isDark ? 'var(--neutral-200)' : 'var(--neutral-700)' }}
          >
            {children}
          </td>
        ),
        // Code blocks
        code: ({ children }) => (
          <code
            className="px-1.5 py-0.5 rounded text-[13px]"
            style={{
              backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
              color: isDark ? 'var(--neutral-200)' : 'var(--neutral-700)',
            }}
          >
            {children}
          </code>
        ),
      }}
    >
      {processedContent}
    </Markdown>
  );
}
