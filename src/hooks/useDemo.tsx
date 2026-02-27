import { createContext, useContext, useState, type ReactNode } from 'react';
import { hasSeenDemoWelcome, markDemoWelcomeSeen } from '@/lib/demo';

interface DemoContextType {
  showWelcome: boolean;
  dismissWelcome: () => void;
  isDemoMode: boolean;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [showWelcome, setShowWelcome] = useState(() => !hasSeenDemoWelcome());

  const dismissWelcome = () => {
    markDemoWelcomeSeen();
    setShowWelcome(false);
  };

  return (
    <DemoContext.Provider value={{ showWelcome, dismissWelcome, isDemoMode: true }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoProvider');
  }
  return context;
}
