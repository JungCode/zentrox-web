'use client';

import type { NodeQueryData } from '@/features/workflow/types/graph';
import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';

import { ActionTestedView } from './ActionTestedView';
import { PathsTestedView } from './PathsTestedView';
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

    case WorkflowNodeType.Utility:
      switch (node.providerApp) {
        case WorkflowProviderApp.Paths:
          return <PathsTestedView node={node} workflowId={workflowId} />;
        default:
          return null;
      }

    default:
      return null;
  }
};

export { TestedView };
