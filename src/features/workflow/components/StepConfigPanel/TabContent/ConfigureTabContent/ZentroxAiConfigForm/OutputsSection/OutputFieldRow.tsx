'use client';

import { PencilSimpleIcon, XIcon } from '@phosphor-icons/react';

import { ZENTROX_AI_OUTPUT_TYPES } from '@/features/workflow/constants';
import type { ZentroxAiOutputField } from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';

import { OutputFieldPopover } from './OutputFieldPopover';

interface OutputFieldRowProps {
  field: ZentroxAiOutputField;
  onChange: (id: string, patch: Partial<ZentroxAiOutputField>) => void;
  onRemove: (id: string) => void;
}

const OutputFieldRow = ({ field, onChange, onRemove }: OutputFieldRowProps) => {
  const TypeIcon =
    ZENTROX_AI_OUTPUT_TYPES.find((t) => t.value === field.type)?.Icon ??
    ZENTROX_AI_OUTPUT_TYPES[0].Icon;

  return (
    <div className="flex gap-2">
      <OutputFieldPopover
        field={field}
        onDelete={() => onRemove(field.id)}
        onSave={(patch) => onChange(field.id, patch)}
        trigger={
          <Button
            className="text-foreground h-9.5 min-w-0 flex-1 justify-start gap-2 px-3 font-normal"
            type="button"
            variant="outline"
          >
            <TypeIcon className="text-on-surface-variant shrink-0" size={16} />
            <span className="min-w-0 flex-1 truncate text-left text-sm">
              {field.name || (
                <span className="text-placeholder">Untitled field</span>
              )}
            </span>
            <PencilSimpleIcon
              className="text-on-surface-variant shrink-0"
              size={14}
            />
          </Button>
        }
      />
      <Button
        aria-label="Remove output"
        className="text-on-surface-variant h-9.5 w-5 shrink-0"
        onClick={() => onRemove(field.id)}
        size="icon"
        type="button"
        variant="outline"
      >
        <XIcon size={4} />
      </Button>
    </div>
  );
};

export { OutputFieldRow };
