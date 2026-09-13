'use client';

import { useWorkflowStore } from '@/features/workflow/hooks';
import type { NodeQueryData, SetupFormValues } from '@/features/workflow/types';
import { WorkflowNodeType } from '@/shared/api/base.schemas';
import { FormGenerator, FormItem } from '@/shared/components/BaseForm';

import { AppField } from './AppField';
import { buildSetupFields } from './helpers';
import { UtilityNoSetupNotice } from './UtilityNoSetupNotice';

interface SetupTabContentProps {
  node: NodeQueryData;
}

/**
 * Setup tab — composition shell.
 *
 * Always shows the App field (so the user can switch providers). Below it
 * either renders the generated form (Event + Account rows, gated by
 * `classification.ts`) or a utility empty-state notice when there are no
 * fields to fill in.
 */
const SetupTabContent = ({ node }: SetupTabContentProps) => {
  const openAppSelectorDialog = useWorkflowStore(
    (state) => state.openAppSelectorDialog,
  );

  if (!node.nodeType || !node.providerApp) return null;

  const fields = buildSetupFields(node);
  const showUtilityNotice =
    fields.length === 0 && node.nodeType === WorkflowNodeType.Utility;

  return (
    <div className="space-y-4">
      <FormItem label="App" required>
        <AppField node={node} onChangeClick={openAppSelectorDialog} />
      </FormItem>

      {fields.length > 0 && <FormGenerator<SetupFormValues> fields={fields} />}
      {showUtilityNotice && <UtilityNoSetupNotice />}
    </div>
  );
};

export { SetupTabContent };
