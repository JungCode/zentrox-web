import type { IntegrationAccount } from '@/features/workflow/hooks';
import type { BaseSelectorOption } from '@/shared/components/BaseForm';

interface AccountOptionProps {
  option: BaseSelectorOption<IntegrationAccount>;
}

const AccountOption = ({ option }: AccountOptionProps) => (
  <span className="flex flex-col gap-0.5 py-0.5">
    <span className="font-medium">{option.label}</span>
    {option.data?.accountIdentifier && (
      <span className="text-muted-foreground text-xs leading-relaxed whitespace-normal">
        {option.data.accountIdentifier}
      </span>
    )}
  </span>
);

export { AccountOption };
