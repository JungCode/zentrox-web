import { CircleNotchIcon } from '@phosphor-icons/react';

import type { GoogleForm } from '@/features/workflow/hooks';
import type { BaseSelectorOption } from '@/shared/components/BaseForm';

interface GoogleFormSelectorLabelProps {
  loading: boolean;
  placeholder: string;
  selectedOption: BaseSelectorOption<GoogleForm> | undefined;
}

const GoogleFormSelectorLabel = ({
  loading,
  placeholder,
  selectedOption,
}: GoogleFormSelectorLabelProps) => {
  if (loading) {
    return (
      <span className="text-muted-foreground flex items-center gap-2">
        <CircleNotchIcon className="size-4 animate-spin" />
        Loading forms...
      </span>
    );
  }

  if (selectedOption) {
    return <span className="truncate">{selectedOption.label}</span>;
  }

  return <span className="text-muted-foreground">{placeholder}</span>;
};

export { GoogleFormSelectorLabel };
