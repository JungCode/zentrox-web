'use client';

import { useQuery } from '@apollo/client/react';

import { parseSampleData } from '@/features/workflow/helpers';
import {
  WorkflowDocument,
  WorkflowVersionNodeSamplesDocument,
  type WorkflowVersionNodeSamplesQuery,
  type WorkflowVersionNodeSamplesQueryVariables,
} from '@/shared/api/workflow/workflow.schemas';
import type { AvailableFieldGroup } from '@/shared/types';

interface UseWorkflowNodeSamplesProps {
  nodeId: string;
  workflowVersionId: string;
}

const useWorkflowNodeSamples = ({
  nodeId,
  workflowVersionId,
}: UseWorkflowNodeSamplesProps) => {
  const { data, loading } = useQuery<
    WorkflowVersionNodeSamplesQuery,
    WorkflowVersionNodeSamplesQueryVariables
  >(WorkflowVersionNodeSamplesDocument, {
    skip: !workflowVersionId || !nodeId,
    variables: { currentNodeId: nodeId, workflowVersionId },
  });

  const availableFields: AvailableFieldGroup[] = data
    ? parseSampleData(data.workflowVersionNodeSamples)
    : [];

  return { availableFields, loading };
};

export { useWorkflowNodeSamples };
