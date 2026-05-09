import { useUpdateWorkflowNode } from '@/features/workflow/hooks';
import {
  ConfigStep,
  NodeQueryData,
  ProviderAppMetadataType,
} from '@/features/workflow/types';

import { ConfigureTabContent } from './ConfigureTabContent/ConfigureTabContent';
import { SetupTabContent } from './SetupTabContent/SetupTabContent';
import { TestTabContent } from './TestTabContent';

interface TabContentProps {
  activeStep: ConfigStep;
  node: NodeQueryData | undefined;
  onStepChange?: (step: ConfigStep) => void;
  providerAppMetadata: ProviderAppMetadataType | undefined;
  workflowId: string;
}

export const TabContent = ({
  activeStep,
  node,
  onStepChange,
  providerAppMetadata,
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
    <div className="flex-1 overflow-y-auto p-4">
      {activeStep === 'setup' && (
        <SetupTabContent
          node={node}
          onMoveToNextStep={handleMoveToConfigureStep}
          providerAppMetadata={providerAppMetadata}
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
      {activeStep === 'test' && <TestTabContent node={node} />}
    </div>
  );
};
