const DEMO_WELCOME_KEY = 'brainform_demo_welcome_shown';

export function hasSeenDemoWelcome(): boolean {
  return localStorage.getItem(DEMO_WELCOME_KEY) === 'true';
}

export function markDemoWelcomeSeen(): void {
  localStorage.setItem(DEMO_WELCOME_KEY, 'true');
}

export function resetDemoWelcome(): void {
  localStorage.removeItem(DEMO_WELCOME_KEY);
}
