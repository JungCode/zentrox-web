'use client';

import { Controller, useForm } from 'react-hook-form';

import { CONFIGURE_GOOGLE_FORM_FALLBACKS } from '@/features/workflow/constants/formFallback';
import type {
  GoogleFormConfig,
  NodeQueryData,
} from '@/features/workflow/types';
import type { UpdateWorkflowNodeInput } from '@/shared/api/workflow/schemas';
import { FormItem } from '@/shared/components/BaseForm';
import { Button } from '@/shared/components/ui/button';
import { getDefaultValues } from '@/shared/utils';

import { GoogleFormSelector } from './GoogleFormSelector';

interface ConfigureTabContentProps {
  node: NodeQueryData | undefined;
  onMoveToNextStep?: () => void;
  updateNode: (input: UpdateWorkflowNodeInput) => Promise<unknown>;
}

const ConfigureTabContent = ({
  node,
  onMoveToNextStep,
  updateNode,
}: ConfigureTabContentProps) => {
  const defaultValues: GoogleFormConfig = {
    ...getDefaultValues<GoogleFormConfig>(
      node,
      CONFIGURE_GOOGLE_FORM_FALLBACKS,
    ),
  };

  const { control, handleSubmit, setValue } = useForm<GoogleFormConfig>({
    defaultValues,
    resetOptions: {
      keepDirtyValues: true,
    },
    values: defaultValues,
  });

  const onSubmit = handleSubmit(async (values) => {
    await updateNode({
      configJson: {
        ...(node?.configJson ?? {}),
        formId: values.configJson?.formId,
        formName: values.configJson?.formName,
      },
    });
    onMoveToNextStep?.();
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <FormItem label="Form">
        <Controller
          control={control}
          name="configJson.formId"
          render={({ field }) => (
            <GoogleFormSelector
              integrationAccountId={node?.integrationAccountId ?? ''}
              onFormChange={(form) => {
                setValue('configJson.formName', form.configJson?.formName);
              }}
              onValueChange={field.onChange}
              value={field.value ?? ''}
            />
          )}
        />
      </FormItem>

      <Button className="w-full" size="lg" type="submit" variant="secondary">
        Continue
      </Button>
    </form>
  );
};

export { ConfigureTabContent };
