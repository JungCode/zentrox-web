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
      switch (node.providerApp) {
        case WorkflowProviderApp.GoogleForm:
          return <TriggerTestedView node={node} workflowId={workflowId} />;

        case WorkflowProviderApp.GoogleSheet:
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        default:
          return null;
      }

    case WorkflowNodeType.Action:
      switch (node.providerApp) {
        case WorkflowProviderApp.GoogleSheet:
          return <ActionTestedView node={node} workflowId={workflowId} />;

        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        case WorkflowProviderApp.GoogleForm:
        default:
          return null;
      }

    default:
      return null;
  }
};

export { TestedView };
