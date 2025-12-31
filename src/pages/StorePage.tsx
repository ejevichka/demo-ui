import {
  StoreHeader,
  NavigationBar,
  HeroBanner,
  ProductGrid,
  AISearchBar,
  ThemeSwitcher,
} from '@/components/store';

export function StorePage() {
  return (
    <div className="min-h-screen">
      <StoreHeader />
      <NavigationBar />
      <HeroBanner />
      <ProductGrid />

      {/* Floating AI Search Bar with integrated chat */}
      <AISearchBar />

      {/* Theme Switcher (for demo) */}
      <ThemeSwitcher />

      {/* Bottom padding for floating bar */}
      <div className="h-24" />
    </div>
  );
}
