import { useContext } from 'react';
import { useStore } from 'zustand/react';

import { WorkflowStoreContext } from '../components/WorkflowProvider/WorkflowProvider';
import { WorkflowStore } from '../types';

export const useWorkflowStore = <T>(
  selector: (state: WorkflowStore) => T,
): T => {
  const store = useContext(WorkflowStoreContext);

  if (!store) {
    throw new Error(
      'Missing WorkflowStoreProvider. Please ensure your component is wrapped with WorkflowStoreProvider.',
    );
  }
  return useStore(store, selector);
};
