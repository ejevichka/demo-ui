/**
 * Onboarding utilities for managing "shown once" flag
 */

export type OnboardingStep =
  | 'idle'
  | 'step1_product_card'
  | 'step2_modal_suggestions'
  | 'step3_theme_switcher'
  | 'complete';

const ONBOARDING_KEY = 'brainform_onboarding_shown';

/**
 * Check if user has already seen the onboarding tour
 */
export function hasSeenOnboarding(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
}

/**
 * Mark onboarding as complete (won't show again)
 */
export function markOnboardingComplete(): void {
  localStorage.setItem(ONBOARDING_KEY, 'true');
}

/**
 * Reset onboarding flag (will show again on next visit)
 * Called when a new user registers
 */
export function resetOnboarding(): void {
  localStorage.removeItem(ONBOARDING_KEY);
}
