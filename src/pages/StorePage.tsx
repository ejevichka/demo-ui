import { useEffect } from 'react';
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
import { agentManifestHref, openStorePicker, webMcpScriptSrc } from '@/lib/webmcp';

/**
 * Exposes this store's agent tools to a browser agent, and points agents at its manifest.
 *
 * The script is loaded from this store's own API prefix, which is what decides whose tools get registered — see
 * src/lib/webmcp.ts. It is not removed on unmount: the registration belongs to the document and the script itself
 * drops it on `pagehide`, so removing the tag would leave the tools registered with nothing watching them.
 */
function useWebMcpTools(): void {
  const { themeName } = useTheme();

  useEffect(() => {
    const src = webMcpScriptSrc(themeName);
    if (src === null || document.querySelector(`script[src="${src}"]`) !== null) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = src;
    document.head.appendChild(script);

    const href = agentManifestHref(themeName);
    if (href !== null && document.querySelector(`link[rel="ard"][href="${href}"]`) === null) {
      const link = document.createElement('link');
      link.rel = 'ard';
      link.href = href;
      document.head.appendChild(link);
    }
    // Intentionally once per document: a store change is always a full page load, and a re-run
    // could not deliver the new store's tools anyway — the script registers once per window and
    // ignores any later load, so a second tag would leave the page showing one store while
    // offering another's tools.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function StorePage() {
  const { theme } = useTheme();

  useWebMcpTools();

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
          onClick={openStorePicker}
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
