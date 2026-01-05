import { useTheme } from '@/hooks/useTheme';

export function HeroBanner() {
  const { theme } = useTheme();

  // Different layouts based on theme
  if (theme.id === 'brainform') {
    return <BeautyHero />;
  }

  if (theme.id === 'bluemarket') {
    return <SplitHero />;
  }

  if (theme.id === 'brownmarket') {
    return <DarkHero />;
  }

  // Default: RedMarket style with solid color block
  return <BlockHero />;
}

// ElysianGlow Beauty style - elegant serif typography
function BeautyHero() {
  const { theme } = useTheme();

  return (
    <section
      className="relative overflow-hidden min-h-[380px] md:min-h-[500px]"
      style={{ backgroundColor: '#F5F3EE' }}
    >
      <div className="container mx-auto px-4 md:px-8 h-full">
        <div className="flex flex-col lg:flex-row items-center h-full py-8 lg:py-0">
          {/* Left: Text content */}
          <div className="flex-1 flex flex-col justify-center py-8 lg:py-16 z-10">
            {/* Flash sale label */}
            {theme.heroLabel && (
              <span
                className="text-[18px] md:text-[20px] mb-2"
                style={{
                  color: '#7A7A7A',
                  fontStyle: 'italic',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {theme.heroLabel}
              </span>
            )}

            {/* Main title - serif font */}
            <h1
              className="text-[48px] md:text-[72px] lg:text-[88px] font-normal leading-[0.95] mb-6"
              style={{
                color: '#2D2D2D',
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              {theme.heroTitle.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              className="text-[16px] md:text-[18px] leading-relaxed max-w-[420px] mb-8"
              style={{ color: '#5A5A5A' }}
            >
              {theme.heroSubtitle}
            </p>

            {/* CTA Button */}
            <button
              className="self-start px-8 py-3 rounded-lg text-[14px] font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
              }}
            >
              Shop Now
            </button>
          </div>

          {/* Right: Image with discount badge */}
          <div className="flex-1 relative min-h-[300px] lg:min-h-[450px] w-full">
            <img
              src="/cream.webp"
              alt="Beauty products"
              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
            />
            {/* Discount badge */}
            <div
              className="absolute top-4 right-4 md:top-8 md:right-8 w-20 h-20 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center"
              style={{ backgroundColor: '#1A1A1A' }}
            >
              <span className="text-white text-[28px] md:text-[40px] font-bold leading-none">25%</span>
              <span className="text-white text-[12px] md:text-[14px]">off</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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
            src="/sport.webp"
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
          backgroundImage: `url(/coffee.jpg)`,
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
