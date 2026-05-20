'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import {
  SelectTriggerNodeSampleRecordDocument,
  type SelectTriggerNodeSampleRecordMutation,
  type SelectTriggerNodeSampleRecordMutationVariables,
  TriggerNodeSampleRecordDocument,
  WorkflowDocument,
} from '@/shared/api/workflow/workflow.schemas';

interface UseSelectTriggerNodeSampleRecordProps {
  nodeId: string;
  onCompleted?: () => void;
  workflowId: string;
}

const useSelectTriggerNodeSampleRecord = ({
  nodeId,
  onCompleted,
  workflowId,
}: UseSelectTriggerNodeSampleRecordProps) => {
  const [mutate, { loading }] = useMutation<
    SelectTriggerNodeSampleRecordMutation,
    SelectTriggerNodeSampleRecordMutationVariables
  >(SelectTriggerNodeSampleRecordDocument, {
    onCompleted: () => {
      toast.success('Selected record saved');
      onCompleted?.();
    },
    onError: (error) => {
      toast.error(error.message, { description: 'Could not save selection.' });
    },
    refetchQueries: [WorkflowDocument, TriggerNodeSampleRecordDocument],
  });

  const selectSampleRecord = (data: Record<string, unknown>) =>
    mutate({ variables: { data, nodeId, workflowId } });

  return { loading, selectSampleRecord };
};

export { useSelectTriggerNodeSampleRecord };
