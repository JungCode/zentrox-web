import { NodeQueryData } from './graph';

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
  setNodeChain: (nodes: NodeQueryData[]) => void;
  setSelectedNode: (canvasNode: NodeQueryData | null) => void;
};

export type WorkflowStore = WorkflowState & WorkflowActions;
