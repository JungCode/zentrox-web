import { NODE_TYPE_EVENT_META_DATA } from '@/features/workflow/constants';
import type { NodeQueryData, SetupFormValues } from '@/features/workflow/types';
import { BaseSelector } from '@/shared/components/BaseForm';
import type { FormField } from '@/shared/types/baseform';

import { AccountSelector } from '../AccountSelector';
import { TriggerEventOption } from '../TriggerEventOption';
import { needsAccountField, needsEventField } from './classification';

/**
 * Compose the list of setup-tab fields for a given node.
 *
 * Each builder below returns a single FormField descriptor; the classification
 * predicates decide which rows get appended. The order of fields here drives
 * the order they render in the UI.
 */
const buildSetupFields = (
  node: NodeQueryData,
): FormField<SetupFormValues>[] => {
  const { providerApp } = node;
  if (!providerApp) return [];

  const fields: FormField<SetupFormValues>[] = [];
  if (needsEventField(providerApp)) fields.push(buildEventField(node));
  if (needsAccountField(providerApp)) fields.push(buildAccountField());
  return fields;
};

const buildEventField = (node: NodeQueryData): FormField<SetupFormValues> => {
  const eventMetaData = node.nodeType
    ? NODE_TYPE_EVENT_META_DATA[node.nodeType]
    : undefined;
  const eventOptions = node.providerApp
    ? (eventMetaData?.options[node.providerApp] ?? [])
    : [];

  return {
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
  };
};

const buildAccountField = (): FormField<SetupFormValues> => ({
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

export { buildSetupFields };
