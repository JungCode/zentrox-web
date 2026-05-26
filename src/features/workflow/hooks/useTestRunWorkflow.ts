'use client';

import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { useWorkflowStore } from './useWorkflowStore';

// Brief pause after the run finishes so the user registers the all-green
// (or red) final state before the canvas wipes back to idle.
const RUNTIME_CLEAR_DELAY_MS = 1200;

const TEST_RUN_WORKFLOW = gql`
  mutation TestRunWorkflow($workflowId: ID!, $limit: Int) {
    testRunWorkflow(workflowId: $workflowId, limit: $limit) {
      runs {
        id
        status
        errorMessage
      }
    }
  }
`;

interface TestRunWorkflowVars {
  limit?: number;
  workflowId: string;
}

interface TestRunWorkflowData {
  testRunWorkflow: {
    runs: Array<{
      errorMessage: string | null;
      id: string;
      status: string;
    }>;
  };
}

interface UseTestRunWorkflowProps {
  workflowId: string;
}

const useTestRunWorkflow = ({ workflowId }: UseTestRunWorkflowProps) => {
  const resetNodeRuntimeStatuses = useWorkflowStore(
    (s) => s.resetNodeRuntimeStatuses,
  );
  const setRunSession = useWorkflowStore((s) => s.setRunSession);

  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelPendingClear = () => {
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
  };

  const schedulePostRunClear = () => {
    cancelPendingClear();
    clearTimerRef.current = setTimeout(() => {
      resetNodeRuntimeStatuses();
      clearTimerRef.current = null;
    }, RUNTIME_CLEAR_DELAY_MS);
  };

  // Cancel any pending wipe if the hook unmounts mid-flash so we don't touch
  // an unmounted store.
  useEffect(() => cancelPendingClear, []);

  const [mutate, { loading }] = useMutation<
    TestRunWorkflowData,
    TestRunWorkflowVars
  >(TEST_RUN_WORKFLOW, {
    onCompleted: (data) => {
      const failed = data.testRunWorkflow.runs.find(
        (r) => r.status === 'failed',
      );
      if (failed) {
        toast.error(failed.errorMessage ?? 'A run failed', {
          description: 'Workflow test',
        });
      } else if (data.testRunWorkflow.runs.length === 0) {
        toast.info('No responses to test against');
      } else {
        toast.success(
          `Workflow ran ${data.testRunWorkflow.runs.length} response${
            data.testRunWorkflow.runs.length > 1 ? 's' : ''
          }`,
        );
      }
      setRunSession({ active: false });
      schedulePostRunClear();
    },
    onError: (error) => {
      toast.error(error.message, { description: 'Workflow test failed' });
      setRunSession({ active: false });
      schedulePostRunClear();
    },
  });

  const testRunWorkflow = (limit: 1 | 2 | 3 = 3) => {
    cancelPendingClear();
    resetNodeRuntimeStatuses();
    setRunSession({ active: true, currentRunIndex: 0, totalRuns: limit });
    return mutate({ variables: { limit, workflowId } });
  };

  return { loading, testRunWorkflow };
};

export { useTestRunWorkflow };
