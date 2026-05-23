'use client';

import { getSetupTabFields } from '@/features/workflow/helpers';
import { useWorkflowStore } from '@/features/workflow/hooks';
import type { NodeQueryData, SetupFormValues } from '@/features/workflow/types';
import { FormGenerator, FormItem } from '@/shared/components/BaseForm';

import { AppField } from './AppField';

interface SetupTabContentProps {
  node: NodeQueryData;
}

const SetupTabContent = ({ node }: SetupTabContentProps) => {
  const openAppSelectorDialog = useWorkflowStore(
    (state) => state.openAppSelectorDialog,
  );
  const { fields } = getSetupTabFields({ node });

  if (!node.nodeType || !node.providerApp) return null;

  return (
    <div className="space-y-4">
      <FormItem label="App" required={true}>
        <AppField node={node} onChangeClick={openAppSelectorDialog} />
      </FormItem>

      <FormGenerator<SetupFormValues> fields={fields} />
    </div>
  );
};

export { SetupTabContent };
