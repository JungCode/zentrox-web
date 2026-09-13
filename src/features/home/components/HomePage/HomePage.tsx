'use client';

import {
  HOME_FOOTER_LINKS,
  HOME_METRICS_BARS,
  HOME_METRICS_LABELS,
  HOME_TEMPLATES,
  HOME_WORKFLOWS,
} from '@/features/home/constants';
import { useAuthStore } from '@/shared/stores';

import { HomeHero } from './HomeHero';
import { RecentWorkflowsCard } from './RecentWorkflowsCard';
import { HomeFooter } from './HomeFooter';
import { RecommendedTemplatesSection } from './RecommendedTemplatesSection';
import { ExecutionMetricsCard } from './ExecutionMetricsCard';

export const HomePage = () => {
  const userName = useAuthStore((state) => state.userName);
  const displayName = userName?.trim() || 'there';

  return (
    <section className="bg-surface-container-low px-8 py-8">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <HomeHero displayName={displayName} />
        <RecommendedTemplatesSection templates={HOME_TEMPLATES} />
        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <RecentWorkflowsCard workflows={HOME_WORKFLOWS} />
          <ExecutionMetricsCard
            bars={HOME_METRICS_BARS}
            labels={HOME_METRICS_LABELS}
          />
        </section>
        <HomeFooter links={HOME_FOOTER_LINKS} />
      </div>
    </section>
  );
};
