import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { Tooltip } from './Tooltip';
import { useOnboarding } from '@/hooks/useOnboarding';

// Data-onboarding selectors for DOM targeting
const ANCHORS = {
  productCard: '[data-onboarding="first-product-card"]',
  modalSuggestions: '[data-onboarding="modal-suggestions"]',
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
  const { step, complete } = useOnboarding();

  const isStep1 = step === 'step1_product_card';
  const isStep2 = step === 'step2_modal_suggestions';
  const isStep3 = step === 'step3_theme_switcher';

  const productCardRect = useAnchorRect(ANCHORS.productCard, isStep1);
  const suggestionsRect = useAnchorRect(ANCHORS.modalSuggestions, isStep2);
  const themeSwitcherRect = useAnchorRect(ANCHORS.themeSwitcher, isStep3);

  // Auto-complete step 3 after timeout or on any click
  useEffect(() => {
    if (!isStep3) return;

    let done = false;
    const completeStep = () => {
      if (done) return;
      done = true;
      complete();
    };

    const timer = setTimeout(completeStep, 6000);
    window.addEventListener('click', completeStep, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', completeStep);
    };
  }, [isStep3, complete]);

  if (!isStep1 && !isStep2 && !isStep3) return null;

  const content = (
    <AnimatePresence>
      {/* Step 1: First product card tooltip */}
      {isStep1 && productCardRect && (
        <Tooltip
          key="step1"
          text="Click to expand product page"
          position="bottom"
          delay={300}
          style={{
            top: productCardRect.bottom + 16,
            left: productCardRect.left + productCardRect.width / 2,
          }}
        />
      )}

      {/* Step 2: Modal suggestions tooltip */}
      {isStep2 && suggestionsRect && (
        <Tooltip
          key="step2"
          text="Click to get answers for most relevant questions"
          position="left"
          delay={400}
          style={{
            top: suggestionsRect.top + suggestionsRect.height / 2,
            left: suggestionsRect.left - 16,
          }}
        />
      )}

      {/* Step 3: ThemeSwitcher tooltip */}
      {isStep3 && themeSwitcherRect && (
        <Tooltip
          key="step3"
          text="Switch between industries"
          position="left"
          delay={300}
          style={{
            top: themeSwitcherRect.top + themeSwitcherRect.height / 2,
            left: themeSwitcherRect.left - 16,
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
