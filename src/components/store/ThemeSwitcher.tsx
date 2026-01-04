import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import type { ThemeName } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const industries: { id: ThemeName; name: string }[] = [
  { id: 'brownmarket', name: 'Electronics' },
  { id: 'bluemarket', name: 'Sport' },
  { id: 'brainform', name: 'Beauty' },
];

// Brand colors for dots
const brandColors: Record<ThemeName, string> = {
  brownmarket: '#82572B',
  bluemarket: '#0048D9',
  brainform: '#C9A962',
  redmarket: '#C30000',
};

export function ThemeSwitcher() {
  const { themeName, setTheme, theme } = useTheme();
  const isDark = theme.isDark;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="fixed top-4 md:top-20 right-4 z-30"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={false}
    >
      <motion.div
        className="relative overflow-hidden"
        animate={{
          width: isExpanded ? 'auto' : 44,
          height: isExpanded ? 'auto' : 44,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
        }}
        style={{
          backgroundColor: isDark
            ? 'rgba(30, 30, 35, 0.7)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: isExpanded ? 16 : 22,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
            borderRadius: 'inherit',
          }}
        />

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Collapsed: show colored dots
            <motion.div
              key="collapsed"
              className="flex items-center justify-center gap-1 p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {industries.map((industry) => (
                <div
                  key={industry.id}
                  className={cn(
                    'w-2 h-2 rounded-full transition-transform',
                    themeName === industry.id && 'scale-150'
                  )}
                  style={{
                    backgroundColor: brandColors[industry.id],
                    opacity: themeName === industry.id ? 1 : 0.4,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            // Expanded: show full menu
            <motion.div
              key="expanded"
              className="p-2 flex flex-col gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {industries.map((industry) => (
                <motion.button
                  key={industry.id}
                  onClick={() => setTheme(industry.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] transition-all text-left whitespace-nowrap',
                    themeName === industry.id ? 'font-medium' : 'opacity-70 hover:opacity-100'
                  )}
                  style={{
                    backgroundColor: themeName === industry.id
                      ? `${brandColors[industry.id]}20`
                      : 'transparent',
                    color: themeName === industry.id
                      ? brandColors[industry.id]
                      : isDark ? '#FFFFFF' : 'var(--neutral-700)',
                  }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{industry.name}</span>
                  {themeName === industry.id && (
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full ml-auto"
                      style={{ backgroundColor: brandColors[industry.id] }}
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
