import { useTheme } from '@/hooks/useTheme';

export function NavigationBar() {
  const { theme } = useTheme();

  // Find index of "Offers" to add divider before it
  const offersIndex = theme.navItems.findIndex(item =>
    item.toLowerCase() === 'offers'
  );

  return (
    <nav
      style={{
        backgroundColor: theme.isDark ? 'var(--neutral-999)' : '#FFFFFF',
        borderBottom: `1px solid ${theme.isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 py-2 overflow-x-auto">
          {theme.navItems.map((item, index) => {
            const isOutlet = item.includes('OUTLET') || item.includes('%');
            const showDivider = index === offersIndex && offersIndex > 0;

            return (
              <div key={index} className="flex items-center">
                {/* Vertical divider before "Offers" */}
                {showDivider && (
                  <div
                    className="w-px h-4 mx-2"
                    style={{
                      backgroundColor: theme.isDark
                        ? 'var(--neutral-700)'
                        : 'var(--neutral-200)'
                    }}
                  />
                )}

                <a
                  href="#"
                  className="px-3 py-1.5 text-[13px] whitespace-nowrap transition-colors hover:opacity-70"
                  style={{
                    color: isOutlet
                      ? 'var(--primary)'
                      : theme.isDark
                        ? '#FFFFFF'
                        : 'var(--neutral-600)',
                    fontWeight: isOutlet ? 600 : 400,
                  }}
                >
                  {item}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
