'use client';

import { useQuery } from '@apollo/client/react';

import {
  GoogleFormsDocument,
  type GoogleFormsQuery,
  type GoogleFormsQueryVariables,
} from '@/shared/api/workflow/workflow.schemas';

type GoogleForm = GoogleFormsQuery['googleForms'][number];

interface UseGoogleFormsProps {
  integrationAccountId: string;
}

const useGoogleForms = ({ integrationAccountId }: UseGoogleFormsProps) => {
  const { data, loading } = useQuery<
    GoogleFormsQuery,
    GoogleFormsQueryVariables
  >(GoogleFormsDocument, {
    fetchPolicy: 'no-cache',
    skip: !integrationAccountId,
    variables: { integrationAccountId },
  });

  const forms: GoogleForm[] = data?.googleForms ?? [];

  return { forms, loading };
};

export { useGoogleForms };
export type { GoogleForm };
