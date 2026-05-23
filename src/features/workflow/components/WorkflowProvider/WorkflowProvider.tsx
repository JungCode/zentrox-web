import { createContext, useRef, useState } from 'react';
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
  const workflowStore = createStore<WorkflowStore>((set) => ({
    closeAppSelectorDialog: () => set({ isAppSelectorDialogOpen: false }),
    isAppSelectorDialogOpen: false,
    nodeChain: [],
    openAppSelectorDialog: () => set({ isAppSelectorDialogOpen: true }),
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
