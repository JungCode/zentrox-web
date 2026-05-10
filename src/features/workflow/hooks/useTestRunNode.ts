'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import {
  TestRunWorkflowNodeDocument,
  type TestRunWorkflowNodeMutation,
  type TestRunWorkflowNodeMutationVariables,
  WorkflowDocument,
  WorkflowNodeDocument,
} from '@/shared/api/workflow/workflow.schemas';

interface UseTestRunNodeProps {
  nodeId: string;
  workflowId: string;
}

const useTestRunNode = ({ nodeId, workflowId }: UseTestRunNodeProps) => {
  const [mutate, { loading }] = useMutation<
    TestRunWorkflowNodeMutation,
    TestRunWorkflowNodeMutationVariables
  >(TestRunWorkflowNodeDocument, {
    onCompleted: () => {
      toast.success('Test passed');
    },
    onError: (error) => {
      toast.error(error.message, { description: 'Test run failed.' });
    },
    refetchQueries: [WorkflowDocument, WorkflowNodeDocument],
  });

  const testRun = () => mutate({ variables: { nodeId, workflowId } });

  return { loading, testRun };
};

export { useTestRunNode };
