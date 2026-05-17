'use client';

import { useGoogleForms } from '@/features/workflow/hooks';
import type {
  ConfigFormValues,
  GoogleFormConfig,
} from '@/features/workflow/types';
import { BaseSelector } from '@/shared/components/BaseForm';

import { GoogleFormOption } from './GoogleFormOption';
import { GoogleFormSelectorLabel } from './GoogleFormSelectorLabel';

interface GoogleFormSelectorProps {
  integrationAccountId: string;
  onFormChange?: (form: ConfigFormValues<GoogleFormConfig>) => void;
  onValueChange?: (value: string) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  value?: string;
}

const GoogleFormSelector = ({
  integrationAccountId,
  onFormChange,
  onValueChange,
  side,
  value,
}: GoogleFormSelectorProps) => {
  const { forms, loading } = useGoogleForms({ integrationAccountId });

  const options = forms.map((form) => ({
    data: form,
    label: form.name,
    value: form.id,
  }));

  const placeholder = loading ? 'Loading forms…' : 'Select form…';

  return (
    <BaseSelector
      algin="start"
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
          <GoogleFormSelectorLabel
            loading={loading}
            placeholder={placeholder}
            selectedOption={selectedOption}
          />
        );
      }}
      renderOption={(option) => <GoogleFormOption option={option} />}
      side={side}
      value={value}
    />
  );
};

export { GoogleFormSelector };
