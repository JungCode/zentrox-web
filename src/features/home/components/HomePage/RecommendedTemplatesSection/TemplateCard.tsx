import type { HomeTemplate } from '@/features/home/types';

type TemplateCardProps = {
  template: HomeTemplate;
};

export const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <div className="bg-surface-container-lowest border-outline-variant/10 rounded border p-6 shadow-sm">
      <div className="bg-surface-container text-secondary flex h-10 w-10 items-center justify-center rounded">
        <span className="material-symbols-outlined text-xl">
          {template.symbol}
        </span>
      </div>
      <h4 className="text-primary mt-4 text-sm font-semibold">
        {template.title}
      </h4>
      <p className="text-on-surface-variant mt-2 text-xs leading-relaxed">
        {template.description}
      </p>
    </div>
  );
};
