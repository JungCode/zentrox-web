'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { NODE_TYPE_EVENT_META_DATA } from '@/features/workflow/constants';
import { useWorkflowStore } from '@/features/workflow/hooks';
import type {
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { BaseSelector, FormItem } from '@/shared/components/BaseForm';

import { AccountSelector } from './AccountSelector/AccountSelector';
import { AppField } from './AppField';
import { TriggerEventOption } from './TriggerEventOption';

interface SetupTabContentProps {
  node: NodeQueryData;
}

const SetupTabContent = ({ node }: SetupTabContentProps) => {
  const openAppSelectorDialog = useWorkflowStore(
    (state) => state.openAppSelectorDialog,
  );
  const { control } = useFormContext<StepConfigFormValues>();

  if (!node.nodeType || !node.providerApp) return null;
  const { nodeType, providerApp } = node;

  const eventMetaData = NODE_TYPE_EVENT_META_DATA[nodeType];
  const eventOptions = eventMetaData?.options[providerApp] ?? [];

  return (
    <div className="space-y-4">
      <FormItem label="App">
        <AppField node={node} onChangeClick={openAppSelectorDialog} />
      </FormItem>

      <FormItem label={eventMetaData?.label ?? 'Event'}>
        <Controller
          control={control}
          name="actionKey"
          render={({ field }) => (
            <BaseSelector
              onValueChange={field.onChange}
              options={eventOptions}
              placeholder={eventMetaData?.placeholder}
              renderOption={(opt) => <TriggerEventOption option={opt} />}
              side="left"
              value={field.value ?? ''}
            />
          )}
        />
      </FormItem>

      <FormItem label="Account">
        <Controller
          control={control}
          name="integrationAccountId"
          render={({ field }) => (
            <AccountSelector
              onValueChange={field.onChange}
              side="left"
              value={field.value ?? ''}
            />
          )}
        />
      </FormItem>

      <p className="text-on-surface-variant bg-surface-container rounded-md p-3 text-xs leading-relaxed">
        This app is a secure partner with Zentrox. Your credentials are
        encrypted and can be removed at any time.
      </p>
    </div>
  );
};

export { SetupTabContent };
