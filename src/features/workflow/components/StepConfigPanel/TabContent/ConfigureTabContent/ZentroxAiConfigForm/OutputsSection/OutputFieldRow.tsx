'use client';

import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';

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
    <div className="bg-surface-container-low hover:bg-surface-container flex items-center gap-1 rounded-xs pr-1 transition-colors">
      <OutputFieldPopover
        field={field}
        onDelete={() => onRemove(field.id)}
        onSave={(patch) => onChange(field.id, patch)}
        trigger={
          <Button
            className="text-foreground hover:text-foreground h-auto min-w-0 flex-1 justify-start gap-2 rounded-xs bg-transparent px-2.5 py-1.5 font-normal hover:bg-transparent"
            type="button"
            variant="ghost"
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
        aria-label="Delete output"
        className="text-destructive hover:text-destructive shrink-0"
        onClick={() => onRemove(field.id)}
        size="icon-xs"
        type="button"
        variant="ghost"
      >
        <TrashIcon size={14} />
      </Button>
    </div>
  );
};

export { OutputFieldRow };
