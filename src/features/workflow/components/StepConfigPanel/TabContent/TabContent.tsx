import { useUpdateWorkflowNode } from '@/features/workflow/hooks';
import {
  ConfigStep,
  NodeQueryData,
  ProviderAppMetadataType,
} from '@/features/workflow/types';

import { ConfigureTabContent } from './ConfigureTabContent';
import { SetupTabContent } from './SetupTabContent/SetupTabContent';
import { TestTabContent } from './TestTabContent';

interface TabContentProps {
  activeStep: ConfigStep;
  node: NodeQueryData | undefined;
  providerAppMetadata: ProviderAppMetadataType | undefined;
  workflowId: string;
}

export const TabContent = ({
  activeStep,
  node,
  providerAppMetadata,
  workflowId,
}: TabContentProps) => {
  const { updateNode } = useUpdateWorkflowNode({
    node,
    workflowId,
  });

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {activeStep === 'setup' && (
        <SetupTabContent
          node={node}
          providerAppMetadata={providerAppMetadata}
          updateNode={updateNode}
        />
      )}
      {activeStep === 'configure' && <ConfigureTabContent node={node} />}
      {activeStep === 'test' && <TestTabContent node={node} />}
    </div>
  );
};
