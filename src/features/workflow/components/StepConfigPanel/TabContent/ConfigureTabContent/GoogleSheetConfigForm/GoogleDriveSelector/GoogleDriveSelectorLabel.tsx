import { CircleNotchIcon } from '@phosphor-icons/react';

import type { GoogleDrive } from '@/features/workflow/hooks';
import type { BaseSelectorOption } from '@/shared/components/BaseForm';

interface GoogleDriveSelectorLabelProps {
  loading: boolean;
  placeholder: string;
  selectedOption: BaseSelectorOption<GoogleDrive | undefined> | undefined;
}

const GoogleDriveSelectorLabel = ({
  loading,
  placeholder,
  selectedOption,
}: GoogleDriveSelectorLabelProps) => {
  if (loading) {
    return (
      <span className="text-muted-foreground flex items-center gap-2">
        <CircleNotchIcon className="size-4 animate-spin" />
        Loading drives...
      </span>
    );
  }

  if (selectedOption) {
    return <span className="truncate">{selectedOption.label}</span>;
  }

  return <span className="text-muted-foreground">{placeholder}</span>;
};

export { GoogleDriveSelectorLabel };
