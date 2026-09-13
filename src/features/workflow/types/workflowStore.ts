import { NodeQueryData } from './graph';

export type NodeRuntimeStatus =
  | 'idle'
  | 'running'
  | 'success'
  | 'failed'
  | 'skipped';

export interface RunSessionMeta {
  /** True from the mutation firing until the final RUN_COMPLETED/RUN_FAILED event. */
  active: boolean;
  /** 1-based — useful for "Run 2 of 3" UX. */
  currentRunIndex: number;
  totalRuns: number;
}

type WorkflowState = {
  isAppSelectorDialogOpen: boolean;
  /**
   * Open state for the step config panel. Lives on the store (rather than as
   * a local useToggle inside useWorkflowGraph) so deep children — like the
   * mapping picker — can navigate the user to a different node by opening
   * the panel on their behalf.
   */
  isConfigPanelOpen: boolean;
  nodeChain: NodeQueryData[];
  /** Last surfaced error per node so the canvas can show a tooltip. */
  nodeRuntimeErrors: Record<string, string | null>;
  /**
   * Per-node runtime status driven by the workflowRunProgress subscription.
   * Drives the animated border on WorkflowNode. Stays around after a run so
   * the user can see which node failed; cleared on the next test run.
   */
  nodeRuntimeStatuses: Record<string, NodeRuntimeStatus>;
  runSession: RunSessionMeta;
  selectedNode: NodeQueryData | null;
};

type WorkflowActions = {
  closeAppSelectorDialog: () => void;
  closeConfigPanel: () => void;
  /**
   * Combined "go to this node" action used by the mapping picker.
   * Looks the node up in `nodeChain`, makes it the selection, and opens
   * the config panel in one shot. No-op when the id isn't in the chain.
   */
  navigateToNode: (nodeId: string) => void;
  openAppSelectorDialog: () => void;
  openConfigPanel: () => void;
  resetNodeRuntimeStatuses: () => void;
  setNodeChain: (nodes: NodeQueryData[]) => void;
  setNodeRuntimeStatus: (
    nodeId: string,
    status: NodeRuntimeStatus,
    errorMessage?: string | null,
  ) => void;
  setRunSession: (session: Partial<RunSessionMeta>) => void;
  setSelectedNode: (canvasNode: NodeQueryData | null) => void;
};

export type WorkflowStore = WorkflowState & WorkflowActions;
