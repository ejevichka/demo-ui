import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { theme } = useTheme();

  return (
    <article className="group cursor-pointer">
      {/* Image container */}
      <div
        className="aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: theme.isDark ? 'var(--neutral-800)' : 'var(--neutral-100)',
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
      <div className="space-y-2">
        {/* Product title - 2 lines max */}
        <h3
          className="text-[14px] leading-tight font-normal line-clamp-2"
          style={{ color: theme.isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
        >
          {product.title}
        </h3>

        {/* Prices */}
        <div className="flex items-center gap-2">
          <span
            className="text-[15px] font-bold"
            style={{ color: theme.isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
          >
            {formatPrice(product.newPrice, product.currency)}
          </span>
          {product.oldPrice > product.newPrice && (
            <span
              className="text-[14px] line-through"
              style={{ color: 'var(--neutral-500)' }}
            >
              {formatPrice(product.oldPrice, product.currency)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
