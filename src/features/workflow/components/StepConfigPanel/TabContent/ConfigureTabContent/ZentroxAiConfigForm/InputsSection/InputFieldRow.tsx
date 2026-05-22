'use client';

import { XIcon } from '@phosphor-icons/react';

import type {
  NodeQueryData,
  ZentroxAiInputField,
} from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

import { TokenInput } from '../../ColumnMappingInput/TokenInput';

interface InputFieldRowProps {
  field: ZentroxAiInputField;
  node: NodeQueryData;
  onChange: (id: string, patch: Partial<ZentroxAiInputField>) => void;
  onRemove: (id: string) => void;
}

const InputFieldRow = ({
  field,
  node,
  onChange,
  onRemove,
}: InputFieldRowProps) => {
  return (
    <div className="flex gap-2">
      <Input
        className="h-9.5 w-1/4 min-w-0"
        onChange={(e) => onChange(field.id, { name: e.target.value })}
        placeholder="Name"
        value={field.name}
      />
      <div className="min-w-0 flex-1">
        <TokenInput
          nodeId={node.id}
          onChange={(value, variableMeta) =>
            onChange(field.id, { value, variableMeta })
          }
          placeholder="Enter or insert ..."
          value={field.value}
          variableMeta={field.variableMeta}
          workflowVersionId={node.workflowVersionId}
        />
      </div>
      <Button
        aria-label="Remove input"
        className="text-on-surface-variant h-9.5 w-5 shrink-0"
        onClick={() => onRemove(field.id)}
        size="icon"
        variant="outline"
      >
        <XIcon size={4} />
      </Button>
    </div>
  );
};

export { InputFieldRow };
