'use client';

import { useQuery } from '@apollo/client/react';
import { useEdgesState, useNodesState } from '@xyflow/react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { WorkflowDocument } from '@/shared/api/workflow/workflow.schemas';

import { computeWorkflowLayout } from '../helpers/layout';
import { getTargetNodeIds } from '../helpers/node';
import { resolveEdgeBranchLabel } from '../helpers/nodeConfig/pathsBranch';
import { sortWorkflowNodesByEdges } from '../helpers/sort';
import type { CanvasEdge, CanvasNode } from '../types/graph';
import { useWorkflowStore } from './useWorkflowStore';

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

  const {
    closeConfigPanel,
    isConfigPanelOpen,
    openAppSelectorDialog,
    openConfigPanel,
    selectedNode,
    setNodeChain,
    setSelectedNode,
  } = useWorkflowStore(
    useShallow((state) => ({
      closeConfigPanel: state.closeConfigPanel,
      isConfigPanelOpen: state.isConfigPanelOpen,
      openAppSelectorDialog: state.openAppSelectorDialog,
      openConfigPanel: state.openConfigPanel,
      selectedNode: state.selectedNode,
      setNodeChain: state.setNodeChain,
      setSelectedNode: state.setSelectedNode,
    })),
  );

  // ── React Flow state ───────────────────────────────────────────────────
  const [nodes, setNodes, onNodesChange] = useNodesState<CanvasNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CanvasEdge>([]);

  // ── Node click handler – exposed to WorkflowCanvas ────────────────────
  const handleNodeClick = (canvasNode: CanvasNode) => {
    const { data } = canvasNode;
    const { assigned } = data;

    setSelectedNode(data);

    if (assigned) {
      openConfigPanel();
    } else {
      openAppSelectorDialog();
    }
  };

  // ── One-time initialization ────────────────────────────────────────────
  useEffect(() => {
    if (loading || !data) return;

    const currentDraftVersion = data?.workflow?.currentDraftVersion;
    const nodesQueryData = currentDraftVersion?.nodes || [];
    const edgesQueryData = currentDraftVersion?.edges || [];

    // Linear topological order — kept for the sidebar/breadcrumb so the
    // "1. → 2. → 3." flow still makes sense even for tree-shaped graphs.
    // The on-canvas layout is computed separately so siblings can fan out.
    const sortedNodes = sortWorkflowNodesByEdges(
      nodesQueryData,
      edgesQueryData,
    );

    const { leafNodeIds, positioned } = computeWorkflowLayout(
      nodesQueryData,
      edgesQueryData,
    );

    const initialNodes: CanvasNode[] = positioned.map(
      ({ node, position, stepNumber }) => ({
        data: {
          ...node,
          assigned: !!node.providerApp,
          // Leaf nodes get the "+ append" button. With tree layouts there are
          // now multiple leaves (one per branch tail), so this is a Set check
          // rather than "last index in the linear list".
          isLast: leafNodeIds.has(node.id),
          stepNumber,
          targetNodeIds: getTargetNodeIds(node.id, edgesQueryData),
          workflowId,
        },
        draggable: false,
        id: node.id,
        position,
        type: 'workflowNode',
      }),
    );

    const initialEdges: CanvasEdge[] = edgesQueryData.map((edge) => ({
      animated: false,
      data: {
        ...edge,
        branchLabel: resolveEdgeBranchLabel(edge, nodesQueryData),
        workflowId,
      },
      id: edge.id,
      source: edge.sourceNodeId,
      target: edge.targetNodeId,
      type: 'workflowEdge',
    }));

    setNodes(initialNodes);
    setNodeChain(sortedNodes);
    setEdges(initialEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  return {
    closeConfigPanel,
    // React Flow state
    edges,
    handleNodeClick,
    // Dialog / panel
    isConfigPanelOpen,
    nodes,
    onEdgesChange,
    onNodesChange,
    openConfigPanel,
    selectedNode,
    setSelectedNode,
  };
};
