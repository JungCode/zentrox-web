import { NodeQueryData } from './graph';

type WorkflowState = {
  isAppSelectorDialogOpen: boolean;
  selectedNode: NodeQueryData | null;
};

type WorkflowActions = {
  closeAppSelectorDialog: () => void;
  openAppSelectorDialog: () => void;
  setSelectedNode: (canvasNode: NodeQueryData | null) => void;
};

export type WorkflowStore = WorkflowState & WorkflowActions;
