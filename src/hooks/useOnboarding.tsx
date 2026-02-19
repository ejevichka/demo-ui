import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { OnboardingStep } from '@/lib/onboarding';
import { hasSeenOnboarding, markOnboardingComplete } from '@/lib/onboarding';

interface OnboardingContextType {
  step: OnboardingStep;
  advance: () => void;
  complete: () => void;
  isActive: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<OnboardingStep>(() =>
    hasSeenOnboarding() ? 'idle' : 'step1_product_card'
  );

  const advance = useCallback(() => {
    setStep(prev => {
      if (prev === 'step1_product_card') return 'step2_modal_suggestions';
      if (prev === 'step2_modal_suggestions') return 'step3_theme_switcher';
      if (prev === 'step3_theme_switcher') return 'complete';
      return prev;
    });
  }, []);

  const complete = useCallback(() => {
    setStep('complete');
  }, []);

  // Persist to localStorage when reaching complete state (from any path)
  useEffect(() => {
    if (step === 'complete') {
      markOnboardingComplete();
    }
  }, [step]);

  // Step 1 -> Complete: AI chat opened (user clicked AI button or input)
  useEffect(() => {
    const handler = () => {
      setStep(prev => prev === 'step1_product_card' ? 'complete' : prev);
    };
    window.addEventListener('openAIChat', handler);
    return () => window.removeEventListener('openAIChat', handler);
  }, []);

  // Step 1 -> Step 2: ProductBuyModal opened
  useEffect(() => {
    const handler = () => {
      setStep(prev => prev === 'step1_product_card' ? 'step2_modal_suggestions' : prev);
    };
    window.addEventListener('onboarding:product-modal-opened', handler);
    return () => window.removeEventListener('onboarding:product-modal-opened', handler);
  }, []);

  // Step 2 -> Step 3: ProductBuyModal closed
  useEffect(() => {
    const handler = () => {
      setStep(prev => prev === 'step2_modal_suggestions' ? 'step3_theme_switcher' : prev);
    };
    window.addEventListener('onboarding:product-modal-closed', handler);
    return () => window.removeEventListener('onboarding:product-modal-closed', handler);
  }, []);

  const isActive = step !== 'idle' && step !== 'complete';

  return (
    <OnboardingContext.Provider value={{ step, advance, complete, isActive }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
