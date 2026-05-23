'use client';

import type { NodeQueryData } from '@/features/workflow/types/graph';
import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';

import { ActionTestedView } from './ActionTestedView';
import { TriggerTestedView } from './TriggerTestedView/TriggerTestedView';

interface TestedViewProps {
  node: NodeQueryData;
  workflowId: string;
}

const TestedView = ({ node, workflowId }: TestedViewProps) => {
  switch (node.nodeType) {
    case WorkflowNodeType.Trigger:
      return <TriggerTestedView node={node} workflowId={workflowId} />;

    case WorkflowNodeType.Action:
      return <ActionTestedView node={node} workflowId={workflowId} />;

    default:
      return null;
  }
};

export { TestedView };
