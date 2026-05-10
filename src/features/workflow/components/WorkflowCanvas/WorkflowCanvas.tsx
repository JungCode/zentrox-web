'use client';

import '@xyflow/react/dist/style.css';

import {
  Background,
  BackgroundVariant,
  type EdgeChange,
  type NodeChange,
  type NodeMouseHandler,
  ReactFlow,
} from '@xyflow/react';
import { type EdgeTypes, type NodeTypes } from '@xyflow/react';

import type { CanvasEdge, CanvasNode } from '../../types/graph';
import { WorkflowEdge } from './WorkflowEdge';
import { WorkflowNode } from './WorkflowNode';

/**
 * nodeTypes map — registers WorkflowNode as the renderer for all nodes
 * with `type: 'workflowNode'`. Defined outside the component so the object
 * reference is stable across renders (prevents unnecessary XYFlow re-mounts).
 */
const nodeTypes: NodeTypes = {
  workflowNode: WorkflowNode,
};

/**
 * edgeTypes map — registers WorkflowEdge as the renderer for all edges
 * with `type: 'workflowEdge'`. Defined outside the component for the same reason.
 */
const edgeTypes: EdgeTypes = {
  workflowEdge: WorkflowEdge,
};

interface WorkflowCanvasProps {
  edges: CanvasEdge[];
  nodes: CanvasNode[];
  onEdgesChange: (changes: EdgeChange<CanvasEdge>[]) => void;
  /**
   * Fired when the user clicks a node card.
   * Uses ReactFlow's built-in `onNodeClick` — the only reliable way to
   * intercept node clicks because XYFlow owns the mousedown event on nodes.
   */
  onNodeClick: (node: CanvasNode) => void;
  onNodesChange: (changes: NodeChange<CanvasNode>[]) => void;
}

/**
 * WorkflowCanvas renders the XYFlow canvas for the workflow builder.
 *
 * Design decisions:
 * - `nodeOrigin={[0.5, 0]}` — all nodes are positioned by their top-center
 *   point. Combined with `position.x = 0`, every node is automatically
 *   centred on the vertical axis.
 * - `panOnScrollMode={PanOnScrollMode.Vertical}` + `panOnDrag={false}` —
 *   restricts panning to vertical scroll only, mirroring Zapier's UX.
 * - `nodesDraggable={false}` / `nodesConnectable={false}` — the workflow
 *   topology is managed programmatically; direct manipulation is disabled.
 * - `fitView` — auto-zooms to fit all nodes on initial render.
 * - The `Background` uses a dot pattern tinted with theme tokens via inline style.
 */
const WorkflowCanvas = ({
  edges,
  nodes,
  onEdgesChange,
  onNodeClick,
  onNodesChange,
}: WorkflowCanvasProps) => {
  /**
   * ReactFlow fires this for every node click, before any inner element's
   * onClick runs. Reading `node.data.assigned` here determines which overlay
   * to open without any pointer-event tricks inside the custom node JSX.
   */
  const handleNodeClick: NodeMouseHandler<CanvasNode> = (_event, node) => {
    onNodeClick(node);
  };

  return (
    <div className="bg-background flex-1 overflow-hidden">
      <ReactFlow
        edges={edges}
        edgeTypes={edgeTypes}
        elementsSelectable={false}
        fitView
        fitViewOptions={{ maxZoom: 1, padding: 0.5 }}
        maxZoom={1.5}
        minZoom={0.3}
        nodeOrigin={[0.5, 0]}
        nodes={nodes}
        nodesConnectable={false}
        nodesDraggable={false}
        nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onNodesChange={onNodesChange}
        panOnDrag={false}
        panOnScroll
        proOptions={{ hideAttribution: true }}
        zoomOnScroll={false}
      >
        <Background
          color="var(--outline-variant)"
          gap={24}
          size={1.5}
          variant={BackgroundVariant.Dots}
        />
      </ReactFlow>
    </div>
  );
};

export { WorkflowCanvas };
