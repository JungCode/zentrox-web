'use client';

import { useQuery } from '@apollo/client/react';
import { useEffect, useRef } from 'react';

import {
  GoogleSheetHeadersDocument,
  type GoogleSheetHeadersQuery,
  type GoogleSheetHeadersQueryVariables,
} from '@/shared/api/workflow/workflow.schemas';

type GoogleSheetColumnHeader =
  GoogleSheetHeadersQuery['googleSheetHeaders'][number];

interface UseGoogleSheetHeadersProps {
  integrationAccountId: string;
  onComplete?: (headers: GoogleSheetColumnHeader[]) => void;
  spreadsheetId: string;
  worksheetTitle: string;
}

const useGoogleSheetHeaders = ({
  integrationAccountId,
  onComplete,
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

  useEffect(() => {
    if (data?.googleSheetHeaders && !loading) {
      onComplete?.(data.googleSheetHeaders);
    }
  }, [onComplete, data, loading]);

  return { headers, loading };
};

export { useGoogleSheetHeaders };
export type { GoogleSheetColumnHeader };
