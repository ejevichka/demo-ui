import { useTheme } from '@/hooks/useTheme';

export function HeroBanner() {
  const { theme } = useTheme();

  // Different layouts based on theme
  if (theme.id === 'bluemarket') {
    return <SplitHero />;
  }

  if (theme.id === 'brownmarket') {
    return <DarkHero />;
  }

  // Default: RedMarket style with solid color block
  return <BlockHero />;
}

// RedMarket style - solid color block overlaying image
function BlockHero() {
  const { theme } = useTheme();

  return (
    <section className="relative overflow-hidden h-[320px] md:h-[380px]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&h=600&fit=crop)`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        {/* Solid color block */}
        <div
          className="relative z-10 px-8 py-10 max-w-[380px]"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          {/* Main title */}
          <h1 className="text-white leading-tight mb-1">
            <span className="block text-[40px] md:text-[48px] font-bold">
              {theme.heroTitle.split(' ').slice(0, 1).join(' ')}
            </span>
            <span className="block text-[40px] md:text-[48px] font-bold">
              {theme.heroTitle.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-lg mb-6 leading-snug">
            {theme.heroSubtitle}
          </p>

          {/* CTA Button */}
          <button
            className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--neutral-900)',
            }}
          >
            More
          </button>
        </div>
      </div>
    </section>
  );
}

// BlueMarket style - split text/image layout
function SplitHero() {
  const { theme } = useTheme();

  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[380px] md:min-h-[450px]">
        {/* Left: Text content */}
        <div
          className="flex-1 flex items-center px-6 md:px-12 lg:px-16 py-12"
          style={{ backgroundColor: 'var(--neutral-0)' }}
        >
          <div className="max-w-lg">
            <h1
              className="text-[36px] md:text-[44px] font-bold mb-4 leading-tight"
              style={{ color: 'var(--neutral-900)' }}
            >
              {theme.heroTitle}
            </h1>
            <p
              className="text-lg mb-6"
              style={{ color: 'var(--neutral-600)' }}
            >
              {theme.heroSubtitle}
            </p>
            <button
              className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                border: '2px solid var(--neutral-900)',
                color: 'var(--neutral-900)',
                backgroundColor: 'transparent',
              }}
            >
              More
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 relative min-h-[280px] lg:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop"
            alt="Adventure"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// KRUPS/Brownmarket style - dark theme hero
function DarkHero() {
  const { theme } = useTheme();

  return (
    <section
      className="relative overflow-hidden min-h-[380px] md:min-h-[450px]"
      style={{ backgroundColor: 'var(--neutral-999)' }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=600&fit=crop)`,
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-20 flex items-center h-full">
        <div className="max-w-lg">
          <h1 className="text-[36px] md:text-[44px] font-bold mb-4 text-white leading-tight">
            {theme.heroTitle}
          </h1>
          <p
            className="text-lg mb-8"
            style={{ color: 'var(--neutral-300)' }}
          >
            {theme.heroSubtitle}
          </p>
          <button
            className="px-8 py-3 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Discover
          </button>
        </div>
      </div>
    </section>
  );
}
