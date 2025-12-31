import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ThemeName, ThemeConfig } from '@/types';
import { themes, getTheme } from '@/lib/themes';

interface ThemeContextType {
  theme: ThemeConfig;
  themeName: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export function ThemeProvider({ children, defaultTheme = 'redmarket' }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const theme = getTheme(themeName);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', themeName);
  }, [themeName]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeName(newTheme);
  };

  const availableThemes = Object.values(themes);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
