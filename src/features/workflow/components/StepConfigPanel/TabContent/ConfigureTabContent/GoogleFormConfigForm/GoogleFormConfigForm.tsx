'use client';

import { useFormContext } from 'react-hook-form';

import type {
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { FormGenerator } from '@/shared/components/BaseForm';
import type { FormField } from '@/shared/types';

import { GoogleFormSelector } from './GoogleFormSelector';

interface GoogleFormConfigFormProps {
  node: NodeQueryData | undefined;
}

const GoogleFormConfigForm = ({ node }: GoogleFormConfigFormProps) => {
  const { setValue } = useFormContext<StepConfigFormValues>();

  const fields: FormField<StepConfigFormValues>[] = [
    {
      label: 'Form',
      name: 'configJson.formId',
      render: (field) => (
        <GoogleFormSelector
          integrationAccountId={node?.integrationAccountId ?? ''}
          onFormChange={(form) => {
            setValue('configJson.formName', form.configJson?.formName);
          }}
          onValueChange={field.onChange}
          side="left"
          value={(field.value as string) ?? ''}
        />
      ),
      required: true,
    },
  ];

  return <FormGenerator<StepConfigFormValues> fields={fields} />;
};

export { GoogleFormConfigForm };
