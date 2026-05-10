'use client';

import type { NodeQueryData } from '@/features/workflow/types/graph';

import { TestedView } from './TestedView/TestedView';
import { UntestedView } from './UntestedView';

interface TestTabContentProps {
  node: NodeQueryData | undefined;
  workflowId: string;
}

const TestTabContent = ({ node, workflowId }: TestTabContentProps) => {
  if (!node || node.connectionStatus === 'untested') {
    return <UntestedView node={node} workflowId={workflowId} />;
  }

  return <TestedView node={node} workflowId={workflowId} />;
};

export { TestTabContent };
