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

export function StorePage() {
  const navigate = useNavigate();

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

      {/* Fixed Back Button */}
      <button
        onClick={() => navigate('/select')}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all hover:scale-105"
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
    </div>
  );
}
