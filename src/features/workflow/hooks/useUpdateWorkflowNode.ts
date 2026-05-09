'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { UpdateWorkflowNodeInput } from '@/shared/api/workflow/schemas';
import {
  UpdateWorkflowNodeDocument,
  type UpdateWorkflowNodeMutation,
  type UpdateWorkflowNodeMutationVariables,
} from '@/shared/api/workflow/workflow.schemas';
import { getDefaultValues } from '@/shared/utils';

import { WORKFLOW_NODE_FORM_FALLBACKS } from '../constants/formFallback';
import { NodeQueryData } from '../types';

interface UseUpdateWorkflowNodeProps {
  node: NodeQueryData | undefined;
  workflowId: string;
}

const useUpdateWorkflowNode = ({
  node,
  workflowId,
}: UseUpdateWorkflowNodeProps) => {
  const [mutate, { loading }] = useMutation<
    UpdateWorkflowNodeMutation,
    UpdateWorkflowNodeMutationVariables
  >(UpdateWorkflowNodeDocument, {
    onError: (error) => {
      toast.error(error.message, { description: 'Could not update step.' });
    },
  });

  const updateNode = async (input: UpdateWorkflowNodeInput) => {
    if (!node || !node.id) return;

    const updatedNodeValue: UpdateWorkflowNodeInput = {
      ...getDefaultValues(node, WORKFLOW_NODE_FORM_FALLBACKS),
      ...input,
    };

    try {
      const result = await mutate({
        variables: { input: updatedNodeValue, nodeId: node?.id, workflowId },
      });
      return result.data?.updateWorkflowNode ?? null;
    } catch {
      return null;
    }
  };

  return { loading, updateNode };
};

export { useUpdateWorkflowNode };
