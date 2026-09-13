import type { BaseSelectorOption } from '@/shared/components/BaseForm';

interface TriggerEventOptionProps {
  option: BaseSelectorOption<{ description?: string }>;
}

const TriggerEventOption = ({ option }: TriggerEventOptionProps) => (
  <span className="flex flex-col gap-0.5 py-0.5">
    <span className="font-medium">{option.label}</span>
    {option.data?.description && (
      <span className="text-muted-foreground text-xs leading-relaxed whitespace-normal">
        {option.data.description}
      </span>
    )}
  </span>
);

export { TriggerEventOption };
