'use client';

import { useQuery } from '@apollo/client/react';

import {
  GoogleSpreadsheetsDocument,
  type GoogleSpreadsheetsQuery,
  type GoogleSpreadsheetsQueryVariables,
} from '@/shared/api/workflow/workflow.schemas';

type GoogleSpreadsheet = GoogleSpreadsheetsQuery['googleSpreadsheets'][number];

interface UseGoogleSpreadsheetsProps {
  driveId: string | null | undefined;
  integrationAccountId: string;
}

const useGoogleSpreadsheets = ({
  driveId,
  integrationAccountId,
}: UseGoogleSpreadsheetsProps) => {
  const { data, loading } = useQuery<
    GoogleSpreadsheetsQuery,
    GoogleSpreadsheetsQueryVariables
  >(GoogleSpreadsheetsDocument, {
    fetchPolicy: 'no-cache',
    skip: !integrationAccountId || driveId === undefined,
    variables: { driveId, integrationAccountId },
  });

  const spreadsheets: GoogleSpreadsheet[] = data?.googleSpreadsheets ?? [];

  return { loading, spreadsheets };
};

export { useGoogleSpreadsheets };
export type { GoogleSpreadsheet };
