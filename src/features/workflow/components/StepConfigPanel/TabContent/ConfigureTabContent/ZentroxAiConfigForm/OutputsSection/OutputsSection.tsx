'use client';

import { PlusIcon } from '@phosphor-icons/react';

import type { ZentroxAiOutputField } from '@/features/workflow/types';
import { FormItem } from '@/shared/components/BaseForm';
import { Button } from '@/shared/components/ui/button';

import { OutputFieldPopover } from './OutputFieldPopover';
import { OutputFieldRow } from './OutputFieldRow';

interface OutputsSectionProps {
  onAdd: (draft: Omit<ZentroxAiOutputField, 'id'>) => void;
  onChange: (id: string, patch: Partial<ZentroxAiOutputField>) => void;
  onRemove: (id: string) => void;
  outputs: ZentroxAiOutputField[];
}

const OutputsSection = ({
  onAdd,
  onChange,
  onRemove,
  outputs,
}: OutputsSectionProps) => {
  return (
    <FormItem
      label="Output fields"
      legend="Declare structured outputs. Each output has a name, type, and short description that the model uses to format its response."
    >
      <div className="space-y-2">
        {outputs.length > 0 && (
          <div className="space-y-2">
            {outputs.map((field) => (
              <OutputFieldRow
                field={field}
                key={field.id}
                onChange={onChange}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
        <OutputFieldPopover
          onSave={onAdd}
          trigger={
            <Button
              className="w-full"
              size="sm"
              type="button"
              variant="outline"
            >
              <PlusIcon data-icon="inline-start" size={14} />
              Add field
            </Button>
          }
        />
      </div>
    </FormItem>
  );
};

export { OutputsSection };
