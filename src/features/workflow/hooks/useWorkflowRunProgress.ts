'use client';

import { gql } from '@apollo/client';
import { useSubscription } from '@apollo/client/react';

import { useWorkflowStore } from './useWorkflowStore';

const WORKFLOW_RUN_PROGRESS = gql`
  subscription WorkflowRunProgress($workflowId: ID!) {
    workflowRunProgress(workflowId: $workflowId) {
      type
      workflowId
      runId
      runIndex
      runTotal
      nodeId
      errorMessage
      timestamp
    }
  }
`;

// Mirrors the backend `WorkflowRunEventType` enum. `registerEnumType` uses the
// TS enum *keys* (UPPER_SNAKE) as the GraphQL wire format, not the lowercase
// `.value` strings — so these literals must stay uppercase.
type ProgressEvent = {
  errorMessage: string | null;
  nodeId: string | null;
  runId: string;
  runIndex: number;
  runTotal: number;
  timestamp: string;
  type:
    | 'RUN_STARTED'
    | 'NODE_STARTED'
    | 'NODE_SUCCESS'
    | 'NODE_FAILED'
    | 'NODE_SKIPPED'
    | 'RUN_COMPLETED'
    | 'RUN_FAILED';
  workflowId: string;
};

interface WorkflowRunProgressData {
  workflowRunProgress: ProgressEvent;
}

interface UseWorkflowRunProgressProps {
  workflowId: string;
}

/**
 * Bridges server-side run events into the workflow store so the canvas can
 * highlight whichever node is currently executing. Subscribes for the lifetime
 * of the workflow page — the underlying graphql-ws connection is reused.
 */
export const useWorkflowRunProgress = ({
  workflowId,
}: UseWorkflowRunProgressProps) => {
  const setNodeRuntimeStatus = useWorkflowStore((s) => s.setNodeRuntimeStatus);
  const setRunSession = useWorkflowStore((s) => s.setRunSession);

  useSubscription<WorkflowRunProgressData>(WORKFLOW_RUN_PROGRESS, {
    // TODO(workflow-run-debug): remove onComplete/onError/console logs once
    // the workflow test-run pipeline is stable.
    onComplete: () => console.log('[subscription] complete'),
    onData: ({ data }) => {
      const ev = data.data?.workflowRunProgress;
      console.log('[subscription] event', ev?.type, 'nodeId=', ev?.nodeId, ev);
      if (!ev) return;

      switch (ev.type) {
        case 'RUN_STARTED':
          setRunSession({
            active: true,
            currentRunIndex: ev.runIndex,
            totalRuns: ev.runTotal,
          });
          return;
        case 'NODE_STARTED':
          if (ev.nodeId) setNodeRuntimeStatus(ev.nodeId, 'running');
          return;
        case 'NODE_SUCCESS':
          if (ev.nodeId) setNodeRuntimeStatus(ev.nodeId, 'success');
          return;
        case 'NODE_FAILED':
          if (ev.nodeId)
            setNodeRuntimeStatus(ev.nodeId, 'failed', ev.errorMessage);
          return;
        case 'NODE_SKIPPED':
          if (ev.nodeId) setNodeRuntimeStatus(ev.nodeId, 'skipped');
          return;
        case 'RUN_COMPLETED':
        case 'RUN_FAILED':
          // Only flip "active" off once the last run in the batch finishes —
          // otherwise the loader hides between runs.
          if (ev.runIndex >= ev.runTotal) setRunSession({ active: false });
          return;
      }
    },
    onError: (err) => console.error('[subscription] error', err.message, err),
    variables: { workflowId },
  });
};
