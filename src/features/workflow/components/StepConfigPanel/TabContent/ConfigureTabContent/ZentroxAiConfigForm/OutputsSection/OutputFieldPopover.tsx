'use client';

import { useState } from 'react';

import {
  ZENTROX_AI_OUTPUT_TYPES,
  type ZentroxAiOutputType,
} from '@/features/workflow/constants';
import type { ZentroxAiOutputField } from '@/features/workflow/types';
import { BaseSelector, FormItem } from '@/shared/components/BaseForm';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';

type OutputDraft = Omit<ZentroxAiOutputField, 'id'>;

const EMPTY_DRAFT: OutputDraft = {
  description: '',
  name: '',
  required: false,
  type: 'text',
};

const OUTPUT_TYPE_OPTIONS = ZENTROX_AI_OUTPUT_TYPES.map((opt) => ({
  label: opt.label,
  value: opt.value,
}));

const getTypeIcon = (value: ZentroxAiOutputType) =>
  ZENTROX_AI_OUTPUT_TYPES.find((t) => t.value === value)?.Icon ??
  ZENTROX_AI_OUTPUT_TYPES[0].Icon;

interface OutputFieldPopoverProps {
  field?: ZentroxAiOutputField;
  onDelete?: () => void;
  onSave: (draft: OutputDraft) => void;
  trigger: React.ReactNode;
}

const OutputFieldPopover = ({
  field,
  onDelete,
  onSave,
  trigger,
}: OutputFieldPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<OutputDraft>(field ?? EMPTY_DRAFT);

  const handleOpenChange = (next: boolean) => {
    if (next) setDraft(field ?? EMPTY_DRAFT);
    setOpen(next);
  };

  const handleSave = () => {
    onSave(draft);
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete?.();
    setOpen(false);
  };

  return (
    <Popover onOpenChange={handleOpenChange} open={open}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="start" className="w-80 gap-3 p-3" side="left">
        <FormItem
          label="Field name"
          legend="Name used to reference this output downstream."
          required
        >
          <Input
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            placeholder="e.g. summary"
            value={draft.name}
          />
        </FormItem>

        <FormItem
          label="Field type"
          legend="Shape the model should return for this field."
          required
        >
          <BaseSelector
            onValueChange={(value) =>
              setDraft((d) => ({ ...d, type: value as ZentroxAiOutputType }))
            }
            options={OUTPUT_TYPE_OPTIONS}
            renderLabel={(selected) => {
              if (!selected) return null;
              const Icon = getTypeIcon(selected.value as ZentroxAiOutputType);
              return (
                <span className="flex items-center gap-2">
                  <Icon size={14} />
                  {selected.label}
                </span>
              );
            }}
            renderOption={(opt) => {
              const Icon = getTypeIcon(opt.value as ZentroxAiOutputType);
              return (
                <span className="flex items-center gap-2">
                  <Icon size={14} />
                  {opt.label}
                </span>
              );
            }}
            side="left"
            value={draft.type}
          />
        </FormItem>

        <FormItem
          label="Field description"
          legend="Tell the model what to return for this field."
        >
          <Input
            onChange={(e) =>
              setDraft((d) => ({ ...d, description: e.target.value }))
            }
            placeholder="Describe what the model should return…"
            value={draft.description}
          />
        </FormItem>

        <label className="flex cursor-pointer items-center justify-between text-sm">
          <span>
            Is this output field required?
            <span className="text-destructive ml-0.5">*</span>
          </span>
          <Checkbox
            checked={draft.required}
            onCheckedChange={(checked) =>
              setDraft((d) => ({ ...d, required: checked === true }))
            }
          />
        </label>

        <div className="flex items-center justify-between gap-2 pt-1">
          {field ? (
            <Button
              className="text-destructive hover:text-destructive"
              onClick={handleDelete}
              size="sm"
              type="button"
              variant="ghost"
            >
              Delete field
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => setOpen(false)}
              size="sm"
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={!draft.name.trim()}
              onClick={handleSave}
              size="sm"
              type="button"
            >
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { OutputFieldPopover };
