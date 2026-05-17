// src/shared/components/BaseForm/baseform.types.ts
import type React from 'react';
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

export interface FormField<TForm extends FieldValues> {
  className?: string;
  description?: string;
  disabled?: boolean;
  hidden?: boolean;
  label?: string;
  name: Path<TForm>;
  render: (
    field: ControllerRenderProps<TForm, Path<TForm>>,
    meta: { disabled: boolean },
  ) => React.ReactNode;
  required?: boolean;
}

export interface FormGeneratorProps<TForm extends FieldValues> {
  className?: string;
  fields: FormField<TForm>[];
}
