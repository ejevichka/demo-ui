import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ThemeName } from '@/types';

interface Industry {
  id: ThemeName;
  title: string;
  image: string;
}

// Images matched to Figma screenshot
const industries: Industry[] = [
  {
    id: 'brownmarket',
    title: 'Electronics',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&h=960&fit=crop', // Coffee machine
  },
  {
    id: 'bluemarket',
    title: 'Sport and outdoor',
    image: '/cf441d691ac404471b92cf344dc2349a8436a6f1.png', // Cyclist
  },
  {
    id: 'brainform',
    title: 'Beauty and cosmetic',
    image: '/Image.png', // Woman
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
      style={{ backgroundColor: '#FAFAFF' }}
    >
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-[80px] md:py-[40px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-8 md:mb-[48px]">
            <span
              className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em]"
              style={{ color: '#AAA6B3' }}
            >
              Product Demo
            </span>
            <h1
              className="text-[28px] sm:text-[36px] md:text-[48px] font-bold mt-2"
              style={{ color: '#1A1726' }}
            >
              Choose industry
            </h1>
          </div>

          {/* Cards grid - vertical on mobile, horizontal on desktop */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-[24px] w-full md:w-auto">
            {industries.map((industry) => (
              <IndustryCard
                key={industry.id}
                industry={industry}
                onClick={() => handleSelect(industry)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-4 px-4 sm:px-6 md:py-[16px] md:px-[24px]"
        style={{ borderTop: '1px solid #E1E1F5' }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <BrainformLogo />
            <span
              className="text-[14px] font-medium"
              style={{ color: '#1A1726' }}
            >
              brainform.ai
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                backgroundColor: '#541CF9',
                color: '#FFFFFF',
              }}
            >
              <Zap className="w-4 h-4" />
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
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden',
        'transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        // Responsive sizing
        'w-full md:w-[320px]',
        'h-[280px] sm:h-[360px] md:h-[480px]',
        'rounded-xl md:rounded-2xl'
      )}
    >
      {/* Full-bleed image */}
      <img
        src={industry.image}
        alt={industry.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Title - positioned above footer bar */}
      <h3
        className="absolute left-4 right-4 md:left-[20px] md:right-[20px] text-[18px] md:text-[20px] font-semibold text-white text-center bottom-[60px] md:bottom-[72px]"
      >
        {industry.title}
      </h3>

    </button>
  );
}

function BrainformLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(16, 16)">
        <path
          d="M0 -14L14 0L0 14L-14 0Z"
          stroke="#1A1726"
          strokeWidth="1.5"
          fill="none"
        />
        {[0.75, 0.55, 0.4, 0.28, 0.18].map((scale, i) => (
          <path
            key={i}
            d={`M0 ${-14 * scale}L${14 * scale} 0L0 ${14 * scale}L${-14 * scale} 0Z`}
            stroke="#1A1726"
            strokeWidth="1"
            fill="none"
            opacity={1 - i * 0.15}
          />
        ))}
      </g>
    </svg>
  );
}
