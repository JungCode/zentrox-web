'use client';

import { PlusIcon } from '@phosphor-icons/react';

import { useIntegrationAccounts } from '@/features/workflow/hooks';
import { BaseSelector } from '@/shared/components/BaseForm';
import { Button } from '@/shared/components/ui/button';
import { useOAuthConnect } from '@/shared/hooks/useOAuthConnect';

import { AccountSelectorLabel } from '.';
import { AccountOption } from './AccountOption';

interface AccountSelectorProps {
  onValueChange?: (value: string) => void;
  value?: string;
}

const AccountSelector = ({ onValueChange, value }: AccountSelectorProps) => {
  const { accounts, loading, refetch } = useIntegrationAccounts();

  const { connect } = useOAuthConnect({
    onSuccess: () => {
      refetch();
    },
    provider: 'google',
  });

  const options = accounts.map((account) => ({
    data: account,
    label: account.displayName ?? account.accountIdentifier ?? account.id,
    value: account.id,
  }));

  return (
    <BaseSelector
      disabled={loading}
      headerSlot={
        <Button
          className="text-muted-foreground hover:text-foreground w-full justify-start gap-1.5 rounded-none px-2 py-1.5 text-xs"
          onClick={(e) => {
            e.preventDefault();
            connect();
          }}
          variant="ghost"
        >
          <PlusIcon size={14} />
          Add account
        </Button>
      }
      onValueChange={onValueChange}
      options={options}
      placeholder={loading ? 'Loading…' : 'Select account…'}
      renderLabel={(selectedOption) => {
        return (
          <AccountSelectorLabel
            loading={loading}
            selectedOption={selectedOption}
          />
        );
      }}
      renderOption={(option) => <AccountOption option={option} />}
      value={value}
    />
  );
};

export { AccountSelector };
