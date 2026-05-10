'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

import { useWorkflowStore } from '@/features/workflow/hooks/useWorkflowStore';
import { WorkflowEdgeSourceHandle } from '@/shared/api/workflow/schemas';
import {
  CreateWorkflowNodeDocument,
  type CreateWorkflowNodeMutation,
  type CreateWorkflowNodeMutationVariables,
  WorkflowDocument,
} from '@/shared/api/workflow/workflow.schemas';

interface UseCreateWorkflowNodeProps {
  sourceNodeId: string;
  stepNumber: number;
  workflowId: string;
}

const useCreateWorkflowNode = ({
  sourceNodeId,
  stepNumber,
  workflowId,
}: UseCreateWorkflowNodeProps) => {
  const { openAppSelectorDialog, setSelectedNode } = useWorkflowStore(
    useShallow((state) => ({
      openAppSelectorDialog: state.openAppSelectorDialog,
      setSelectedNode: state.setSelectedNode,
    })),
  );

  const [mutate, { loading }] = useMutation<
    CreateWorkflowNodeMutation,
    CreateWorkflowNodeMutationVariables
  >(CreateWorkflowNodeDocument, {
    onCompleted: (data) => {
      const createdNode = data.createWorkflowNode.node;

      setSelectedNode(createdNode);
      openAppSelectorDialog();
    },
    onError: (error) => {
      toast.error(error.message, { description: 'Could not add step.' });
    },
    refetchQueries: [WorkflowDocument],
  });

  const createNode = async () => {
    try {
      const result = await mutate({
        variables: {
          input: {
            label: `New step ${stepNumber + 1}`,
            sourceHandle: WorkflowEdgeSourceHandle.Default,
            sourceNodeId,
          },
          workflowId,
        },
      });

      return result.data?.createWorkflowNode.node ?? null;
    } catch {
      return null;
    }
  };

  return { createNode, loading };
};

export { useCreateWorkflowNode };
