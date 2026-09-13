'use client';

import { useQuery } from '@apollo/client/react';

import {
  GoogleDrivesDocument,
  type GoogleDrivesQuery,
  type GoogleDrivesQueryVariables,
} from '@/shared/api/workflow/workflow.schemas';

type GoogleDrive = GoogleDrivesQuery['googleDrives'][number];

interface UseGoogleDrivesProps {
  integrationAccountId: string;
}

const useGoogleDrives = ({ integrationAccountId }: UseGoogleDrivesProps) => {
  const { data, loading } = useQuery<
    GoogleDrivesQuery,
    GoogleDrivesQueryVariables
  >(GoogleDrivesDocument, {
    fetchPolicy: 'no-cache',
    skip: !integrationAccountId,
    variables: { integrationAccountId },
  });

  const drives: GoogleDrive[] = data?.googleDrives ?? [];

  return { drives, loading };
};

export { useGoogleDrives };
export type { GoogleDrive };
