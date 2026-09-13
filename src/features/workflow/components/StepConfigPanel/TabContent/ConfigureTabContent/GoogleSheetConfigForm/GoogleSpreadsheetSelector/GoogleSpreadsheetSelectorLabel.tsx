import { CircleNotchIcon } from '@phosphor-icons/react';

import type { GoogleSpreadsheet } from '@/features/workflow/hooks';
import type { BaseSelectorOption } from '@/shared/components/BaseForm';

interface GoogleSpreadsheetSelectorLabelProps {
  loading: boolean;
  placeholder: string;
  selectedOption: BaseSelectorOption<GoogleSpreadsheet> | undefined;
}

const GoogleSpreadsheetSelectorLabel = ({
  loading,
  placeholder,
  selectedOption,
}: GoogleSpreadsheetSelectorLabelProps) => {
  if (loading) {
    return (
      <span className="text-muted-foreground flex items-center gap-2">
        <CircleNotchIcon className="size-4 animate-spin" />
        Loading spreadsheets...
      </span>
    );
  }

  if (selectedOption) {
    return <span className="truncate">{selectedOption.label}</span>;
  }

  return <span className="text-muted-foreground">{placeholder}</span>;
};

export { GoogleSpreadsheetSelectorLabel };
