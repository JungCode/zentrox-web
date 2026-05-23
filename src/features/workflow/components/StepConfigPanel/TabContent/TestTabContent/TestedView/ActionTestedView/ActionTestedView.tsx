'use client';

import { useState } from 'react';

import { useActionNodeSample, useTestRunNode } from '@/features/workflow/hooks';
import type { DataTabKey, NodeQueryData } from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';

import { TestTabContentLayout } from '../../TestTabContentLayout';
import { ActionDataTab } from './ActionDataTab';
import { DataTabsHeader } from './DataTabsHeader';

interface ActionTestedViewProps {
  node: NodeQueryData;
  workflowId: string;
}

const ActionTestedView = ({ node, workflowId }: ActionTestedViewProps) => {
  const [activeTab, setActiveTab] = useState<DataTabKey>('in');

  const { loading: testing, testRun } = useTestRunNode({
    nodeId: node.id,
    workflowId,
  });

  const { loading: sampleLoading, sampleRecord } = useActionNodeSample({
    nodeId: node.id,
    workflowId,
  });

  return (
    <TestTabContentLayout
      footer={
        <Button
          className="w-full"
          disabled={testing}
          onClick={() => testRun()}
          size="lg"
          variant="secondary"
        >
          {testing && <Spinner data-icon="inline-start" />}
          Re-run test
        </Button>
      }
    >
      <div className="space-y-4">
        <DataTabsHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="border-outline-variant/40 rounded-xs border p-3">
          <ActionDataTab
            activeTab={activeTab}
            node={node}
            sampleData={sampleRecord?.data}
            sampleLoading={sampleLoading}
          />
        </div>
      </div>
    </TestTabContentLayout>
  );
};

export { ActionTestedView };
