import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Search, ShoppingBag, Palette } from 'lucide-react';
import { useDemoMode } from '@/hooks/useDemo';
import { useTheme } from '@/hooks/useTheme';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, damping: 22, stiffness: 220, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    filter: 'blur(8px)',
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const features = [
  { icon: Search, text: 'AI-powered search and shopping assistance' },
  { icon: ShoppingBag, text: 'Explore product details and reviews' },
  { icon: Palette, text: 'Switch between industry themes' },
];

export function DemoWelcomeModal() {
  const { showWelcome, dismissWelcome } = useDemoMode();
  const { theme } = useTheme();
  const isDark = theme.isDark;

  const content = (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="demo-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] liquid-overlay"
            onClick={dismissWelcome}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="demo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-welcome-title"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed z-[111] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-[480px] rounded-2xl overflow-hidden"
            style={{
              backgroundColor: isDark ? 'var(--neutral-900)' : '#FFFFFF',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={dismissWelcome}
              aria-label="Close welcome dialog"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
              style={{
                backgroundColor: isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
                color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)',
              }}
            >
              <X className="w-4 h-4" />
            </motion.button>

            <div className="p-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <h2
                id="demo-welcome-title"
                className="text-2xl font-bold mb-3"
                style={{ color: isDark ? '#FFFFFF' : 'var(--neutral-900)' }}
              >
                Welcome to the Interactive Demo
              </h2>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-600)' }}
              >
                This is a simulated storefront powered by Brainform AI. Browse products,
                interact with the AI shopping assistant, and experience personalised
                recommendations — no account or payment required.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {features.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isDark
                          ? 'rgba(255,255,255,0.08)'
                          : 'var(--neutral-100)',
                      }}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--primary)' }}
                      />
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: isDark ? 'var(--neutral-300)' : 'var(--neutral-700)' }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
                onClick={dismissWelcome}
                className="w-full h-12 rounded-lg text-base font-medium"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                }}
              >
                Explore Demo
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(content, document.body);
}
