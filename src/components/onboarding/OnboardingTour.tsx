import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { Tooltip } from './Tooltip';
import { markOnboardingComplete } from '@/lib/onboarding';

interface OnboardingTourProps {
  onComplete: () => void;
}

type Step = 'waiting' | 'step1' | 'complete';

// Staggered delays for tooltip appearance (in ms)
const TOP_TOOLTIP_DELAY = 200;
const BOTTOM_TOOLTIP_DELAY = 1200;

/**
 * Onboarding tour component that shows tooltips pointing to key UI elements
 * Step 1: Shows tooltips on AI Shopping button and AI input
 * Step 2: Shows tooltip on input when chat is expanded
 */
export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [step, setStep] = useState<Step>('waiting');
  const [positions, setPositions] = useState<{
    aiButton: DOMRect | null;
    aiInput: DOMRect | null;
  }>({ aiButton: null, aiInput: null });

  // Calculate positions of target elements
  const updatePositions = useCallback(() => {
    const aiButton = document.querySelector('[data-onboarding="ai-shopping"]');
    const aiInput = document.querySelector('[data-onboarding="ai-input"]');

    setPositions({
      aiButton: aiButton?.getBoundingClientRect() || null,
      aiInput: aiInput?.getBoundingClientRect() || null,
    });
  }, []);

  // Start onboarding immediately (tooltips have their own staggered delays)
  useEffect(() => {
    setStep('step1');
    updatePositions();
  }, [updatePositions]);

  // Update positions on mount and resize
  useEffect(() => {
    if (step === 'waiting') return;

    updatePositions();

    const handleResize = () => updatePositions();
    const handleScroll = () => updatePositions();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    // Poll for position changes (in case elements animate)
    const interval = setInterval(updatePositions, 300);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
      clearInterval(interval);
    };
  }, [step, updatePositions]);

  const completeTour = useCallback(() => {
    setStep('complete');
    markOnboardingComplete();
    onComplete();
  }, [onComplete]);

  // Listen for AI chat opening - complete tour when chat opens
  useEffect(() => {
    const handleAIChatOpen = () => {
      if (step === 'step1') {
        completeTour();
      }
    };

    window.addEventListener('openAIChat', handleAIChatOpen);
    return () => window.removeEventListener('openAIChat', handleAIChatOpen);
  }, [step, completeTour]);

  if (step === 'complete' || step === 'waiting') return null;

  const content = (
    <AnimatePresence>
      {/* Semi-transparent backdrop for step 1 - pointer-events-none to allow clicks through */}
      {step === 'step1' && (
        <div
          className="fixed inset-0 z-[99] pointer-events-none"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        />
      )}

      {/* Step 1: Tooltips on AI Shopping button and AI input */}
      {step === 'step1' && (
        <>
          {/* Tooltip for AI Shopping button in header (centered) */}
          {positions.aiButton && (
            <Tooltip
              text="Click to start AI Shopping Mode"
              position="bottom"
              delay={TOP_TOOLTIP_DELAY}
              style={{
                top: positions.aiButton.bottom + 16,
                left: positions.aiButton.left + positions.aiButton.width / 2,
              }}
            />
          )}

          {/* Tooltip for AI input at bottom */}
          {positions.aiInput && (
            <Tooltip
              text="Click to start AI Shopping Mode"
              position="top"
              delay={BOTTOM_TOOLTIP_DELAY}
              style={{
                top: positions.aiInput.top - 60,
                left: positions.aiInput.left + positions.aiInput.width / 2,
              }}
            />
          )}
        </>
      )}

    </AnimatePresence>
  );

  // Render via portal to ensure proper z-index
  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return null;
}
