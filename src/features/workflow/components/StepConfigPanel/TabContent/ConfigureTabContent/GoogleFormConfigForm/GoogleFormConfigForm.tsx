'use client';

import { useFormContext } from 'react-hook-form';

import type {
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { FormGenerator } from '@/shared/components/BaseForm';
import { createTypedSetValue } from '@/shared/helpers';
import type { FormField } from '@/shared/types';

import { GoogleFormSelector } from './GoogleFormSelector';

interface GoogleFormConfigFormProps {
  node: NodeQueryData | undefined;
}

const GoogleFormConfigForm = ({ node }: GoogleFormConfigFormProps) => {
  const { setValue } = useFormContext<StepConfigFormValues>();
  const setTypedValue = createTypedSetValue<StepConfigFormValues>(setValue);

  const formField: FormField<StepConfigFormValues> = {
    label: 'Form',
    name: 'configJson.formId',
    render: (field) => (
      <GoogleFormSelector
        integrationAccountId={node?.integrationAccountId ?? ''}
        onFormChange={(form) => {
          setTypedValue('configJson.formName', form.configJson?.formName);
        }}
        onValueChange={field.onChange}
        side="left"
        value={(field.value as string) ?? ''}
      />
    ),
    required: true,
  };

  const fields: FormField<StepConfigFormValues>[] = [formField];

  return <FormGenerator<StepConfigFormValues> fields={fields} />;
};

export { GoogleFormConfigForm };
