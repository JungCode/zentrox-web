'use client';

import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  TestRunPathsNodeDocument,
  type TestRunPathsNodeMutation,
  type TestRunPathsNodeMutationVariables,
  WorkflowDocument,
} from '@/shared/api/workflow/workflow.schemas';

interface UseTestRunPathsNodeProps {
  nodeId: string;
  workflowId: string;
}

export type PathsTestRunResult = NonNullable<
  TestRunPathsNodeMutation['testRunPathsNode']
>;

/**
 * Drives the "Test branches" button on the Paths test tab.
 *
 * Holds the last evaluation result locally so the UI can show per-rule
 * pass/fail without round-tripping the workflow query. Refetches
 * WorkflowDocument so node.connectionStatus updates everywhere.
 */
const useTestRunPathsNode = ({
  nodeId,
  workflowId,
}: UseTestRunPathsNodeProps) => {
  const [lastResult, setLastResult] = useState<PathsTestRunResult | null>(null);

  const [mutate, { loading }] = useMutation<
    TestRunPathsNodeMutation,
    TestRunPathsNodeMutationVariables
  >(TestRunPathsNodeDocument, {
    onCompleted: (data) => {
      if (data.testRunPathsNode) setLastResult(data.testRunPathsNode);
    },
    onError: (error) => {
      toast.error(error.message, {
        description: 'Could not evaluate branches.',
      });
    },
    refetchQueries: [WorkflowDocument],
  });

  const testRun = () => mutate({ variables: { nodeId, workflowId } });

  return { lastResult, loading, testRun };
};

export { useTestRunPathsNode };
