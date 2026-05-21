'use client';

import { useQuery } from '@apollo/client/react';

import {
  GoogleWorksheetsDocument,
  type GoogleWorksheetsQuery,
  type GoogleWorksheetsQueryVariables,
} from '@/shared/api/workflow/workflow.schemas';

type GoogleWorksheet = GoogleWorksheetsQuery['googleWorksheets'][number];

interface UseGoogleWorksheetsProps {
  integrationAccountId: string;
  spreadsheetId: string | undefined;
}

const useGoogleWorksheets = ({
  integrationAccountId,
  spreadsheetId,
}: UseGoogleWorksheetsProps) => {
  const { data, loading } = useQuery<
    GoogleWorksheetsQuery,
    GoogleWorksheetsQueryVariables
  >(GoogleWorksheetsDocument, {
    fetchPolicy: 'no-cache',
    skip: !integrationAccountId || !spreadsheetId,
    variables: { integrationAccountId, spreadsheetId: spreadsheetId! },
  });

  const worksheets: GoogleWorksheet[] = data?.googleWorksheets ?? [];

  return { loading, worksheets };
};

export { useGoogleWorksheets };
export type { GoogleWorksheet };
