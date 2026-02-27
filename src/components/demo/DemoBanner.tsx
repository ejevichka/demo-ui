import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';

interface DemoBannerProps {
  isDark?: boolean;
}

export function DemoBanner({ isDark = false }: DemoBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full flex justify-center px-4 py-3"
      role="banner"
      aria-label="Demo mode notice"
    >
      <div
        className="flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium"
        style={{
          background: isDark
            ? 'rgba(251, 149, 16, 0.15)'
            : 'rgba(251, 149, 16, 0.08)',
          border: isDark
            ? '1px solid rgba(251, 149, 16, 0.4)'
            : '1px solid rgba(251, 149, 16, 0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: isDark ? '#FFB74D' : '#B36800',
          boxShadow: '0 2px 12px rgba(251, 149, 16, 0.08)',
        }}
      >
        <FlaskConical className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap text-xs sm:text-sm">
          Product demo — no purchases will be processed
        </span>
      </div>
    </motion.div>
  );
}
