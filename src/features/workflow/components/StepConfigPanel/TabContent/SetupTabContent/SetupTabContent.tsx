'use client';

import type { BaseSyntheticEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { GOOGLE_FORM_TRIGGER_EVENT_OPTIONS } from '@/features/workflow/constants';
import {
  useUpdateWorkflowNode,
  useWorkflowStore,
} from '@/features/workflow/hooks';
import type {
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { UpdateWorkflowNodeInput } from '@/shared/api/workflow/schemas';
import { BaseSelector, FormItem } from '@/shared/components/BaseForm';
import { Button } from '@/shared/components/ui/button';

import { StepConfigContentLayout } from '../StepConfigContentLayout';
import { AccountSelector } from './AccountSelector/AccountSelector';
import { AppField } from './AppField';
import { TriggerEventOption } from './TriggerEventOption';

interface SetupTabContentProps {
  node: NodeQueryData | undefined;
  updateNode: (input: UpdateWorkflowNodeInput) => Promise<unknown>;
}

const SetupTabContent = ({ node, updateNode }: SetupTabContentProps) => {
  const { control, handleSubmit } = useFormContext<StepConfigFormValues>();

  const onSubmit = async (values: StepConfigFormValues) => {
    await updateNode({
      actionKey: values.actionKey,
      integrationAccountId: values.integrationAccountId,
    });
  };

  const openAppSelectorDialog = useWorkflowStore(
    (state) => state.openAppSelectorDialog,
  );

  return (
    <StepConfigContentLayout
      footer={
        <Button
          className="w-full"
          form="setup-form"
          size="lg"
          type="submit"
          variant="secondary"
        >
          Continue
        </Button>
      }
    >
      <form
        className="space-y-4"
        id="setup-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormItem label="App">
          <AppField node={node} onChangeClick={openAppSelectorDialog} />
        </FormItem>

        <FormItem label="Trigger Event">
          <Controller
            control={control}
            name="actionKey"
            render={({ field }) => (
              <BaseSelector
                onValueChange={field.onChange}
                options={GOOGLE_FORM_TRIGGER_EVENT_OPTIONS}
                placeholder="Select trigger event…"
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
      </form>
    </StepConfigContentLayout>
  );
};

export { SetupTabContent };
