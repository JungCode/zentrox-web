'use client';

import { useQuery } from '@apollo/client/react';

import { TriggerNodeSampleRecordDocument } from '@/shared/api/workflow/workflow.schemas';

interface UseActionNodeSampleProps {
  nodeId: string;
  workflowId: string;
}

const useActionNodeSample = ({
  nodeId,
  workflowId,
}: UseActionNodeSampleProps) => {
  const { data, loading } = useQuery(TriggerNodeSampleRecordDocument, {
    fetchPolicy: 'no-cache',
    variables: { nodeId, workflowId },
  });

  return {
    loading,
    sampleRecord: data?.triggerNodeSampleRecord ?? null,
  };
};

export { useActionNodeSample };
