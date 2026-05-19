import Link from 'next/link';

import type { HomeTemplate } from '@/features/home/types';
import { ROUTES } from '@/shared/constants';

import { TemplateCard } from './TemplateCard';

type RecommendedTemplatesSectionProps = {
  templates: HomeTemplate[];
};

export const RecommendedTemplatesSection = ({
  templates,
}: RecommendedTemplatesSectionProps) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase">
          Recommended Templates
        </h3>
        <Link
          className="text-secondary text-xs font-semibold"
          href={ROUTES.app.TEMPLATES}
        >
          View All
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.title} template={template} />
        ))}
      </div>
    </section>
  );
};
