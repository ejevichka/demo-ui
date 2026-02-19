import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import type { ThemeName } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';

const industries: { id: ThemeName; name: string }[] = [
  { id: 'brownmarket', name: 'Electronics' },
  { id: 'bluemarket', name: 'Sport' },
  { id: 'brainform', name: 'Beauty' },
];

export function ThemeSwitcher() {
  const { themeName, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-1/2 -translate-y-1/2 right-4 z-30"
      data-onboarding="theme-switcher"
      initial={false}
    >
      <motion.div
        className="relative overflow-hidden shadow-lg"
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
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: isExpanded ? 16 : 22,
        }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Collapsed: show hamburger icon
            <motion.div
              key="collapsed"
              className="flex items-center justify-center p-3 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsExpanded(true)}
            >
              <Menu className="w-5 h-5 text-white" />
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
                    'px-3 py-2 rounded-xl text-[13px] transition-all text-left whitespace-nowrap',
                    themeName === industry.id ? 'font-medium' : 'opacity-70 hover:opacity-100'
                  )}
                  style={{
                    backgroundColor: themeName === industry.id
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'transparent',
                    color: '#FFFFFF',
                  }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {industry.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
