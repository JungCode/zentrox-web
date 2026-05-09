import { CircleNotchIcon } from '@phosphor-icons/react';

import type { IntegrationAccount } from '@/features/workflow/hooks';
import type { BaseSelectorOption } from '@/shared/components/BaseForm';

interface AccountSelectorLabelProps {
  loading: boolean;
  selectedOption: BaseSelectorOption<IntegrationAccount> | undefined;
}

const AccountSelectorLabel = ({
  loading,
  selectedOption,
}: AccountSelectorLabelProps) => {
  if (loading) {
    return (
      <span className="text-muted-foreground flex items-center gap-2">
        <CircleNotchIcon className="size-4 animate-spin" />
        Loading accounts...
      </span>
    );
  }

  if (selectedOption) {
    return <span className="truncate">{selectedOption.label}</span>;
  }

  return <span className="text-muted-foreground">Select account...</span>;
};

export { AccountSelectorLabel };
