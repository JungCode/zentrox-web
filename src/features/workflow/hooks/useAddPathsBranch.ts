'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import {
  AddPathsBranchDocument,
  type AddPathsBranchMutation,
  type AddPathsBranchMutationVariables,
  WorkflowDocument,
} from '@/shared/api/workflow/workflow.schemas';

interface UseAddPathsBranchProps {
  pathsNodeId: string;
  workflowId: string;
}

/**
 * Append a new branch to a Paths utility node.
 *
 * The mutation runs server-side: writes the branch onto the node's
 * configJson, creates a placeholder downstream node, and an edge tagged
 * with `branch_<id>`. We refetch WorkflowDocument so the canvas tree
 * layout picks up the new sibling without optimistic-update gymnastics.
 */
const useAddPathsBranch = ({
  pathsNodeId,
  workflowId,
}: UseAddPathsBranchProps) => {
  const [mutate, { loading }] = useMutation<
    AddPathsBranchMutation,
    AddPathsBranchMutationVariables
  >(AddPathsBranchDocument, {
    onError: (error) => {
      toast.error(error.message, { description: 'Could not add branch.' });
    },
    refetchQueries: [WorkflowDocument],
  });

  const addBranch = async (label?: string) => {
    const result = await mutate({
      variables: { label, pathsNodeId, workflowId },
    });
    return result.data?.addPathsBranch ?? null;
  };

  return { addBranch, loading };
};

export { useAddPathsBranch };
