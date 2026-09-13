'use client';

import { VisuallyHidden } from 'radix-ui';
import { useState } from 'react';

import {
  APP_PROVIDER_CATEGORIES,
  BUILT_IN_TOOLS,
  MOCK_APP_PROVIDERS,
} from '@/features/workflow/constants';
import type { AppProviderSelectOption } from '@/features/workflow/types/graph';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/components/ui/dialog';

import { filterApps } from '../../../helpers';
import { AppSelectorAppColumn } from './AppSelectorAppColumn';
import { AppSelectorCategorySidebar } from './AppSelectorCategorySidebar';
import { AppSelectorSearchBar } from './AppSelectorSearchBar';

interface AppSelectorDialogProps {
  onOpenChange: (open: boolean) => void;
  /** Called when the user picks an app provider */
  onSelectApp: (app: AppProviderSelectOption) => void;
  /** Whether the dialog is visible */
  open: boolean;
}

/**
 * AppSelectorDialog presents a Zapier-style modal with a left category
 * sidebar and a right panel showing "Your top apps" and "Popular built-in
 * tools" side by side, with a live-filter search bar.
 */
const AppSelectorDialog = ({
  onOpenChange,
  onSelectApp,
  open,
}: AppSelectorDialogProps) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Home');

  const query = search.toLowerCase();

  const filteredApps = filterApps(MOCK_APP_PROVIDERS, activeCategory, query);
  const filteredTools = filterApps(BUILT_IN_TOOLS, activeCategory, query);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <VisuallyHidden.Root>
        <DialogTitle />
        <DialogDescription />
      </VisuallyHidden.Root>
      <DialogContent
        className="gap-0 overflow-hidden p-0 sm:max-w-3xl"
        showCloseButton={false}
      >
        <div className="flex h-130">
          <AppSelectorCategorySidebar
            activeCategory={activeCategory}
            categories={APP_PROVIDER_CATEGORIES}
            onCategoryChange={setActiveCategory}
          />

          <div className="flex flex-1 flex-col overflow-hidden">
            <AppSelectorSearchBar onChange={setSearch} value={search} />

            <div className="flex flex-1 overflow-hidden">
              <AppSelectorAppColumn
                apps={filteredApps}
                className="border-outline-variant/20 border-r"
                emptyMessage="No apps found"
                onSelect={onSelectApp}
                title="Your top apps"
              />
              <AppSelectorAppColumn
                apps={filteredTools}
                emptyMessage="No tools found"
                onSelect={onSelectApp}
                title="Popular built-in tools"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AppSelectorDialog };
