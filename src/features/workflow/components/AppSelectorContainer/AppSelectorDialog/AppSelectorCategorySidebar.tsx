'use client';

import { Category } from '@/features/workflow/types';
import { cn } from '@/lib/ui/utils';

interface AppSelectorCategorySidebarProps {
  activeCategory: string;
  categories: Category[];
  onCategoryChange: (id: string) => void;
}

const AppSelectorCategorySidebar = ({
  activeCategory,
  categories,
  onCategoryChange,
}: AppSelectorCategorySidebarProps) => (
  <nav className="border-outline-variant/20 bg-surface-container-low flex w-44 shrink-0 flex-col gap-0.5 border-r p-2">
    {categories.map(({ Icon, id, label }) => (
      <button
        className={cn(
          'flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors',
          activeCategory === id
            ? 'bg-surface-container-high text-on-surface font-medium'
            : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
        )}
        key={id}
        onClick={() => onCategoryChange(id)}
        type="button"
      >
        <Icon className="shrink-0" size={14} />
        {label}
      </button>
    ))}
  </nav>
);

export { AppSelectorCategorySidebar };
