'use client';

import { Controller, useFormContext } from 'react-hook-form';

import type {
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { FormItem } from '@/shared/components/BaseForm';

import { GoogleFormSelector } from './GoogleFormSelector';

interface GoogleFormConfigFormProps {
  node: NodeQueryData | undefined;
}

const GoogleFormConfigForm = ({ node }: GoogleFormConfigFormProps) => {
  const { control, setValue } = useFormContext<StepConfigFormValues>();

  return (
    <div className="space-y-4">
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
              side="left"
              value={field.value ?? ''}
            />
          )}
        />
      </FormItem>
    </div>
  );
};

export { GoogleFormConfigForm };
