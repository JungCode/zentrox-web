'use client';

import { useGoogleForms } from '@/features/workflow/hooks';
import type { GoogleFormConfig } from '@/features/workflow/types';
import { BaseSelector } from '@/shared/components/BaseForm';

import { FormOption } from './FormOption';
import { FormSelectorLabel } from './FormSelectorLabel';

interface FormSelectorProps {
  integrationAccountId: string;
  onFormChange?: (form: GoogleFormConfig) => void;
  onValueChange?: (value: string) => void;
  value?: string;
}

const FormSelector = ({
  integrationAccountId,
  onFormChange,
  onValueChange,
  value,
}: FormSelectorProps) => {
  const { forms, loading } = useGoogleForms({ integrationAccountId });

  const options = forms.map((form) => ({
    data: form,
    label: form.name,
    value: form.id,
  }));

  const placeholder = loading ? 'Loading forms…' : 'Select form…';

  return (
    <BaseSelector
      disabled={!integrationAccountId || loading}
      onValueChange={(selectedId) => {
        onValueChange?.(selectedId);

        const selectedForm = forms.find((form) => form.id === selectedId);
        if (!selectedForm) return;

        onFormChange?.({
          configJson: {
            formId: selectedForm.id,
            formName: selectedForm.name,
          },
        });
      }}
      options={options}
      placeholder={placeholder}
      renderLabel={(selectedOption) => {
        return (
          <FormSelectorLabel
            loading={loading}
            placeholder={placeholder}
            selectedOption={selectedOption}
          />
        );
      }}
      renderOption={(option) => <FormOption option={option} />}
      value={value}
    />
  );
};

export { FormSelector };
