'use client';

import { useQuery } from '@apollo/client/react';

import {
  IntegrationAccountsDocument,
  type IntegrationAccountsQuery,
} from '@/shared/api/workflow/workflow.schemas';

type IntegrationAccount =
  IntegrationAccountsQuery['integrationAccounts'][number];

const useIntegrationAccounts = () => {
  const { data, loading, refetch } = useQuery(IntegrationAccountsDocument, {
    fetchPolicy: 'network-only',
  });

  const accounts: IntegrationAccount[] = data?.integrationAccounts ?? [];

  return { accounts, loading, refetch };
};

export { useIntegrationAccounts };
export type { IntegrationAccount };
