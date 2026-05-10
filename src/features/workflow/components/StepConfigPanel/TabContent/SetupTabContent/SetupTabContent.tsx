'use client';

import { Controller, useForm } from 'react-hook-form';

import { GOOGLE_FORM_TRIGGER_EVENT_OPTIONS } from '@/features/workflow/constants';
import { SETUP_FORM_FALLBACKS } from '@/features/workflow/constants/formFallback';
import { useWorkflowStore } from '@/features/workflow/hooks';
import type {
  NodeQueryData,
  ProviderAppMetadataType,
  SetupFormValues,
} from '@/features/workflow/types';
import type { UpdateWorkflowNodeInput } from '@/shared/api/workflow/schemas';
import { BaseSelector, FormItem } from '@/shared/components/BaseForm';
import { Button } from '@/shared/components/ui/button';
import { getDefaultValues } from '@/shared/utils';

import { AccountSelector } from './AccountSelector/AccountSelector';
import { AppField } from './AppField';
import { TriggerEventOption } from './TriggerEventOption';

interface SetupTabContentProps {
  node: NodeQueryData | undefined;
  onMoveToNextStep?: () => void;
  providerAppMetadata: ProviderAppMetadataType | undefined;
  updateNode: (input: UpdateWorkflowNodeInput) => Promise<unknown>;
}

const SetupTabContent = ({
  node,
  onMoveToNextStep,
  providerAppMetadata,
  updateNode,
}: SetupTabContentProps) => {
  const openAppSelectorDialog = useWorkflowStore(
    (state) => state.openAppSelectorDialog,
  );

  const { control, handleSubmit } = useForm<SetupFormValues>({
    defaultValues: getDefaultValues(node, SETUP_FORM_FALLBACKS),
    resetOptions: {
      keepDirtyValues: true, // keep value that user has changed but not submitted yet
    },
    values: getDefaultValues(node, SETUP_FORM_FALLBACKS),
  });

  const onSubmit = handleSubmit(async (values) => {
    await updateNode({
      actionKey: values.actionKey,
      integrationAccountId: values.integrationAccountId,
    });
    onMoveToNextStep?.();
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <FormItem label="App">
        <AppField
          node={node}
          onChangeClick={openAppSelectorDialog}
          providerAppMetadata={providerAppMetadata}
        />
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

      <Button className="w-full" size="lg" type="submit" variant="secondary">
        Continue
      </Button>
    </form>
  );
};

export { SetupTabContent };
