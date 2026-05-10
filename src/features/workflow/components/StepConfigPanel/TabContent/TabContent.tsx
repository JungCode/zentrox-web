import { useUpdateWorkflowNode } from '@/features/workflow/hooks';
import { ConfigStep, NodeQueryData } from '@/features/workflow/types';

import { ConfigureTabContent } from './ConfigureTabContent/ConfigureTabContent';
import { SetupTabContent } from './SetupTabContent/SetupTabContent';
import { TestTabContent } from './TestTabContent/TestTabContent';

interface TabContentProps {
  activeStep: ConfigStep;
  node: NodeQueryData | undefined;
  onStepChange?: (step: ConfigStep) => void;
  workflowId: string;
}

export const TabContent = ({
  activeStep,
  node,
  onStepChange,
  workflowId,
}: TabContentProps) => {
  const { updateNode } = useUpdateWorkflowNode({
    node,
    workflowId,
  });

  const handleMoveToConfigureStep = () => {
    onStepChange?.('configure');
  };
  const handleMoveToTestStep = () => {
    onStepChange?.('test');
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {activeStep === 'setup' && (
        <SetupTabContent
          node={node}
          onMoveToNextStep={handleMoveToConfigureStep}
          updateNode={updateNode}
        />
      )}
      {activeStep === 'configure' && (
        <ConfigureTabContent
          node={node}
          onMoveToNextStep={handleMoveToTestStep}
          updateNode={updateNode}
        />
      )}
      {activeStep === 'test' && (
        <TestTabContent node={node} workflowId={workflowId} />
      )}
    </div>
  );
};
