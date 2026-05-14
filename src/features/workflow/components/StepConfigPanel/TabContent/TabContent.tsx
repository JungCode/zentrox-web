import { useUpdateWorkflowNode } from '@/features/workflow/hooks';
import { ConfigStep, NodeQueryData } from '@/features/workflow/types';

import { ConfigureTabContent } from './ConfigureTabContent/ConfigureTabContent';
import { SetupTabContent } from './SetupTabContent/SetupTabContent';
import { TestTabContent } from './TestTabContent/TestTabContent';

interface TabContentProps {
  activeStep: ConfigStep;
  node: NodeQueryData | undefined;
  workflowId: string;
}

export const TabContent = ({
  activeStep,
  node,
  workflowId,
}: TabContentProps) => {
  const { updateNode } = useUpdateWorkflowNode({ node, workflowId });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {activeStep === 'setup' && (
        <SetupTabContent node={node} updateNode={updateNode} />
      )}
      {activeStep === 'configure' && (
        <ConfigureTabContent node={node} updateNode={updateNode} />
      )}
      {activeStep === 'test' && (
        <TestTabContent node={node} workflowId={workflowId} />
      )}
    </div>
  );
};
