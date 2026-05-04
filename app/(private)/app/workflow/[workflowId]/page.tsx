'use client';

import { ReactFlowProvider } from '@xyflow/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import {
  AppSelectorDialog,
  StepConfigPanel,
  WorkflowCanvas,
  WorkflowHeader,
} from '@/features/workflow/components';
import { useWorkflowGraph } from '@/features/workflow/hooks/useWorkflowGraph';

const WorkflowPage = () => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  const [isPublishing, setIsPublishing] = useState(false);

  const {
    appSelectorNodeId,
    configPanelNodeId,
    edges,
    handleNodeClick,
    nodes,
    onEdgesChange,
    onNodesChange,
    setAppSelectorNodeId,
    setConfigPanelNodeId,
  } = useWorkflowGraph({ workflowId });

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate async publish — replace with real API call
    setTimeout(() => setIsPublishing(false), 1500);
  };

  return (
    <ReactFlowProvider>
      {/* Full-height container that fills the space below the app header */}
      <div className="flex h-[calc(100svh-3.5rem)] flex-col overflow-hidden">
        {/* Sub-header bar */}
        <WorkflowHeader
          isPublishing={isPublishing}
          onPublish={handlePublish}
          onTestRun={() => {}}
          workflowName="My Zap"
        />

        {/* Canvas area — config panel is absolutely positioned inside */}
        <div className="relative flex flex-1 overflow-hidden">
          <WorkflowCanvas
            edges={edges}
            nodes={nodes}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            onNodesChange={onNodesChange}
          />
          <StepConfigPanel
            nodeId={configPanelNodeId || ''}
            nodeIndex={1}
            onClose={() => setConfigPanelNodeId(null)}
            open={!!configPanelNodeId}
            workflowId={workflowId}
          />
        </div>
      </div>

      {/* App selector dialog — portal, rendered above everything */}
      <AppSelectorDialog
        nodeId={appSelectorNodeId}
        onOpenChange={(open) => !open && setAppSelectorNodeId(null)}
        onSelectApp={() => {}}
        open={!!appSelectorNodeId}
      />
    </ReactFlowProvider>
  );
};

export default WorkflowPage;
