import { Search, Heart, User, ShoppingCart, Sparkles } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function StoreHeader() {
  const { theme } = useTheme();

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: theme.isDark ? 'var(--neutral-999)' : '#FFFFFF',
        borderBottom: `1px solid ${theme.isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {theme.id === 'brownmarket' ? (
                <span
                  className="text-xl font-bold tracking-wider"
                  style={{ color: '#FFFFFF' }}
                >
                  {theme.logoIcon}
                </span>
              ) : (
                <>
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center text-white font-bold text-base"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    {theme.id === 'redmarket' ? 'E' : theme.id === 'bluemarket' ? (
                      <MountainIcon />
                    ) : 'B'}
                  </div>
                  <span
                    className="font-semibold text-lg hidden sm:inline"
                    style={{ color: 'var(--primary)' }}
                  >
                    {theme.storeName}
                  </span>
                </>
              )}
            </div>

            {/* Menu button - red border style for light themes */}
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              style={{
                border: theme.isDark
                  ? '1px solid var(--neutral-700)'
                  : '1px solid var(--primary)',
                color: theme.isDark ? '#FFFFFF' : 'var(--primary)',
                backgroundColor: 'transparent',
              }}
            >
              <GridIcon color={theme.isDark ? '#FFFFFF' : 'var(--primary)'} />
              <span className="hidden lg:inline">Menu</span>
            </button>
          </div>

          {/* Center: AI Agent Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: theme.isDark ? '#FFFFFF' : 'var(--neutral-900)',
              color: theme.isDark ? 'var(--neutral-900)' : '#FFFFFF',
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Agent</span>
          </button>

          {/* Right: Search + Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg flex-1 max-w-[240px]"
              style={{
                backgroundColor: theme.isDark ? 'var(--neutral-700)' : 'var(--neutral-100)',
              }}
            >
              <Search
                className="w-4 h-4"
                style={{ color: 'var(--neutral-400)' }}
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent border-none outline-none text-sm flex-1"
                style={{
                  color: theme.isDark ? '#FFFFFF' : 'var(--neutral-900)',
                }}
              />
            </div>

            {/* Icons */}
            <button
              className="p-2 rounded-lg transition-colors hover:bg-black/5 md:hidden"
            >
              <Search
                className="w-5 h-5"
                style={{ color: theme.isDark ? '#FFFFFF' : 'var(--neutral-700)' }}
              />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-black/5">
              <Heart
                className="w-5 h-5"
                style={{ color: theme.isDark ? '#FFFFFF' : 'var(--neutral-700)' }}
              />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-black/5 hidden sm:block">
              <User
                className="w-5 h-5"
                style={{ color: theme.isDark ? '#FFFFFF' : 'var(--neutral-700)' }}
              />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-black/5">
              <ShoppingCart
                className="w-5 h-5"
                style={{ color: theme.isDark ? '#FFFFFF' : 'var(--neutral-700)' }}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// 2x2 Grid icon matching Figma
function GridIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="9" y="1" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="1" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// Mountain icon for BlueMarket
function MountainIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2L14 14H2L8 2Z" fill="white" />
    </svg>
  );
}
