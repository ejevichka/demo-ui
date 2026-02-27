import { useTheme } from '@/hooks/useTheme';

export function DemoBadge() {
  const { theme } = useTheme();
  const isDark = theme.isDark;

  return (
    <span
      className="inline-flex items-center text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm"
      style={{
        color: isDark ? '#FFB74D' : '#B36800',
        backgroundColor: isDark
          ? 'rgba(251, 149, 16, 0.2)'
          : 'rgba(251, 149, 16, 0.12)',
        border: isDark
          ? '1px solid rgba(251, 149, 16, 0.4)'
          : '1px solid rgba(251, 149, 16, 0.3)',
        lineHeight: 1.2,
      }}
      aria-label="Demo price"
    >
      DEMO
    </span>
  );
}
