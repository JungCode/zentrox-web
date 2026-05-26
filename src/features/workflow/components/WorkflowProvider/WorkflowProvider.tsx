import { createContext } from 'react';
import { createStore, StoreApi } from 'zustand';

import { WorkflowStore } from '@/features/workflow/types';

interface WorkflowStoreProviderProps {
  children: React.ReactNode;
}

export const WorkflowStoreContext =
  createContext<StoreApi<WorkflowStore> | null>(null);

export const WorkflowStoreProvider = ({
  children,
}: WorkflowStoreProviderProps) => {
  const workflowStore = createStore<WorkflowStore>((set, get) => ({
    closeAppSelectorDialog: () => set({ isAppSelectorDialogOpen: false }),
    closeConfigPanel: () => set({ isConfigPanelOpen: false }),
    isAppSelectorDialogOpen: false,
    isConfigPanelOpen: false,
    navigateToNode: (nodeId) => {
      const target = get().nodeChain.find((n) => n.id === nodeId);
      if (!target) return;
      set({ isConfigPanelOpen: true, selectedNode: target });
    },
    nodeChain: [],
    openAppSelectorDialog: () => set({ isAppSelectorDialogOpen: true }),
    openConfigPanel: () => set({ isConfigPanelOpen: true }),
    selectedNode: null,
    setNodeChain: (nodeChain) => set({ nodeChain }),
    setSelectedNode: (selectedNode) => set({ selectedNode }),
  }));

  return (
    <WorkflowStoreContext.Provider value={workflowStore}>
      {children}
    </WorkflowStoreContext.Provider>
  );
};
