import type { AppProviderSelectOption } from '@/features/workflow/types/graph';

export const filterApps = (
  apps: AppProviderSelectOption[],
  activeCategory: string,
  query: string,
): AppProviderSelectOption[] =>
  apps.filter(
    (app) =>
      (activeCategory === 'Home' || app.category === activeCategory) &&
      app.name.toLowerCase().includes(query),
  );
