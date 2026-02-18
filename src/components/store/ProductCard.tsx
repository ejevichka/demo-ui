import { useState } from 'react';
import { MessageSquareText } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { analytics } from '@/lib/analytics';
import { ReviewSummaryModal } from './ReviewSummaryModal';
import { ProductBuyModal } from './ProductBuyModal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { theme, themeName } = useTheme();
  const isDark = theme.isDark;
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const handleAISummaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReviewModalOpen(true);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Track product view
    analytics.trackProductView(themeName, product.id, product.title);
    setIsBuyModalOpen(true);
  };

  const handleCardClick = () => {
    // Track product view
    analytics.trackProductView(themeName, product.id, product.title);
    setIsBuyModalOpen(true);
  };

  return (
    <>
      <article
        onClick={handleCardClick}
        className="group cursor-pointer rounded-lg p-4 flex flex-col gap-4"
        style={{
          backgroundColor: isDark ? 'var(--neutral-900)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
        }}
      >
        {/* Image container - square aspect ratio */}
        <div
          className="aspect-square rounded-md overflow-hidden flex items-center justify-center"
          style={{
            backgroundColor: isDark ? 'var(--neutral-800)' : 'var(--neutral-100)',
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-[85%] h-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-4">
          {/* Price row */}
          <div className="flex items-center gap-2">
            <span
              className="text-[14px] font-bold"
              style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
            >
              {formatPrice(product.newPrice, product.currency)}
            </span>
            {product.oldPrice > product.newPrice && (
              <span
                className="text-[12px] line-through"
                style={{ color: '#94a3b8' }}
              >
                {formatPrice(product.oldPrice, product.currency)}
              </span>
            )}
          </div>

          {/* Product title */}
          <h3
            className="text-[12px] leading-tight font-medium line-clamp-2"
            style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
          >
            {product.title}
          </h3>

          {/* Review summary link */}
          <button
            onClick={handleAISummaryClick}
            className="flex items-center gap-1.5 text-[12px] font-medium hover:opacity-80 transition-opacity"
            style={{ color: 'var(--primary)' }}
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            Review summary
          </button>

          {/* Spacer to push Buy button to bottom */}
          <div className="flex-1" />

          {/* Buy button */}
          <button
            onClick={handleBuyClick}
            className="w-full h-9 rounded text-[14px] font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
            }}
          >
            Buy
          </button>
        </div>
      </article>

      {/* Review Summary Modal */}
      <ReviewSummaryModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={product}
      />

      {/* Product Buy Modal with AI Assistant */}
      <ProductBuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        product={product}
      />
    </>
  );
}
