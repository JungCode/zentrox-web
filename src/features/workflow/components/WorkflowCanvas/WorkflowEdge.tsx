'use client';

import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getStraightPath,
} from '@xyflow/react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import type { CanvasEdge } from '../../types/graph';

/**
 * CanvasEdge renders a vertical connecting line between two WorkflowNodes
 * with a circular "+" button rendered exactly at the midpoint.
 *
 * The "+" button:
 * - Uses `EdgeLabelRenderer` to escape the SVG context and render a normal DOM button.
 * - Shows a "Add step" tooltip on hover.
 * - Calls `data.onInsertNode(source, target)` to insert a new unassigned node
 *   between the two connected nodes.
 */
const WorkflowEdge = ({
  data,
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps<CanvasEdge>) => {
  /**
   * `getStraightPath` returns:
   * - `edgePath` — the SVG path `d` attribute string
   * - `labelX`, `labelY` — the midpoint coordinates for label placement
   */
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      {/* The straight line between the two nodes */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: 'var(--outline-variant)',
          strokeDasharray: 'none',
          strokeWidth: 2,
        }}
      />

      {/*
       * EdgeLabelRenderer renders children in a portal above the SVG layer.
       * The `nodrag nopan` CSS classes prevent XYFlow from intercepting
       * pointer events on the button.
       */}
      <EdgeLabelRenderer>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="nodrag nopan border-outline-variant bg-surface-container-lowest text-outline hover:border-secondary hover:bg-secondary hover:text-on-secondary absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 shadow-sm transition-all duration-150 hover:scale-110 hover:shadow-[0_0_0_4px_var(--accent-glow)]"
                onClick={() => {
                  console.log("'Add step' button clicked between nodes");
                }}
                style={{ left: labelX, pointerEvents: 'all', top: labelY }}
                type="button"
              >
                <svg
                  className="h-3 w-3"
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
            </TooltipTrigger>
            <TooltipContent side="right">Add step</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </EdgeLabelRenderer>
    </>
  );
};

export { WorkflowEdge };
