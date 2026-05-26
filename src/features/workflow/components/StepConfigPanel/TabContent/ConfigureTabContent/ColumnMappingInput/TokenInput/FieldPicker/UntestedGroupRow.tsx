'use client';

import { ArrowSquareOutIcon, WarningCircleIcon } from '@phosphor-icons/react';

import { Button } from '@/shared/components/ui/button';
import type { AvailableFieldGroup } from '@/shared/types/baseform/token-input.types';

interface UntestedGroupRowProps {
  group: AvailableFieldGroup;
  GroupIcon?: AvailableFieldGroup['icon'];
  /** Called with the group's nodeId; owner navigates the user there. */
  onNavigate: (nodeId: string) => void;
}

/**
 * Single warning row for an upstream node that hasn't been tested yet.
 *
 * No expand caret: there's nothing to insert until the user runs the
 * upstream node's test. Clicking the row dispatches `onNavigate(nodeId)`
 * so the picker owner can jump to that node's config panel. Mirrors
 * Zapier's "set up this step first" UX.
 */
const UntestedGroupRow = ({
  group,
  GroupIcon,
  onNavigate,
}: UntestedGroupRowProps) => (
  <Button
    className="hover:bg-warning/5 h-auto w-full items-start justify-start gap-2 rounded-none px-3 py-2 text-left"
    onClick={() => onNavigate(group.nodeId)}
    type="button"
    variant="ghost"
  >
    <WarningCircleIcon
      className="text-warning mt-0.5 shrink-0"
      size={16}
      weight="fill"
    />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1.5">
        {GroupIcon && (
          <GroupIcon className="text-on-surface-variant shrink-0" size={14} />
        )}
        <span className="text-on-surface truncate text-sm font-medium">
          {group.stepNumber}. {group.nodeLabel}
        </span>
      </div>
      <p className="text-on-surface-variant mt-0.5 text-xs">
        Test this step to use its data here.
      </p>
    </div>
    <ArrowSquareOutIcon
      className="text-on-surface-variant mt-1 shrink-0"
      size={14}
    />
  </Button>
);

export { UntestedGroupRow };
