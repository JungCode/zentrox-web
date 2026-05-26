'use client';

import { PlusIcon } from '@phosphor-icons/react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getSmoothStepPath,
  getStraightPath,
} from '@xyflow/react';

import { useInsertWorkflowNodeBetween } from '@/features/workflow/hooks';
import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import type { CanvasEdge } from '../../types/graph';

/**
 * CanvasEdge renders a connecting line between two WorkflowNodes.
 *
 * Regular (non-branch) edges:
 *   - drawn as a straight vertical line
 *   - carry a midpoint "+" button to insert a step between source and target
 *
 * Branch edges (sourceHandle = "branch_<id>", driven by a Paths node):
 *   - drawn as a smooth-step path so off-center children look natural
 *   - render the branch's user-facing label near the target node so it never
 *     collides with the source node's "Add branch" chip
 *   - omit the midpoint "+" button — inserting between a Paths node and the
 *     branch's first child would conflate "add to this branch" with
 *     "insert in front of this branch". The branch's own tail "+ append"
 *     button is the unambiguous way to grow a branch.
 */
const WorkflowEdge = ({
  data,
  id,
  source,
  sourceX,
  sourceY,
  target,
  targetX,
  targetY,
}: EdgeProps<CanvasEdge>) => {
  const { insertNode } = useInsertWorkflowNodeBetween({
    sourceNodeId: source,
    targetNodeId: target,
    workflowId: data?.workflowId ?? '',
  });

  const branchLabel = data?.branchLabel ?? null;
  const isBranchEdge = branchLabel !== null;

  // Branch edges step down 90° to connect a center-aligned parent to an
  // off-center child. Regular edges stay straight so unaffected workflows
  // look identical to before.
  const [edgePath, labelX, labelY] = isBranchEdge
    ? getSmoothStepPath({
        borderRadius: 8,
        sourceX,
        sourceY,
        targetX,
        targetY,
      })
    : getStraightPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: 'var(--outline-variant)',
          strokeDasharray: 'none',
          strokeWidth: 2,
        }}
      />

      <EdgeLabelRenderer>
        {isBranchEdge ? (
          // Pin the branch label just above the target node. Anchored at
          // (targetX, targetY) so it tracks the child even when the parent
          // is far away, and stays well clear of the source-side "Add
          // branch" chip that sits ~32px below the paths node card.
          <div
            className={cn(
              'nodrag nopan absolute -translate-x-1/2 -translate-y-full rounded-full border px-2 py-0.5',
              'border-outline-variant bg-surface-container-lowest text-on-surface-variant text-xs font-medium shadow-sm',
            )}
            style={{
              left: targetX,
              pointerEvents: 'none',
              top: targetY - 8,
            }}
          >
            {branchLabel}
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={cn(
                    'nodrag nopan absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2',
                    'border-outline-variant bg-surface-container-lowest text-outline shadow-sm',
                    'hover:border-secondary hover:bg-secondary hover:text-on-secondary hover:scale-110',
                    'hover:shadow-[0_0_0_4px_var(--accent-glow)]',
                  )}
                  onClick={insertNode}
                  size="icon-sm"
                  style={{ left: labelX, pointerEvents: 'all', top: labelY }}
                  variant="ghost"
                >
                  <PlusIcon size={14} strokeWidth={2.5} weight="bold" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Add step</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export { WorkflowEdge };
