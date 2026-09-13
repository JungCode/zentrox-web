'use client';

import { ReactFlowProvider } from '@xyflow/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import {
  StepConfigPanel,
  WorkflowCanvas,
  WorkflowHeader,
} from '@/features/workflow/components';
import { AppSelectorContainer } from '@/features/workflow/components/AppSelectorContainer';
import { useTestRunWorkflow } from '@/features/workflow/hooks/useTestRunWorkflow';
import { useWorkflowGraph } from '@/features/workflow/hooks/useWorkflowGraph';
import { useWorkflowRunProgress } from '@/features/workflow/hooks/useWorkflowRunProgress';

const WorkflowPage = () => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  const [isPublishing, setIsPublishing] = useState(false);

  const {
    closeConfigPanel,
    edges,
    handleNodeClick,
    isConfigPanelOpen,
    nodes,
    onEdgesChange,
    onNodesChange,
    selectedNode,
  } = useWorkflowGraph({ workflowId });

  // Subscribes to workflowRunProgress and routes events into the store so
  // WorkflowNode can highlight running/success/failed states in real time.
  useWorkflowRunProgress({ workflowId });

  const { loading: isTesting, testRunWorkflow } = useTestRunWorkflow({
    workflowId,
  });

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
          isTesting={isTesting}
          onPublish={handlePublish}
          onTestRun={() => testRunWorkflow(3)}
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
            nodeId={selectedNode?.id || ''}
            nodeIndex={1}
            onClose={closeConfigPanel}
            open={isConfigPanelOpen}
            workflowId={workflowId}
          />
        </div>
      </div>

      {/* App selector dialog — portal, rendered above everything */}
      <AppSelectorContainer workflowId={workflowId} />
    </ReactFlowProvider>
  );
};

export default WorkflowPage;
