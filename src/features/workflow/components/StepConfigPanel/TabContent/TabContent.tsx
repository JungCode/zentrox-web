import { ConfigStep, NodeQueryData } from '@/features/workflow/types';

import { ConfigureTabContent } from './ConfigureTabContent/ConfigureTabContent';
import { SetupTabContent } from './SetupTabContent/SetupTabContent';
import { TestTabContent } from './TestTabContent/TestTabContent';

interface TabContentProps {
  activeStep: ConfigStep;
  node: NodeQueryData;
  workflowId: string;
}

export const TabContent = ({
  activeStep,
  node,
  workflowId,
}: TabContentProps) => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {activeStep === 'setup' && (
        <div className="h-full overflow-y-auto p-4">
          <SetupTabContent node={node} />
        </div>
      )}
      {activeStep === 'configure' && (
        <div className="h-full overflow-y-auto p-4">
          <ConfigureTabContent node={node} />
        </div>
      )}
      {activeStep === 'test' && (
        <TestTabContent node={node} workflowId={workflowId} />
      )}
    </div>
  );
};
