'use client';

import { Controller, useFormContext } from 'react-hook-form';

import type {
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { UpdateWorkflowNodeInput } from '@/shared/api/workflow/schemas';
import { FormItem } from '@/shared/components/BaseForm';
import { Button } from '@/shared/components/ui/button';

import { StepConfigContentLayout } from '../StepConfigContentLayout';
import { GoogleFormSelector } from './GoogleFormSelector';

interface ConfigureTabContentProps {
  node: NodeQueryData | undefined;
  updateNode: (input: UpdateWorkflowNodeInput) => Promise<unknown>;
}

const ConfigureTabContent = ({
  node,
  updateNode,
}: ConfigureTabContentProps) => {
  const { control, handleSubmit, setValue } =
    useFormContext<StepConfigFormValues>();

  const onSubmit = async (values: StepConfigFormValues) => {
    await updateNode({
      configJson: {
        ...(node?.configJson ?? {}),
        formId: values.configJson?.formId,
        formName: values.configJson?.formName,
      },
    });
  };

  return (
    <StepConfigContentLayout
      footer={
        <Button
          className="w-full"
          form="configure-form"
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
        id="configure-form"
        onSubmit={handleSubmit(onSubmit)}
      >
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
      </form>
    </StepConfigContentLayout>
  );
};

export { ConfigureTabContent };
