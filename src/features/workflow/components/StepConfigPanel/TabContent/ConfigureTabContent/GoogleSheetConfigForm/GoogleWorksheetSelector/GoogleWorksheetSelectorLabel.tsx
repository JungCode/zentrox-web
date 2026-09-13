import { CircleNotchIcon } from '@phosphor-icons/react';

import type { GoogleWorksheet } from '@/features/workflow/hooks';
import type { BaseSelectorOption } from '@/shared/components/BaseForm';

interface GoogleWorksheetSelectorLabelProps {
  loading: boolean;
  placeholder: string;
  selectedOption: BaseSelectorOption<GoogleWorksheet> | undefined;
}

const GoogleWorksheetSelectorLabel = ({
  loading,
  placeholder,
  selectedOption,
}: GoogleWorksheetSelectorLabelProps) => {
  if (loading) {
    return (
      <span className="text-muted-foreground flex items-center gap-2">
        <CircleNotchIcon className="size-4 animate-spin" />
        Loading worksheets...
      </span>
    );
  }

  if (selectedOption) {
    return <span className="truncate">{selectedOption.label}</span>;
  }

  return <span className="text-muted-foreground">{placeholder}</span>;
};

export { GoogleWorksheetSelectorLabel };
