'use client';

import type { AppProviderSelectOption } from '@/features/workflow/types/graph';
import { cn } from '@/lib/ui/utils';

interface AppSelectorAppColumnProps {
  apps: AppProviderSelectOption[];
  className?: string;
  emptyMessage?: string;
  onSelect: (app: AppProviderSelectOption) => void;
  title: string;
}

const AppSelectorAppColumn = ({
  apps,
  className,
  emptyMessage = 'No results found',
  onSelect,
  title,
}: AppSelectorAppColumnProps) => (
  <div className={cn('flex-1 overflow-y-auto p-4', className)}>
    <p className="text-on-surface-variant mb-2 text-xs font-semibold">
      {title}
    </p>
    <div className="space-y-0.5">
      {apps.map((app, index) => (
        <button
          className="hover:bg-surface-container flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors"
          key={app.id + index}
          onClick={() => onSelect(app)}
          type="button"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-sm">
            {<app.icon />}
          </span>
          <span className="text-on-surface text-sm">{app.name}</span>
        </button>
      ))}
      {apps.length === 0 && (
        <p className="text-on-surface-variant py-6 text-center text-xs">
          {emptyMessage}
        </p>
      )}
    </div>
  </div>
);

export { AppSelectorAppColumn };
