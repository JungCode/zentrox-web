'use client';

import { useQuery } from '@apollo/client/react';
import { useEdgesState, useNodesState } from '@xyflow/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { WorkflowDocument } from '@/shared/api/workflow/workflow.schemas';

import { getTargetNodeIds } from '../components/helpers/node';
import { sortWorkflowNodesByEdges } from '../components/helpers/sort';
import { NODE_VERTICAL_GAP } from '../constants';
import type { CanvasEdge, CanvasNode } from '../types/graph';

interface UseWorkflowGraphProps {
  workflowId: string;
}

/**
 * Monotonically increasing counter used to generate unique node IDs.
 * Kept outside the hook so it persists across re-renders without needing a ref.
 */

/**
 * useWorkflowState manages all state for the workflow builder page.
 *
 * Click handling architecture:
 * Nodes no longer receive an `onNodeClick` callback in their data.
 * Instead, WorkflowCanvas wires the `onNodeClick` prop on `<ReactFlow>`
 * and calls `handleNodeClick` exposed from this hook. This is the only
 * reliable mechanism because XYFlow owns the mousedown event on node wrappers.
 *
 * Last-node "+" button:
 * - `lastNodeIdRef` tracks the current last node's ID without creating
 *   stale closures in `appendNode`.
 * - `appendNodeRef` lets node data hold a stable `onAppendStep` reference
 *   that always dispatches to the latest implementation.
 * - `isLast` is kept in sync across all node mutations (insert, append).
 *
 * Edge `onInsertNode` callbacks:
 * - `insertNodeBetweenRef` uses the same pattern for stability.
 */
export const useWorkflowGraph = ({ workflowId }: UseWorkflowGraphProps) => {
  const { data, loading } = useQuery(WorkflowDocument, {
    variables: {
      workflowId,
    },
  });

  // ── React Flow state ───────────────────────────────────────────────────
  const [nodes, setNodes, onNodesChange] = useNodesState<CanvasNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CanvasEdge>([]);

  // ── UI overlay state ───────────────────────────────────────────────────
  const [appSelectorNodeId, setAppSelectorNodeId] = useState<string | null>(
    null,
  );
  const [configPanelNodeId, setConfigPanelNodeId] = useState<string | null>(
    null,
  );
  const [selectedNode, setSelectedNode] = useState<CanvasNode | null>(null);

  // ── Node click handler – exposed to WorkflowCanvas ────────────────────
  const handleNodeClick = useCallback((canvasNode: CanvasNode) => {
    setSelectedNode(canvasNode);

    const { assigned, id } = canvasNode.data;

    if (assigned) {
      setConfigPanelNodeId(id);
    } else {
      setAppSelectorNodeId(id);
    }
  }, []);

  // ── One-time initialization ────────────────────────────────────────────
  useEffect(() => {
    if (loading || !data) return;

    const currentDraftVersion = data?.workflow?.currentDraftVersion;
    const nodesQueryData = currentDraftVersion?.nodes || [];
    const edgesQueryData = currentDraftVersion?.edges || [];

    const sortedNodes = sortWorkflowNodesByEdges(
      nodesQueryData,
      edgesQueryData,
    );

    const initialNodes: CanvasNode[] = sortedNodes.map((node, index) => ({
      data: {
        ...node,
        assigned: !!node.providerApp,
        isLast: index === sortedNodes.length - 1,
        stepNumber: index + 1,
        targetNodeIds: getTargetNodeIds(node.id, edgesQueryData),
        workflowId,
      },
      draggable: false,
      id: node.id,
      position: { x: 0, y: index * NODE_VERTICAL_GAP },
      type: 'workflowNode',
    }));

    const initialEdges: CanvasEdge[] = edgesQueryData.map((edge) => ({
      animated: false,
      id: edge.id,
      source: edge.sourceNodeId,
      target: edge.targetNodeId,
      type: 'workflowEdge',
      workflowId,
    }));

    setNodes(initialNodes);
    setEdges(initialEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  return {
    appSelectorNodeId,
    configPanelNodeId,
    edges,
    // Actions
    handleNodeClick,
    // React Flow
    nodes,
    onEdgesChange,
    onNodesChange,
    // Dialog / panel
    selectedNode,
    setAppSelectorNodeId,
    setConfigPanelNodeId,
  };
};
