import { useNavigate } from 'react-router-dom';
import { Zap, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { brandTokens } from '@/lib/themes';
import type { ThemeName } from '@/types';

interface Industry {
  id: ThemeName;
  title: string;
  image: string;
}

const industries: Industry[] = [
  {
    id: 'redmarket',
    title: 'Consumer electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=800&fit=crop',
  },
  {
    id: 'bluemarket',
    title: 'Sport and outdoor',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=800&fit=crop',
  },
  {
    id: 'brainform',
    title: 'Beauty and cosmetic',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop',
  },
  {
    id: 'brownmarket',
    title: 'Coffee machines (KRUPS)',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=800&fit=crop',
  },
];

export function IndustrySelectPage() {
  const navigate = useNavigate();

  const handleSelect = (industry: Industry) => {
    navigate(`/demo/${industry.id}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--neutral-0, #FAFAFF)' }}
    >
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-[80px] py-[40px]">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="text-[12px] uppercase tracking-[0.1em]"
            style={{ color: 'var(--neutral-400, #AAA6B3)' }}
          >
            Title
          </span>
          <h1
            className="text-[48px] font-bold mt-2"
            style={{ color: 'var(--neutral-900, #1A1726)' }}
          >
            Choose Your Adventure
          </h1>
        </div>

        {/* Cards grid - matches Figma: 475px x 712px cards with 24px gap */}
        <div className="flex flex-wrap justify-center gap-6">
          {industries.map((industry) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              onClick={() => handleSelect(industry)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-4 px-6"
        style={{ borderTop: '1px solid var(--neutral-200, #E1E1F5)' }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[14px] font-medium">
            <BrainformLogo />
            <span style={{ color: 'var(--neutral-900, #1A1726)' }}>brainform.ai</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[14px]">
              <Code
                className="w-4 h-4"
                style={{ color: 'var(--neutral-600, #5A5763)' }}
              />
              <span style={{ color: 'var(--neutral-600, #5A5763)' }}>
                Developer console
              </span>
              <span
                className="text-[12px] hidden md:inline"
                style={{ color: 'var(--neutral-400, #AAA6B3)' }}
              >
                Asset the Brainform backend to configure agents and view analytics.
              </span>
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              <Zap className="w-4 h-4" />
              Label
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface IndustryCardProps {
  industry: Industry;
  onClick: () => void;
}

function IndustryCard({ industry, onClick }: IndustryCardProps) {
  const tokens = brandTokens[industry.id];

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative rounded-2xl overflow-hidden',
        'transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl',
        'focus:outline-none focus:ring-2 focus:ring-offset-2'
      )}
      style={{
        width: '475px',
        height: '712px',
      }}
    >
      {/* Full-bleed image */}
      <img
        src={industry.image}
        alt={industry.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Title - positioned above footer bar */}
      <h3
        className="absolute left-5 right-5 text-[22px] font-semibold text-white text-left"
        style={{ bottom: '72px' }}
      >
        {industry.title}
      </h3>

      {/* Footer bar - uses brand tokens from themes.ts */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4"
        style={{ backgroundColor: tokens.primary }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: tokens.primaryForeground, opacity: 0.5 }}
          />
          <span
            className="text-[14px]"
            style={{ color: tokens.primaryForeground }}
          >
            Label
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: tokens.primaryForeground }}
          >
            Launch Demo →
          </span>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: tokens.primaryForeground, opacity: 0.5 }}
          />
        </div>
      </div>
    </button>
  );
}

function BrainformLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(16, 16)">
        <path
          d="M0 -14L14 0L0 14L-14 0Z"
          stroke="var(--neutral-900, #1A1726)"
          strokeWidth="1.5"
          fill="none"
        />
        {[0.75, 0.55, 0.4, 0.28, 0.18].map((scale, i) => (
          <path
            key={i}
            d={`M0 ${-14 * scale}L${14 * scale} 0L0 ${14 * scale}L${-14 * scale} 0Z`}
            stroke="var(--neutral-900, #1A1726)"
            strokeWidth="1"
            fill="none"
            opacity={1 - i * 0.15}
          />
        ))}
      </g>
    </svg>
  );
}
