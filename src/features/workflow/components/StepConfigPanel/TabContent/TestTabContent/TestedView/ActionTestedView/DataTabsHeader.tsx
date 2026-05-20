'use client';

import { TAB_OPTIONS } from '@/features/workflow/constants';
import { DataTabKey } from '@/features/workflow/types';
import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';

interface DataTabsHeaderProps {
  activeTab: DataTabKey;
  onTabChange: (tab: DataTabKey) => void;
}

const DataTabsHeader = ({ activeTab, onTabChange }: DataTabsHeaderProps) => {
  return (
    <div className="border-border/60 flex items-center gap-4 border-b">
      {TAB_OPTIONS.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <Button
            className={cn(
              'h-auto rounded-none border-0 border-b-2 px-0 pt-1 pb-2 text-sm font-semibold transition-colors',
              isActive
                ? 'border-secondary text-secondary'
                : 'text-on-surface-variant hover:text-on-surface border-transparent',
            )}
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            type="button"
            variant="ghost"
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export { DataTabsHeader };
