'use client';

import { WorkflowProviderApp } from '@/shared/api/base.schemas';
import { BaseSelector } from '@/shared/components/BaseForm';
import type { FormField } from '@/shared/types';

import {
  AccountSelector,
  TriggerEventOption,
} from '../components/StepConfigPanel/TabContent/SetupTabContent';
import { NODE_TYPE_EVENT_META_DATA } from '../constants';
import type { NodeQueryData, SetupFormValues } from '../types';

interface UseSetupTabFieldsProps {
  node: NodeQueryData;
}

const useSetupTabFields = ({ node }: UseSetupTabFieldsProps) => {
  const { nodeType, providerApp } = node;
  const eventMetaData = nodeType
    ? NODE_TYPE_EVENT_META_DATA[nodeType]
    : undefined;

  const eventOptions = providerApp
    ? (eventMetaData?.options[providerApp] ?? [])
    : [];

  const accountFieldVisible = providerApp !== WorkflowProviderApp.Ai;

  const actionEventField: FormField<SetupFormValues> = {
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

  const integrationAccountField: FormField<SetupFormValues> = {
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
  };

  const fields: FormField<SetupFormValues>[] = [
    actionEventField,
    ...(accountFieldVisible ? [integrationAccountField] : []),
  ];

  return {
    accountFieldVisible,
    fields,
  };
};

export { useSetupTabFields };
