// src/shared/components/BaseForm/FormGenerator.tsx
'use client';

import { Controller, type FieldValues, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/ui/utils';
import type { FormGeneratorProps } from '@/shared/types';

import { FormItem } from './FormItem';

const FormGenerator = <TForm extends FieldValues>({
  className,
  fields,
}: FormGeneratorProps<TForm>) => {
  const { control } = useFormContext<TForm>();

  return (
    <div className={cn('space-y-4', className)}>
      {fields.map((field) => (
        <Controller
          control={control}
          key={String(field.name)}
          name={field.name}
          render={({ field: controllerField }) => {
            const rendered = field.render(controllerField, {
              disabled: field.disabled ?? false,
            });

            if (field.hidden) return <>{rendered}</>;

            return (
              <FormItem
                className={field.className}
                label={field.label ?? ''}
                required={field.required}
              >
                {rendered}
                {field.description && (
                  <p className="text-muted-foreground text-xs">
                    {field.description}
                  </p>
                )}
              </FormItem>
            );
          }}
        />
      ))}
    </div>
  );
};

export { FormGenerator };
