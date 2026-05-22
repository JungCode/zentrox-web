import { useMutation } from '@apollo/client/react';
import { useShallow } from 'zustand/shallow';

import { WorkflowProviderApp } from '@/shared/api/base.schemas';
import { AssignProviderAppDocument } from '@/shared/api/workflow/workflow.schemas';

import { useWorkflowStore } from '../../hooks';
import { AppProviderSelectOption } from '../../types';
import { AppSelectorDialog } from './AppSelectorDialog';

interface AppSelectorContainerProps {
  workflowId: string;
}
export const AppSelectorContainer = ({
  workflowId,
}: AppSelectorContainerProps) => {
  const [assignProviderApp] = useMutation(AssignProviderAppDocument);
  //TODO: handle onCompleted, loading and onError.

  const { closeAppSelectorDialog, isAppSelectorDialogOpen, selectedNode } =
    useWorkflowStore(
      useShallow((state) => ({
        closeAppSelectorDialog: state.closeAppSelectorDialog,
        isAppSelectorDialogOpen: state.isAppSelectorDialogOpen,
        selectedNode: state.selectedNode,
      })),
    );

  const handleSelectApp = (app: AppProviderSelectOption) => {
    assignProviderApp({
      onCompleted: () => {
        closeAppSelectorDialog();
      },
      variables: {
        nodeId: selectedNode?.id || '',
        providerApp: app.id,
        workflowId,
      },
    });
  };

  return (
    <AppSelectorDialog
      onOpenChange={(isOpen) => {
        if (isOpen) return;

        closeAppSelectorDialog();
      }}
      onSelectApp={handleSelectApp}
      open={isAppSelectorDialogOpen}
    />
  );
};
