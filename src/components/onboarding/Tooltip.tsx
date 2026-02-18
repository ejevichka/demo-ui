import { motion } from 'framer-motion';

interface TooltipProps {
  text: string;
  position: 'top' | 'bottom' | 'left';
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}

/**
 * White onboarding tooltip with arrow
 */
export function Tooltip({ text, position, style, className = '', delay = 0 }: TooltipProps) {
  const getInitialAnimation = () => {
    if (position === 'left') return { opacity: 0, scale: 0.9, x: 10, y: '-50%' };
    return { opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10, x: '-50%' };
  };

  const getAnimateAnimation = () => {
    if (position === 'left') return { opacity: 1, scale: 1, x: 0, y: '-50%' };
    return { opacity: 1, scale: 1, y: 0, x: '-50%' };
  };

  return (
    <motion.div
      initial={getInitialAnimation()}
      animate={getAnimateAnimation()}
      exit={getInitialAnimation()}
      transition={{ duration: 0.3, ease: 'easeOut', delay: delay / 1000 }}
      className={`fixed z-[100] pointer-events-none ${className}`}
      style={style}
    >
      {/* Arrow pointing up (when tooltip is below target) */}
      {position === 'bottom' && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '10px solid #FFFFFF',
          }}
        />
      )}

      {/* Tooltip body - white with dark text */}
      <div
        className="px-5 py-3 rounded-xl text-sm font-medium text-center"
        style={{
          backgroundColor: '#FFFFFF',
          color: '#1a1a2e',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
          maxWidth: '280px',
        }}
      >
        {text}
      </div>

      {/* Arrow pointing down (when tooltip is above target) */}
      {position === 'top' && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '10px solid #FFFFFF',
          }}
        />
      )}

      {/* Arrow pointing right (when tooltip is to the left of target) */}
      {position === 'left' && (
        <div
          className="absolute top-1/2 -translate-y-1/2 -right-2"
          style={{
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderLeft: '10px solid #FFFFFF',
          }}
        />
      )}
    </motion.div>
  );
}
