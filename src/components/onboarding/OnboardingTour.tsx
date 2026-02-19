import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { Tooltip } from './Tooltip';
import { useOnboarding } from '@/hooks/useOnboarding';

// Data-onboarding selectors for DOM targeting
const ANCHORS = {
  aiButton: '[data-onboarding="ai-shopping"]',
  aiInput: '[data-onboarding="ai-input"]',
  productCard: '[data-onboarding="first-product-card"]',
  modalAIHeading: '[data-onboarding="modal-ai-heading"]',
  themeSwitcher: '[data-onboarding="theme-switcher"]',
} as const;

/**
 * Hook to track DOM element position with polling
 */
function useAnchorRect(selector: string, active: boolean): DOMRect | null {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const measure = useCallback(() => {
    const el = document.querySelector(selector);
    setRect(el ? el.getBoundingClientRect() : null);
  }, [selector]);

  useEffect(() => {
    if (!active) {
      setRect(null);
      return;
    }

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    // Poll for position changes (handles animations, lazy loading)
    const interval = setInterval(measure, 300);

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
      clearInterval(interval);
    };
  }, [active, measure]);

  return rect;
}

/**
 * Onboarding tour that shows sequential tooltips:
 * Step 1: "Click to expand product page" on first product card
 * Step 2: "Click to get answers for most relevant questions" on modal suggestions
 * Step 3: "Switch between industries" on ThemeSwitcher
 */
export function OnboardingTour() {
  const { step, advance } = useOnboarding();

  const isStep1 = step === 'step1_product_card';
  const isStep2 = step === 'step2_modal_suggestions';

  // Step 1 anchors (all shown together)
  const aiButtonRect = useAnchorRect(ANCHORS.aiButton, isStep1);
  const aiInputRect = useAnchorRect(ANCHORS.aiInput, isStep1);
  const productCardRect = useAnchorRect(ANCHORS.productCard, isStep1);

  // Step 2 anchor
  const aiHeadingRect = useAnchorRect(ANCHORS.modalAIHeading, isStep2);

  // ThemeSwitcher shown in step1 together with other tooltips
  const themeSwitcherRect = useAnchorRect(ANCHORS.themeSwitcher, isStep1);

  // Track individually dismissed tooltips in step1
  const [dismissedInStep1, setDismissedInStep1] = useState<Set<string>>(new Set());

  // Dismiss all step1 tooltips on any click
  useEffect(() => {
    if (!isStep1) return;

    const handleAnyClick = () => {
      setDismissedInStep1(new Set(['ai-button', 'ai-input', 'product-card', 'theme-switcher']));
    };

    // Delay to avoid catching initial page load clicks
    const timeout = setTimeout(() => {
      window.addEventListener('click', handleAnyClick, { once: true });
    }, 500);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('click', handleAnyClick);
    };
  }, [isStep1]);

  // Step 2: dismiss on any click (advances to step 3)
  useEffect(() => {
    if (!isStep2) return;

    const handleAnyClick = () => {
      advance();
    };

    // Delay to avoid catching the modal open click
    const timeout = setTimeout(() => {
      window.addEventListener('click', handleAnyClick, { once: true });
    }, 200);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('click', handleAnyClick);
    };
  }, [isStep2, advance]);

  if (!isStep1 && !isStep2) return null;

  const content = (
    <AnimatePresence>
      {/* Step 1: AI Shopping button tooltip */}
      {isStep1 && aiButtonRect && !dismissedInStep1.has('ai-button') && (
        <Tooltip
          key="step1-ai-button"
          text="Click to start AI Shopping Mode"
          position="bottom"
          delay={200}
          style={{
            top: aiButtonRect.bottom + 16,
            left: aiButtonRect.left + aiButtonRect.width / 2,
          }}
        />
      )}

      {/* Step 1: AI Input tooltip */}
      {isStep1 && aiInputRect && !dismissedInStep1.has('ai-input') && (
        <Tooltip
          key="step1-ai-input"
          text="Click to start AI Shopping Mode"
          position="top"
          delay={1200}
          style={{
            top: aiInputRect.top - 60,
            left: aiInputRect.left + aiInputRect.width / 2,
          }}
        />
      )}

      {/* Step 1: First product card tooltip */}
      {isStep1 && productCardRect && !dismissedInStep1.has('product-card') && (
        <Tooltip
          key="step1-product"
          text="Click to expand product page"
          position="top"
          delay={300}
          style={{
            top: productCardRect.top - 16,
            left: productCardRect.left + productCardRect.width / 2,
          }}
        />
      )}

      {/* Step 2: Modal AI heading tooltip */}
      {isStep2 && aiHeadingRect && (
        <Tooltip
          key="step2"
          text="Click to get answers for most relevant questions"
          position="top"
          delay={400}
          style={{
            top: aiHeadingRect.top - 16,
            left: aiHeadingRect.left + aiHeadingRect.width / 2,
          }}
        />
      )}

      {/* Step 1: ThemeSwitcher tooltip (shown with other step1 tooltips) */}
      {isStep1 && themeSwitcherRect && !dismissedInStep1.has('theme-switcher') && (
        <Tooltip
          key="step1-theme-switcher"
          text="Switch between industries"
          position="left"
          delay={200}
          style={{
            top: themeSwitcherRect.top + themeSwitcherRect.height / 2,
            left: themeSwitcherRect.left - 200,
          }}
        />
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return null;
}
