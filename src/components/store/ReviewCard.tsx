import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { theme } = useTheme();
  const isDark = theme.isDark;

  // Generate initials from author name (with fallback for empty/invalid names)
  const initials = review.author
    .split(' ')
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  // Render star rating (clamped to 0-5 range)
  const renderStars = (rating: number) => {
    const clampedRating = Math.max(0, Math.min(5, rating));
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className="w-3 h-3"
        style={{
          fill: i < clampedRating ? '#FFA000' : 'transparent',
          color: i < clampedRating ? '#FFA000' : 'var(--neutral-400)',
        }}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg p-4"
      style={{
        backgroundColor: isDark ? 'var(--neutral-900)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        {/* Avatar */}
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.author}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
            }}
          >
            {initials}
          </div>
        )}

        {/* Author info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p
              className="text-[14px] font-medium"
              style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
            >
              {review.author}
            </p>
            {review.verified && (
              <span
                className="text-[11px] px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                  color: 'var(--primary)',
                }}
              >
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-0.5 mt-0.5">
            {renderStars(review.rating)}
          </div>
        </div>
      </div>

      {/* Review text */}
      <p
        className="text-[14px] leading-relaxed line-clamp-3"
        style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-700)' }}
      >
        {review.text}
      </p>

      {/* Date */}
      <p className="text-[12px] mt-2" style={{ color: 'var(--neutral-500)' }}>
        {new Date(review.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
    </motion.div>
  );
}
