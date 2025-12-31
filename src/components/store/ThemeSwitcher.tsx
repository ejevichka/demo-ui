import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { themeName, setTheme, availableThemes } = useTheme();

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-lg border border-[var(--border)]">
      <span className="text-xs font-medium text-[var(--muted-foreground)] px-2">Theme</span>
      {availableThemes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme.id)}
          className={cn(
            'px-3 py-1.5 text-sm rounded-md transition-colors text-left',
            themeName === theme.id
              ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
              : 'hover:bg-[var(--muted)]'
          )}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
}
