'use client';

import {
  DotsThreeVerticalIcon,
  LightningIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';

import { BaseDropdownMenu } from '@/shared/components/BaseDropdownMenu';
import { Button } from '@/shared/components/ui/button';

import { WORKFLOW_NODE_MENU_ITEMS } from '../../../constants';
import type { ProviderAppMetadataType } from '../../../types/providerAppSelector';

interface WorkflowNodeAssignedProps {
  label: string;
  providerAppMetadata: ProviderAppMetadataType;
  stepNumber: number;
}

const WorkflowNodeAssigned = ({
  label,
  providerAppMetadata,
  stepNumber,
}: WorkflowNodeAssignedProps) => {
  const { icon: Icon, name } = providerAppMetadata;

  return (
    <div className="bg-surface-container-lowest border-outline-variant/40 hover:border-secondary/40 cursor-pointer overflow-hidden rounded-md border shadow-[0_1px_6px_var(--shadow-color)] transition-all duration-150 select-none hover:shadow-[0_2px_12px_var(--accent-glow)]">
      {/* Row 1: status · app pill · action chip · menu */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        {/* Status indicator */}
        <WarningCircleIcon
          className="text-warning shrink-0"
          size={18}
          style={{ color: 'var(--color-warning, #f59e0b)' }}
          weight="fill"
        />

        {/* App pill */}
        <div className="flex items-center gap-1.5 rounded border px-1.5 py-0.5">
          <span className="flex text-sm leading-none">
            <Icon className="size-4" />
          </span>
          <span className="text-xs leading-none font-semibold">{name}</span>
        </div>

        {/* Action / trigger chip */}
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30">
          <LightningIcon
            className="text-yellow-600 dark:text-yellow-400"
            size={12}
            weight="fill"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Three-dot menu */}
        <BaseDropdownMenu
          align="start"
          items={WORKFLOW_NODE_MENU_ITEMS}
          side="right"
          trigger={
            <Button
              className="nodrag nopan"
              onClick={(e) => e.stopPropagation()}
              size="icon-xs"
              variant="ghost"
            >
              <DotsThreeVerticalIcon size={14} weight="bold" />
            </Button>
          }
        />
      </div>

      {/* Row 2: event title */}
      <div className="px-3 pb-3">
        <p className="text-on-surface text-sm font-bold">{`${stepNumber}. ${label}`}</p>
      </div>
    </div>
  );
};

export { WorkflowNodeAssigned };
