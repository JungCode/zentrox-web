'use client';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';

interface AppSelectorSearchBarProps {
  onChange: (value: string) => void;
  value: string;
}

const AppSelectorSearchBar = ({
  onChange,
  value,
}: AppSelectorSearchBarProps) => (
  <div className="border-outline-variant/20 flex items-center gap-2.5 border-b px-4 py-3">
    <MagnifyingGlassIcon
      className="text-on-surface-variant shrink-0"
      size={14}
    />
    <input
      autoFocus
      className="text-on-surface placeholder:text-on-surface-variant flex-1 bg-transparent text-sm outline-none"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search 9,000+ apps and tools…"
      type="text"
      value={value}
    />
    <button
      className="text-secondary shrink-0 text-xs font-medium hover:underline"
      type="button"
    >
      Browse all ↗
    </button>
  </div>
);

export { AppSelectorSearchBar };
