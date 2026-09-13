'use client';

import { PencilSimpleIcon, XIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { LABEL_FORM_FALLBACKS } from '@/features/workflow/constants/formFallback';
import { useUpdateWorkflowNode } from '@/features/workflow/hooks/useUpdateWorkflowNode';
import type { LabelFormValues } from '@/features/workflow/types';
import type { NodeQueryData } from '@/features/workflow/types/graph';
import type { ProviderAppMetadataType } from '@/features/workflow/types/providerAppSelector';
import { Button } from '@/shared/components/ui/button';
import { getDefaultValues } from '@/shared/utils';

import { LabelInput } from './LabelInput';

interface StepConfigPanelHeaderProps {
  node: NodeQueryData | undefined;
  nodeIndex: number | undefined;
  onClose: () => void;
  providerAppMetadata: ProviderAppMetadataType | undefined;
  workflowId: string;
}

const StepConfigPanelHeader = ({
  node,
  nodeIndex,
  onClose,
  providerAppMetadata,
  workflowId,
}: StepConfigPanelHeaderProps) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { updateNode } = useUpdateWorkflowNode({ node, workflowId });

  const { getValues, handleSubmit, register, reset } = useForm<LabelFormValues>(
    {
      defaultValues: getDefaultValues(node, LABEL_FORM_FALLBACKS),
    },
  );

  // Only reset when switching to a different node — not on every server refetch
  useEffect(() => {
    reset(getDefaultValues(node, LABEL_FORM_FALLBACKS));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.id]);

  const startEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const onSubmit = handleSubmit(async ({ label }) => {
    setEditing(false);
    const trimmed = label.trim();
    if (!trimmed || !node?.id) return;
    if (trimmed === node.label) return;
    await updateNode({ label: trimmed });
  });

  const handleBlur = async () => {
    await onSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') inputRef.current?.blur();
    if (e.key === 'Escape') {
      reset({ label: node?.label ?? '' });
      setEditing(false);
    }
  };

  const displayLabel = getValues('label');

  return (
    <div className="border-border/60 flex items-center gap-3 border-b px-4 py-3">
      {providerAppMetadata && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base shadow-sm">
          {<providerAppMetadata.icon />}
        </span>
      )}
      <div className="group min-w-0 flex-1">
        {editing ? (
          <LabelInput
            inputRef={inputRef}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            registration={register('label')}
          />
        ) : (
          <Button
            className="h-auto w-full justify-start gap-1 px-0 py-0 font-semibold"
            onClick={startEditing}
            type="button"
            variant="ghost"
          >
            <span className="text-on-surface truncate text-sm font-semibold">
              {nodeIndex}. {displayLabel || 'Step'}
            </span>
            <PencilSimpleIcon
              className="text-on-surface-variant ml-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              size={12}
            />
          </Button>
        )}
      </div>
      <Button
        className="shrink-0"
        onClick={onClose}
        size="icon-sm"
        variant="ghost"
      >
        <XIcon size={14} />
      </Button>
    </div>
  );
};

export { StepConfigPanelHeader };
