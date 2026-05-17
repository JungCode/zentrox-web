'use client';

import { useQuery } from '@apollo/client/react';

import {
  GoogleSheetHeadersDocument,
  type GoogleSheetHeadersQuery,
  type GoogleSheetHeadersQueryVariables,
} from '@/shared/api/workflow/workflow.schemas';

type GoogleSheetColumnHeader =
  GoogleSheetHeadersQuery['googleSheetHeaders'][number];

interface UseGoogleSheetHeadersProps {
  integrationAccountId: string;
  spreadsheetId: string;
  worksheetTitle: string;
}

const useGoogleSheetHeaders = ({
  integrationAccountId,
  spreadsheetId,
  worksheetTitle,
}: UseGoogleSheetHeadersProps) => {
  const { data, loading } = useQuery<
    GoogleSheetHeadersQuery,
    GoogleSheetHeadersQueryVariables
  >(GoogleSheetHeadersDocument, {
    fetchPolicy: 'no-cache',
    skip: !integrationAccountId || !spreadsheetId || !worksheetTitle,
    variables: { integrationAccountId, spreadsheetId, worksheetTitle },
  });

  const headers: GoogleSheetColumnHeader[] = data?.googleSheetHeaders ?? [];

  return { headers, loading };
};

export { useGoogleSheetHeaders };
export type { GoogleSheetColumnHeader };
