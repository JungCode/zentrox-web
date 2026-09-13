import { createContext, useState } from 'react';
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
  // Lazy useState pins the store to a single instance for the provider's
  // lifetime. Without this, every render would mint a fresh store and reset
  // any runtime state subscribers depend on (e.g. nodeRuntimeStatuses driven
  // by the workflowRunProgress subscription).
  const [workflowStore] = useState(() =>
    createStore<WorkflowStore>((set, get) => ({
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
      nodeRuntimeErrors: {},
      nodeRuntimeStatuses: {},
      openAppSelectorDialog: () => set({ isAppSelectorDialogOpen: true }),
      openConfigPanel: () => set({ isConfigPanelOpen: true }),
      resetNodeRuntimeStatuses: () =>
        set({ nodeRuntimeErrors: {}, nodeRuntimeStatuses: {} }),
      runSession: { active: false, currentRunIndex: 0, totalRuns: 0 },
      selectedNode: null,
      setNodeChain: (nodeChain) => set({ nodeChain }),
      setNodeRuntimeStatus: (nodeId, status, errorMessage = null) =>
        set((state) => ({
          nodeRuntimeErrors: {
            ...state.nodeRuntimeErrors,
            [nodeId]: errorMessage,
          },
          nodeRuntimeStatuses: {
            ...state.nodeRuntimeStatuses,
            [nodeId]: status,
          },
        })),
      setRunSession: (session) =>
        set((state) => ({ runSession: { ...state.runSession, ...session } })),
      setSelectedNode: (selectedNode) => set({ selectedNode }),
    })),
  );

  return (
    <WorkflowStoreContext.Provider value={workflowStore}>
      {children}
    </WorkflowStoreContext.Provider>
  );
};
