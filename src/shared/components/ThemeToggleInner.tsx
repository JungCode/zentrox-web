'use client';

import { MoonStarsIcon, SunDimIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/ui/utils';

import { Switch } from './ui/switch';

const ThemeToggleInner = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className={cn(
        'border-border/70 bg-surface-container-low flex items-center gap-3 rounded-full border px-3 py-2 text-sm shadow-sm backdrop-blur',
        className,
      )}
      suppressHydrationWarning
    >
      <SunDimIcon className="text-on-surface-variant h-4 w-4" weight="bold" />

      <Switch
        aria-label="Toggle theme"
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light');
        }}
        suppressHydrationWarning
      />

      <MoonStarsIcon
        className="text-on-surface-variant h-4 w-4"
        weight="bold"
      />
    </div>
  );
};

export { ThemeToggleInner };
