'use client';

import { PlusCircleIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/ui/utils';

interface WorkflowNodeUnassignedProps {
  isSelected: boolean;
  label: string;
  stepNumber: number;
}

const WorkflowNodeUnassigned = ({
  isSelected,
  label,
  stepNumber,
}: WorkflowNodeUnassignedProps) => {
  return (
    <div
      className={cn(
        'h-20 cursor-pointer overflow-hidden rounded-md border border-dashed transition-all duration-150 select-none',
        {
          'border-outline-variant/50 bg-surface-container hover:border-secondary/60 hover:bg-surface-container-low':
            !isSelected,
          'border-secondary bg-surface-container-low shadow-[0_0_0_3px_var(--accent-glow)]':
            isSelected,
        },
      )}
    >
      {/* Row 1: action icon + label */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-1">
        <div className="bg-surface-container-high flex h-6 w-6 items-center justify-center rounded-full">
          <PlusCircleIcon className="text-outline" size={16} weight="fill" />
        </div>
        <span className="text-on-surface-variant text-xs font-semibold tracking-wide uppercase">
          Action
        </span>
      </div>

      {/* Row 2: prompt title */}
      <div className="px-3 pb-3">
        <p className="text-on-surface-variant text-sm font-medium">{`${stepNumber}. ${label}`}</p>
      </div>
    </div>
  );
};

export { WorkflowNodeUnassigned };
