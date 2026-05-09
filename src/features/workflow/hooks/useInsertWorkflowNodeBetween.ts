'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

import { useWorkflowStore } from '@/features/workflow/hooks/useWorkflowStore';
import { WorkflowEdgeSourceHandle } from '@/shared/api/workflow/schemas';
import {
  InsertWorkflowNodeBetweenDocument,
  type InsertWorkflowNodeBetweenMutation,
  type InsertWorkflowNodeBetweenMutationVariables,
  WorkflowDocument,
} from '@/shared/api/workflow/workflow.schemas';

interface UseInsertWorkflowNodeBetweenProps {
  sourceNodeId: string;
  targetNodeId: string;
  workflowId: string;
}

const useInsertWorkflowNodeBetween = ({
  sourceNodeId,
  targetNodeId,
  workflowId,
}: UseInsertWorkflowNodeBetweenProps) => {
  const { openAppSelectorDialog, setSelectedNode } = useWorkflowStore(
    useShallow((state) => ({
      openAppSelectorDialog: state.openAppSelectorDialog,
      setSelectedNode: state.setSelectedNode,
    })),
  );

  const [mutate, { loading }] = useMutation<
    InsertWorkflowNodeBetweenMutation,
    InsertWorkflowNodeBetweenMutationVariables
  >(InsertWorkflowNodeBetweenDocument, {
    onCompleted: (data) => {
      const insertedNode = data.insertWorkflowNodeBetween.newNode;

      setSelectedNode(insertedNode);
      openAppSelectorDialog();
    },
    onError: (error) => {
      toast.error(error.message, { description: 'Could not insert step.' });
    },
    refetchQueries: [WorkflowDocument],
  });

  const insertNode = async () => {
    try {
      const result = await mutate({
        variables: {
          input: {
            label: 'New step',
          },
          sourceNodeId,
          targetNodeId,
          workflowId,
        },
      });

      return result.data?.insertWorkflowNodeBetween.newNode ?? null;
    } catch {
      return null;
    }
  };

  return { insertNode, loading };
};

export { useInsertWorkflowNodeBetween };
