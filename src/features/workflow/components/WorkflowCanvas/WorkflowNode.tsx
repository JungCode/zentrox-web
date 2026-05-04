'use client';

import {
  DotsThreeVerticalIcon,
  LightningIcon,
  PlusCircleIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';
import { Handle, type NodeProps, Position } from '@xyflow/react';

import { cn } from '@/lib/ui/utils';

import { ProviderAppMetadataRecord } from '../../constants';
import type { CanvasNode } from '../../types/graph';

/**
 * WorkflowNode renders a single step card in the workflow canvas.
 *
 * **Interaction model:**
 * Clicking the card body is handled by the `onNodeClick` prop on
 * `<ReactFlow>` (in WorkflowCanvas) — NOT by an `onClick` inside this
 * component. This is intentional: XYFlow intercepts `mousedown` on node
 * wrappers before any inner elements receive it, making `onClick` on
 * inner divs/buttons unreliable. The ReactFlow-level handler fires first
 * and consistently.
 *
 * **State A – Unassigned** (`data.assigned === false`):
 * Dashed border, subdued background, "+ Action" placeholder prompt.
 *
 * **State B – Assigned** (`data.assigned === true`):
 * 2-row Zapier-style card:
 *   Row 1 — warning status icon · app pill (emoji + name) · action chip · ⋮ menu
 *   Row 2 — bold "{stepNumber}. {triggerEvent}" title
 *
 * **Last node "+" button** (`data.isLast === true`):
 * Renders a small "Add step" button positioned below the source handle.
 * Uses `nodrag nopan` so XYFlow doesn't intercept the click, and calls
 * `e.stopPropagation()` to prevent the node's own `onNodeClick` from firing.
 */
const WorkflowNode = ({ data }: NodeProps<CanvasNode>) => {
  const { actionKey, assigned, isLast, providerApp, stepNumber, triggerEvent } =
    data;

  const providerAppMetadata = ProviderAppMetadataRecord[providerApp];

  return (
    <div className="relative w-90">
      {/* Invisible target handle at the top edge */}
      <Handle
        className="pointer-events-none! border-none! bg-transparent!"
        position={Position.Top}
        style={{ height: 1, minHeight: 0, minWidth: 0, width: 1 }}
        type="target"
      />

      {assigned ? (
        /* ── State B: Assigned ──────────────────────────────────────── */
        <div
          className={cn(
            'bg-surface-container-lowest cursor-pointer overflow-hidden rounded-md border select-none',
            'border-outline-variant/40 shadow-[0_1px_6px_var(--shadow-color)]',
            'hover:border-secondary/40 transition-all duration-150 hover:shadow-[0_2px_12px_var(--accent-glow)]',
          )}
        >
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
                {<providerAppMetadata.icon className="size-4" />}
              </span>
              <span className="text-xs leading-none font-semibold">
                {providerAppMetadata.name}
              </span>
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

            {/* Three-dot menu — `nodrag nopan` prevents XYFlow from treating
                this as a drag origin; stopPropagation keeps node click from firing */}
            <button
              className="nodrag nopan text-on-surface-variant hover:text-on-surface flex h-6 w-6 cursor-pointer items-center justify-center rounded transition-colors"
              onClick={(e) => e.stopPropagation()}
              type="button"
            >
              <DotsThreeVerticalIcon size={16} weight="bold" />
            </button>
          </div>

          {/* Row 2: event title */}
          <div className="px-3 pb-3">
            <p className="text-on-surface text-sm font-bold">
              {stepNumber}. {actionKey ?? 'No event selected'}
            </p>
          </div>
        </div>
      ) : (
        /* ── State A: Unassigned ────────────────────────────────────── */
        <div
          className={cn(
            'cursor-pointer overflow-hidden rounded-md border border-dashed select-none',
            'border-outline-variant/50 bg-surface-container',
            'hover:border-secondary/60 hover:bg-surface-container-low transition-all duration-150',
          )}
        >
          {/* Row 1: action icon + label */}
          <div className="flex items-center gap-2 px-3 pt-3 pb-1">
            <div className="bg-surface-container-high flex h-6 w-6 items-center justify-center rounded-full">
              <PlusCircleIcon
                className="text-outline"
                size={16}
                weight="fill"
              />
            </div>
            <span className="text-on-surface-variant text-xs font-semibold tracking-wide uppercase">
              Action
            </span>
          </div>

          {/* Row 2: prompt title */}
          <div className="px-3 pb-3">
            <p className="text-on-surface-variant text-sm font-medium">
              {stepNumber}. Select the event for your workflow to run
            </p>
          </div>
        </div>
      )}

      {/* Invisible source handle at the bottom edge */}
      <Handle
        className="pointer-events-none! border-none! bg-transparent!"
        position={Position.Bottom}
        style={{ height: 1, minHeight: 0, minWidth: 0, width: 1 }}
        type="source"
      />

      {/*
       * ── "Add step" button below the last node ──────────────────────
       * Rendered outside the source handle so it sits visually beneath
       * the card, in the empty space after the workflow ends.
       * `nodrag nopan` — XYFlow won't treat this as a drag/pan origin.
       * `stopPropagation` — prevents the parent node's onNodeClick from firing.
       */}
      {isLast && (
        <>
          {/* Connector line from card bottom to plus button */}
          <div
            className="absolute left-1/2 -translate-x-px"
            style={{
              backgroundColor: 'var(--outline-variant)',
              height: 24,
              top: '100%',
              width: 2,
            }}
          />
          {/* Plus button, placed after the line */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: 'calc(100% + 24px)' }}
          >
            <button
              className={cn(
                'nodrag nopan group flex h-7 w-7 cursor-pointer items-center justify-center rounded-full',
                'border-outline-variant bg-surface-container-lowest text-outline border-2 shadow-sm',
                'hover:border-secondary hover:bg-secondary hover:text-on-secondary transition-all duration-150 hover:scale-110',
                'hover:shadow-[0_0_0_4px_var(--accent-glow)]',
                'focus-visible:ring-secondary/50 focus-visible:ring-2 focus-visible:outline-none',
              )}
              onClick={(e) => {
                e.stopPropagation();
                console.log("'Add step' button clicked for node", {
                  stepNumber,
                });
              }}
              title="Add step"
              type="button"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export { WorkflowNode };
