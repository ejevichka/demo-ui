import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { ReviewCard } from './ReviewCard';
import { reviewDataByTheme, reviewSummariesByTheme } from '@/lib/themes';
import type { Product, Review, ReviewSummary } from '@/types';

interface ReviewSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function ReviewSummaryModal({ isOpen, onClose, product }: ReviewSummaryModalProps) {
  const { theme, themeName } = useTheme();
  const isDark = theme.isDark;

  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Get reviews and summary for this product
  const reviews: Review[] = reviewDataByTheme[themeName]?.[product.id] || [];
  const summary: ReviewSummary | undefined = reviewSummariesByTheme[themeName]?.[product.id];

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowSummary(false);
      setIsSummarizing(false);
    }
  }, [isOpen]);

  const handleSummarize = () => {
    setIsSummarizing(true);
    // Simulate AI summarization delay
    setTimeout(() => {
      setIsSummarizing(false);
      setShowSummary(true);
    }, 1500);
  };

  // Animation variants matching AIModal's "Liquid Bloom" style
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 40,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 22,
        stiffness: 220,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      filter: 'blur(8px)',
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px] md:max-h-[85vh] z-50 flex flex-col overflow-hidden rounded-lg"
            style={{
              backgroundColor: isDark ? 'var(--neutral-900)' : '#FFFFFF',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{
                borderColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)',
              }}
            >
              <h2
                className="text-[18px] font-semibold"
                style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
              >
                Review summary
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                  color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)',
                }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Product info */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-12 h-12 rounded-md object-cover"
                  style={{
                    border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[14px] font-medium truncate"
                    style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                  >
                    {product.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star
                      className="w-3.5 h-3.5"
                      style={{ fill: '#FFA000', color: '#FFA000' }}
                    />
                    <span
                      className="text-[12px] font-medium"
                      style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-700)' }}
                    >
                      {summary?.overallRating.toFixed(1) || product.rating?.toFixed(1) || '4.5'}
                    </span>
                    <span
                      className="text-[12px]"
                      style={{ color: 'var(--neutral-500)' }}
                    >
                      ({summary?.totalReviews ?? product.reviewsCount ?? reviews.length} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Summarize button */}
              {!showSummary && (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-md mb-4 transition-opacity disabled:opacity-70"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                  }}
                >
                  <Sparkles className={`w-4 h-4 ${isSummarizing ? 'animate-pulse' : ''}`} />
                  <span className="text-[14px] font-medium">
                    {isSummarizing ? 'Summarizing...' : 'Summarize'}
                  </span>
                </motion.button>
              )}

              {/* AI Summary section */}
              <AnimatePresence>
                {showSummary && summary && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    {/* Summary text */}
                    <div
                      className="p-3 rounded-md mb-3"
                      style={{
                        backgroundColor: isDark ? 'var(--neutral-800)' : 'var(--neutral-50)',
                        border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                      }}
                    >
                      <p
                        className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--neutral-500)' }}
                      >
                        Most reviewers describe
                      </p>
                      <p
                        className="text-[14px] leading-relaxed"
                        style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-700)' }}
                      >
                        {summary.summary}
                      </p>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {/* Pros */}
                      <div
                        className="p-3 rounded-md"
                        style={{
                          backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.08)',
                          border: `1px solid ${isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)'}`,
                        }}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <ThumbsUp className="w-3.5 h-3.5" style={{ color: '#22c55e' }} />
                          <span className="text-[11px] font-semibold" style={{ color: '#22c55e' }}>
                            PROS
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {summary.pros.map((pro, i) => (
                            <li
                              key={i}
                              className="text-[12px]"
                              style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-700)' }}
                            >
                              • {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div
                        className="p-3 rounded-md"
                        style={{
                          backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
                          border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.15)'}`,
                        }}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <ThumbsDown className="w-3.5 h-3.5" style={{ color: '#ef4444' }} />
                          <span className="text-[11px] font-semibold" style={{ color: '#ef4444' }}>
                            CONS
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {summary.cons.map((con, i) => (
                            <li
                              key={i}
                              className="text-[12px]"
                              style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-700)' }}
                            >
                              • {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reviews section header */}
              <div className="flex items-center justify-between mb-3">
                <p
                  className="text-[12px] font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  {summary?.totalReviews ?? product.reviewsCount ?? reviews.length} reviewers
                </p>
              </div>

              {/* Review cards */}
              <div className="space-y-3">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <p
                    className="text-[14px] text-center py-8"
                    style={{ color: 'var(--neutral-500)' }}
                  >
                    No reviews yet
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at document body level
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}
