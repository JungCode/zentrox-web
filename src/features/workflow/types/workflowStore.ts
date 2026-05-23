import { NodeQueryData } from './graph';

type WorkflowState = {
  isAppSelectorDialogOpen: boolean;
  nodeChain: NodeQueryData[];
  selectedNode: NodeQueryData | null;
};

type WorkflowActions = {
  closeAppSelectorDialog: () => void;
  openAppSelectorDialog: () => void;
  setNodeChain: (nodes: NodeQueryData[]) => void;
  setSelectedNode: (canvasNode: NodeQueryData | null) => void;
};

export type WorkflowStore = WorkflowState & WorkflowActions;
