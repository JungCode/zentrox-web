'use client';

import { PlusIcon } from '@phosphor-icons/react';

import type {
  NodeQueryData,
  ZentroxAiInputField,
} from '@/features/workflow/types';
import { FormItem } from '@/shared/components/BaseForm';
import { Button } from '@/shared/components/ui/button';

import { InputFieldRow } from './InputFieldRow';

interface InputsSectionProps {
  inputs: ZentroxAiInputField[];
  node: NodeQueryData;
  onAdd: () => void;
  onChange: (id: string, patch: Partial<ZentroxAiInputField>) => void;
  onRemove: (id: string) => void;
}

const InputsSection = ({
  inputs,
  node,
  onAdd,
  onChange,
  onRemove,
}: InputsSectionProps) => {
  return (
    <FormItem
      label="Inputs"
      legend="Declare named inputs that this step expects from upstream nodes. Each input can be mapped to a variable on the next configure pass."
    >
      <div className="space-y-2">
        {inputs.length > 0 && (
          <div className="space-y-2">
            {inputs.map((field) => (
              <InputFieldRow
                field={field}
                key={field.id}
                node={node}
                onChange={onChange}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
        <Button className="w-full" onClick={onAdd} size="sm" variant="outline">
          <PlusIcon data-icon="inline-start" size={14} />
          Add input
        </Button>
      </div>
    </FormItem>
  );
};

export { InputsSection };
