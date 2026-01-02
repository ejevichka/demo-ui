import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import type { ThemeName } from '@/types';

// Three industries matching IndustrySelectPage cards
const industries: { id: ThemeName; name: string }[] = [
  { id: 'brownmarket', name: 'Consumer electronics' },
  { id: 'bluemarket', name: 'Sport and outdoor' },
  { id: 'brainform', name: 'Beauty and cosmetic' },
];

export function ThemeSwitcher() {
  const { themeName, setTheme, theme } = useTheme();
  const isDark = theme.isDark;

  return (
    <div
      className="fixed top-4 md:top-20 right-4 z-30 flex flex-col gap-1 p-2 rounded-xl shadow-lg"
      style={{
        backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
      }}
    >
      <span
        className="text-[11px] font-medium uppercase tracking-wider px-2 py-1"
        style={{ color: isDark ? 'var(--neutral-400)' : 'var(--neutral-500)' }}
      >
        Industry
      </span>
      {industries.map((industry) => (
        <button
          key={industry.id}
          onClick={() => setTheme(industry.id)}
          className={cn(
            'px-3 py-2 text-[13px] rounded-lg transition-all text-left',
            themeName === industry.id
              ? 'font-medium'
              : 'hover:opacity-70'
          )}
          style={{
            backgroundColor: themeName === industry.id ? 'var(--primary)' : 'transparent',
            color: themeName === industry.id
              ? 'var(--primary-foreground)'
              : isDark ? '#FFFFFF' : 'var(--neutral-900)',
          }}
        >
          {industry.name}
        </button>
      ))}
    </div>
  );
}
