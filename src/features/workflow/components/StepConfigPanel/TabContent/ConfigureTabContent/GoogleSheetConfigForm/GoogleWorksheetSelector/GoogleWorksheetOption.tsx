import type { GoogleWorksheet } from '@/features/workflow/hooks';
import type { BaseSelectorOption } from '@/shared/components/BaseForm';

interface GoogleWorksheetOptionProps {
  option: BaseSelectorOption<GoogleWorksheet>;
}

const GoogleWorksheetOption = ({ option }: GoogleWorksheetOptionProps) => (
  <span className="flex w-full min-w-0 flex-col gap-0.5 overflow-hidden py-0.5">
    <span className="truncate font-medium">{option.label}</span>
    {option.data?.index !== undefined && (
      <span className="text-muted-foreground block max-w-56 truncate text-xs leading-relaxed">
        Index: {option.data.index}
      </span>
    )}
  </span>
);

export { GoogleWorksheetOption };
