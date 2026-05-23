import type { Edge, Node } from '@xyflow/react';
import { ElementType } from 'react';

import { WorkflowProviderApp } from '@/shared/api/base.schemas';
import { WorkflowQuery } from '@/shared/api/workflow/workflow.schemas';
import { IIconProps } from '@/shared/assets/types';

/**
 * Represents a third-party application integration provider.
 * Used in the app-selector dialog and displayed on assigned nodes.
 */
export interface AppProviderSelectOption {
  category: string;
  /** Brand hex color for the icon background chip */
  description: string;
  /** Optional custom icon for the app */
  icon: ElementType<IIconProps>;
  id: WorkflowProviderApp;
  name: string;
}

/**
 * The three sequential steps shown in the step-configuration side panel.
 * Maps to the tab order: Setup → Configure → Test.
 */
export type ConfigStep = 'setup' | 'configure' | 'test';

/**
 * Data payload attached to each WorkflowNode.
 *
 * Must extend `Record<string, unknown>` to satisfy the XYFlow generic constraint.
 *
 * Node card clicks are intentionally NOT handled via a callback here.
 * XYFlow intercepts mousedown on nodes before buttons receive it, so the
 * primary click mechanism is the `onNodeClick` prop on `<ReactFlow>` in the
 * canvas, which fires reliably for every node regardless of pointer-event state.
 */
export type WorkflowQueryData = NonNullable<
  WorkflowQuery['workflow']['currentDraftVersion']
>;

export type NodeQueryData = NonNullable<WorkflowQueryData['nodes']>[number];
export type EdgeQueryData = NonNullable<WorkflowQueryData['edges']>[number];

export interface CanvasNodeData extends NodeQueryData, Record<string, unknown> {
  /**
   * True only for the last node in the workflow.
   * When true, WorkflowNode renders an "Add step" (+) button
   * directly below the card (outside the edge system).
   */
  isLast?: boolean;
  /** 1-based ordinal position in the workflow (shown as "1.", "2.", etc.) */
  stepNumber: number;

  targetNodeIds: string[];
  /** Whether the user has selected an app for this step */
  workflowId: string;
}

/**
 * Data payload attached to each WorkflowEdge.
 *
 * Must extend `Record<string, unknown>` to satisfy the XYFlow generic constraint.
 */
export interface CanvasEdgeData extends EdgeQueryData, Record<string, unknown> {
  workflowId: string;
}

/** XYFlow Node type alias carrying our custom data shape */
export type CanvasNode = Node<CanvasNodeData, 'workflowNode'>;

/** XYFlow Edge type alias carrying our custom data shape */
export type CanvasEdge = Edge<CanvasEdgeData, 'workflowEdge'>;
