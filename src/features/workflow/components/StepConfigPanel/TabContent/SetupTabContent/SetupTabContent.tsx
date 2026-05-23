'use client';

import { NODE_TYPE_EVENT_META_DATA } from '@/features/workflow/constants';
import { useWorkflowStore } from '@/features/workflow/hooks';
import type { NodeQueryData, SetupFormValues } from '@/features/workflow/types';
import { WorkflowProviderApp } from '@/shared/api/base.schemas';
import {
  BaseSelector,
  FormGenerator,
  FormItem,
} from '@/shared/components/BaseForm';
import type { FormField } from '@/shared/types/baseform';

import { AccountSelector } from './AccountSelector';
import { AppField } from './AppField';
import { TriggerEventOption } from './TriggerEventOption';

// Providers that don't authenticate against an external account.
// AI runs on user-supplied prompts + knowledge files, so no OAuth step.
const PROVIDERS_WITHOUT_ACCOUNT = new Set<WorkflowProviderApp>([
  WorkflowProviderApp.Ai,
]);

interface SetupTabContentProps {
  node: NodeQueryData;
}

const SetupTabContent = ({ node }: SetupTabContentProps) => {
  const openAppSelectorDialog = useWorkflowStore(
    (state) => state.openAppSelectorDialog,
  );

  if (!node.nodeType || !node.providerApp) return null;

  const fields = buildSetupFields(node);

  return (
    <div className="space-y-4">
      <FormItem label="App" required={true}>
        <AppField node={node} onChangeClick={openAppSelectorDialog} />
      </FormItem>

      <FormGenerator<SetupFormValues> fields={fields} />
    </div>
  );
};

const buildSetupFields = (
  node: NodeQueryData,
): FormField<SetupFormValues>[] => {
  const { nodeType, providerApp } = node;
  const eventMetaData = nodeType
    ? NODE_TYPE_EVENT_META_DATA[nodeType]
    : undefined;
  const eventOptions = providerApp
    ? (eventMetaData?.options[providerApp] ?? [])
    : [];

  const fields: FormField<SetupFormValues>[] = [
    {
      label: eventMetaData?.label ?? 'Event',
      name: 'actionKey',
      render: (field) => (
        <BaseSelector
          onValueChange={field.onChange}
          options={eventOptions}
          placeholder={eventMetaData?.placeholder}
          renderOption={(opt) => <TriggerEventOption option={opt} />}
          side="left"
          value={(field.value as string) ?? ''}
        />
      ),
      required: true,
    },
  ];

  if (providerApp && !PROVIDERS_WITHOUT_ACCOUNT.has(providerApp)) {
    fields.push({
      label: 'Account',
      legend:
        'This app is a secure partner with Zentrox. Your credentials are encrypted and can be removed at any time.',
      name: 'integrationAccountId',
      render: (field) => (
        <AccountSelector
          onValueChange={field.onChange}
          side="left"
          value={(field.value as string) ?? ''}
        />
      ),
      required: true,
    });
  }

  return fields;
};

export { SetupTabContent };
