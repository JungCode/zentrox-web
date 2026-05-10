'use client';

import { useQuery } from '@apollo/client/react';

import {
  TriggerNodeRecordsDocument,
  TriggerNodeSampleRecordDocument,
} from '@/shared/api/workflow/workflow.schemas';

interface UseTriggerNodeRecordsProps {
  nodeId: string;
  workflowId: string;
}

const useTriggerNodeRecords = ({
  nodeId,
  workflowId,
}: UseTriggerNodeRecordsProps) => {
  const {
    data: recordsData,
    loading: recordsLoading,
    refetch: refetchRecords,
  } = useQuery(TriggerNodeRecordsDocument, {
    fetchPolicy: 'no-cache',
    variables: { limit: 3, nodeId, workflowId },
  });

  const { data: sampleData, loading: sampleLoading } = useQuery(
    TriggerNodeSampleRecordDocument,
    { variables: { nodeId, workflowId } },
  );

  return {
    loading: recordsLoading || sampleLoading,
    records: recordsData?.triggerNodeRecords.records ?? [],
    refetchRecords,
    sampleRecord: sampleData?.triggerNodeSampleRecord ?? null,
  };
};

export { useTriggerNodeRecords };
