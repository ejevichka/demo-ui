import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDownRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { ReviewCard } from './ReviewCard';
import { reviewDataByTheme, reviewSummariesByTheme } from '@/lib/themes';
import { formatPrice } from '@/lib/utils';
import type { Product, Review, ReviewSummary } from '@/types';

interface ProductBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAI?: (question: string) => void;
  product: Product;
}

// Suggestion templates - {productId} will be replaced with actual product ID
const suggestionTemplates = [
  { template: 'What are the key features of {productId}?', display: 'What are the key features?' },
  { template: 'Compare {productId} with similar products', display: 'Compare with similar products' },
  { template: 'What do reviewers say about {productId}?', display: 'What do reviewers say?' },
];

export function ProductBuyModal({ isOpen, onClose, onOpenAI, product }: ProductBuyModalProps) {
  const { theme, themeName } = useTheme();
  const isDark = theme.isDark;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Get reviews and summary for this product
  const reviews: Review[] = reviewDataByTheme[themeName]?.[product.id] || [];
  const summary: ReviewSummary | undefined = reviewSummariesByTheme[themeName]?.[product.id];
  const reviewCount = summary?.totalReviews ?? product.reviewsCount ?? reviews.length;

  // Use product images array or fallback to main image
  const images = product.images?.length ? product.images : [product.image];

  // Product name for context in questions
  const productName = product.title;

  // Helper to open AI chat with a question including product context
  const openAIWithQuestion = (question: string) => {
    onClose(); // Close this modal first

    if (onOpenAI) {
      onOpenAI(question);
    } else {
      // Use global event to open NEW AI chat with the question (autoSend: true, newChat: true)
      window.dispatchEvent(new CustomEvent('openAIChat', {
        detail: { question, autoSend: true, newChat: true }
      }));
    }
  };

  const handleSuggestionClick = (template: string) => {
    // Replace {productId} placeholder with product name
    const questionWithProduct = template.replace('{productId}', productName);
    openAIWithQuestion(questionWithProduct);
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      // Add product name context if not already mentioned
      const question = inputValue.trim().toLowerCase().includes(productName.toLowerCase())
        ? inputValue.trim()
        : `${inputValue.trim()} (${productName})`;
      openAIWithQuestion(question);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInputSubmit();
    }
  };

  // Animation variants
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
            data-testid="modal-backdrop"
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
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:max-h-[90vh] z-50 flex flex-col overflow-hidden rounded-2xl"
            style={{
              backgroundColor: isDark ? 'var(--neutral-900)' : '#FFFFFF',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              data-testid="close-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
              style={{
                backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)',
              }}
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Top section: Image gallery + Product info */}
              <div className="flex flex-col md:flex-row">
                {/* Image Gallery */}
                <div className="flex p-4 md:p-6 gap-3 md:w-[55%]">
                  {/* Thumbnails */}
                  <div className="flex flex-col gap-2">
                    {images.map((img, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImageIndex(index)}
                        className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                        style={{
                          border: selectedImageIndex === index
                            ? '2px solid var(--primary)'
                            : `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                        }}
                      >
                        <img
                          src={img}
                          alt={`${product.title} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>

                  {/* Main image */}
                  <div
                    className="flex-1 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{
                      backgroundColor: isDark ? 'var(--neutral-800)' : 'var(--neutral-100)',
                    }}
                  >
                    <motion.img
                      key={selectedImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      src={images[selectedImageIndex]}
                      alt={product.title}
                      className="w-full h-full object-contain max-h-[400px]"
                    />
                  </div>
                </div>

                {/* Product Info + AI Assistant */}
                <div className="flex flex-col p-4 md:p-6 md:w-[45%] md:border-l"
                  style={{ borderColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)' }}
                >
                  {/* Product Title & Description */}
                  <h2
                    className="text-2xl md:text-3xl font-bold leading-tight mb-2"
                    style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                  >
                    {product.title}
                  </h2>

                  {product.description && (
                    <p
                      className="text-sm mb-4"
                      style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
                    >
                      {product.description}
                    </p>
                  )}

                  {/* Prices */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                    >
                      {formatPrice(product.newPrice, product.currency)}
                    </span>
                    {product.oldPrice > product.newPrice && (
                      <span
                        className="text-lg line-through"
                        style={{ color: 'var(--primary)' }}
                      >
                        {formatPrice(product.oldPrice, product.currency)}
                      </span>
                    )}
                  </div>

                  {/* Buy button */}
                  <button
                    className="w-full h-12 rounded-lg text-[16px] font-medium transition-opacity hover:opacity-90 mb-6"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: '#FFFFFF',
                    }}
                  >
                    Buy
                  </button>

                  {/* AI Shopping Assistant Section */}
                  <div className="mt-auto">
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{ color: 'var(--primary)' }}
                    >
                      Ask AI Shopping Assistant
                    </h3>

                    <p
                      className="text-xs font-medium uppercase tracking-wider mb-2"
                      style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
                    >
                      Suggestion
                    </p>

                    {/* Suggestion chips */}
                    <div className="flex flex-col gap-2 mb-4">
                      {suggestionTemplates.map((item, index) => (
                        <motion.button
                          key={index}
                          data-testid={`suggestion-${index}`}
                          whileHover={{ x: 4 }}
                          onClick={() => handleSuggestionClick(item.template)}
                          className="flex items-center gap-2 text-left text-sm"
                          style={{ color: 'var(--primary)' }}
                        >
                          <ArrowDownRight className="w-4 h-4 flex-shrink-0" />
                          <span className="underline underline-offset-2">{item.display}</span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Input field */}
                    <div
                      className="flex items-center rounded-lg px-3 py-2"
                      style={{
                        backgroundColor: isDark ? 'var(--neutral-800)' : 'var(--neutral-100)',
                        border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
                      }}
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask something else..."
                        className="flex-1 bg-transparent border-none outline-none text-sm"
                        style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div
                className="p-4 md:p-6 border-t"
                style={{ borderColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-200)' }}
              >
                <p
                  className="text-sm font-bold mb-4"
                  style={{ color: 'var(--primary)' }}
                >
                  {reviewCount} reviewers
                </p>

                {/* Review cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.length > 0 ? (
                    reviews.slice(0, 4).map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))
                  ) : (
                    <p
                      className="text-sm col-span-2 text-center py-8"
                      style={{ color: 'var(--neutral-500)' }}
                    >
                      No reviews yet
                    </p>
                  )}
                </div>
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
