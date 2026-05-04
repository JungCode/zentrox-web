'use client';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { VisuallyHidden } from 'radix-ui';
import { useState } from 'react';

import {
  APP_PROVIDER_CATEGORIES,
  BUILT_IN_TOOLS,
  MOCK_APP_PROVIDERS,
} from '@/features/workflow/constants';
import type { AppProviderSelectOption } from '@/features/workflow/types/graph';
import { cn } from '@/lib/ui/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog';

interface AppSelectorDialogProps {
  /** The node ID that triggered the dialog; null when the dialog is closed */
  nodeId: string | null;
  onOpenChange: (open: boolean) => void;
  /** Called when the user picks an app provider */
  onSelectApp: (nodeId: string, app: AppProviderSelectOption) => void;
  /** Whether the dialog is visible */
  open: boolean;
}

/**
 * AppSelectorDialog presents a Zapier-style modal with a left category
 * sidebar and a right panel showing "Your top apps" and "Popular built-in
 * tools" side by side, with a live-filter search bar.
 */
const AppSelectorDialog = ({
  nodeId,
  onOpenChange,
  onSelectApp,
  open,
}: AppSelectorDialogProps) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Home');

  const handleSelect = (app: AppProviderSelectOption) => {
    if (!nodeId) return;
    onSelectApp(nodeId, app);
    onOpenChange(false);
  };

  const query = search.toLowerCase();

  const filteredApps = MOCK_APP_PROVIDERS.filter(
    (app) =>
      (activeCategory === 'Home' || app.category === activeCategory) &&
      app.name.toLowerCase().includes(query),
  );

  const filteredTools = BUILT_IN_TOOLS.filter(
    (app) =>
      (activeCategory === 'Home' || app.category === activeCategory) &&
      app.name.toLowerCase().includes(query),
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <VisuallyHidden.Root>
        <DialogTitle />
      </VisuallyHidden.Root>
      <DialogContent
        className="gap-0 overflow-hidden p-0 sm:max-w-3xl"
        showCloseButton={false}
      >
        <div className="flex h-130">
          {/* ── Left sidebar – categories ──────────────────────────── */}
          <nav className="border-outline-variant/20 bg-surface-container-low flex w-44 shrink-0 flex-col gap-0.5 border-r p-2">
            {APP_PROVIDER_CATEGORIES.map(({ Icon, id, label }) => (
              <button
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors',
                  activeCategory === id
                    ? 'bg-surface-container-high text-on-surface font-medium'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
                )}
                key={id}
                onClick={() => setActiveCategory(id)}
                type="button"
              >
                <Icon className="shrink-0" size={14} />
                {label}
              </button>
            ))}
          </nav>

          {/* ── Right panel ─────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Search bar */}
            <div className="border-outline-variant/20 flex items-center gap-2.5 border-b px-4 py-3">
              <MagnifyingGlassIcon
                className="text-on-surface-variant shrink-0"
                size={14}
              />
              <input
                autoFocus
                className="text-on-surface placeholder:text-on-surface-variant flex-1 bg-transparent text-sm outline-none"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 9,000+ apps and tools…"
                type="text"
                value={search}
              />
              <button
                className="text-secondary shrink-0 text-xs font-medium hover:underline"
                type="button"
              >
                Browse all ↗
              </button>
            </div>

            {/* Two-column app list */}
            <div className="flex flex-1 overflow-hidden">
              {/* Your top apps */}
              <div className="border-outline-variant/20 flex-1 overflow-y-auto border-r p-4">
                <p className="text-on-surface-variant mb-2 text-xs font-semibold">
                  Your top apps
                </p>
                <div className="space-y-0.5">
                  {filteredApps.map((app) => (
                    <button
                      className="hover:bg-surface-container flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors"
                      key={app.id}
                      onClick={() => handleSelect(app)}
                      type="button"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-sm">
                        {<app.icon />}
                      </span>
                      <span className="text-on-surface text-sm">
                        {app.name}
                      </span>
                    </button>
                  ))}
                  {filteredApps.length === 0 && (
                    <p className="text-on-surface-variant py-6 text-center text-xs">
                      No apps found
                    </p>
                  )}
                </div>
              </div>

              {/* Popular built-in tools */}
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-on-surface-variant mb-2 text-xs font-semibold">
                  Popular built-in tools
                </p>
                <div className="space-y-0.5">
                  {filteredTools.map((tool) => (
                    <button
                      className="hover:bg-surface-container flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors"
                      key={tool.id}
                      onClick={() => handleSelect(tool)}
                      type="button"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-sm">
                        {<tool.icon />}
                      </span>
                      <span className="text-on-surface text-sm">
                        {tool.name}
                      </span>
                    </button>
                  ))}
                  {filteredTools.length === 0 && (
                    <p className="text-on-surface-variant py-6 text-center text-xs">
                      No tools found
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AppSelectorDialog };
