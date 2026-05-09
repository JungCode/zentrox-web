'use client';

import { useQuery } from '@apollo/client/react';

import { ProviderAppMetadataRecord } from '@/features/workflow/constants';
import type { NodeQueryData } from '@/features/workflow/types';
import { WorkflowNodeDocument } from '@/shared/api/workflow/workflow.schemas';

interface UseStepConfigNodeProps {
  nodeId: string | undefined;
  workflowId: string;
}

const useStepConfigNode = ({ nodeId, workflowId }: UseStepConfigNodeProps) => {
  const { data, loading } = useQuery(WorkflowNodeDocument, {
    skip: !nodeId,
    variables: {
      nodeId: nodeId ?? '',
      workflowId,
    },
  });

  const node = data?.workflowNode as NodeQueryData;

  const providerAppMetadata = node?.providerApp
    ? ProviderAppMetadataRecord[node.providerApp]
    : undefined;

  return { loading, node, providerAppMetadata };
};

export { useStepConfigNode };
