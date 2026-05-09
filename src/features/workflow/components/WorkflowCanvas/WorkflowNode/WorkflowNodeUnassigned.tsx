'use client';

import { PlusCircleIcon } from '@phosphor-icons/react';

interface WorkflowNodeUnassignedProps {
  label: string;
  stepNumber: number;
}

const WorkflowNodeUnassigned = ({
  label,
  stepNumber,
}: WorkflowNodeUnassignedProps) => {
  return (
    <div className="border-outline-variant/50 bg-surface-container hover:border-secondary/60 hover:bg-surface-container-low h-20 cursor-pointer overflow-hidden rounded-md border border-dashed transition-all duration-150 select-none">
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
