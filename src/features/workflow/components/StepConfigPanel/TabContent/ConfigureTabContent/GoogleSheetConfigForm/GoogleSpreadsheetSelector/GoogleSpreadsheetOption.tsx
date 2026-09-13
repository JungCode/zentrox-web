import type { GoogleSpreadsheet } from '@/features/workflow/hooks';
import type { BaseSelectorOption } from '@/shared/components/BaseForm';

interface GoogleSpreadsheetOptionProps {
  option: BaseSelectorOption<GoogleSpreadsheet>;
}

const GoogleSpreadsheetOption = ({ option }: GoogleSpreadsheetOptionProps) => (
  <span className="flex w-full min-w-0 flex-col gap-0.5 overflow-hidden py-0.5">
    <span className="truncate font-medium">{option.label}</span>
    {option.data?.id && (
      <span className="text-muted-foreground block max-w-56 truncate text-xs leading-relaxed">
        ID: {option.data.id}
      </span>
    )}
  </span>
);

export { GoogleSpreadsheetOption };
