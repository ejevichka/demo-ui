import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  StoreHeader,
  NavigationBar,
  HeroBanner,
  ProductGrid,
  AISearchBar,
  ThemeSwitcher,
} from '@/components/store';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { OnboardingProvider } from '@/hooks/useOnboarding';
import { DemoBanner, DemoWelcomeModal } from '@/components/demo';
import { useTheme } from '@/hooks/useTheme';

export function StorePage() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <OnboardingProvider>
      <div className="min-h-screen">
        <DemoBanner isDark={theme.isDark} />
        <StoreHeader />
        <NavigationBar />
        <HeroBanner />
        <ProductGrid />

        {/* Floating AI Search Bar with integrated chat */}
        <AISearchBar />

        {/* Theme Switcher (for demo) */}
        <ThemeSwitcher />

        {/* Fixed Back Button - top on mobile, bottom on desktop */}
        <button
          onClick={() => navigate('/select')}
          className="fixed top-4 left-4 md:top-auto md:bottom-6 md:left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all hover:scale-105"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#FFFFFF',
            backdropFilter: 'blur(8px)',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Bottom padding for floating bar */}
        <div className="h-24" />

        {/* Onboarding tour for new users */}
        <OnboardingTour />
        <DemoWelcomeModal />
      </div>
    </OnboardingProvider>
  );
}
