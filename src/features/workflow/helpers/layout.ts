import {
  NODE_HORIZONTAL_GAP,
  NODE_VERTICAL_GAP,
  NODE_WIDTH,
} from '../constants/graph';
import type { EdgeQueryData, NodeQueryData } from '../types/graph';

export interface PositionedNode {
  /** Topological depth from the workflow root. */
  depth: number;
  node: NodeQueryData;
  /** Canvas coordinates — `nodeOrigin={[0.5, 0]}` makes x the top-center. */
  position: { x: number; y: number };
  /** 1-based pre-order rank — drives the "1.", "2." stepNumber label. */
  stepNumber: number;
}

export interface LayoutResult {
  /** Helper for the canvas: which nodes have no outgoing edges (leaves). */
  leafNodeIds: Set<string>;
  positioned: PositionedNode[];
}

type Edge = Pick<EdgeQueryData, 'sourceNodeId' | 'targetNodeId'>;

/**
 * Tree layout for the workflow canvas.
 *
 * Linear (single-child) flows degenerate to the legacy "stacked column"
 * layout — every node sits at x=0 down a single line — preserving the
 * appearance of existing non-paths workflows.
 *
 * For trees (Paths nodes with N branches), each subtree is measured by
 * counting its leaves; siblings are then placed side-by-side and centred
 * around their parent so the visual stays balanced.
 *
 * Algorithm:
 *   1. Identify the root (node with no incoming edges).
 *   2. Build a children map preserving the order of edges encountered.
 *   3. Recurse: subtreeWidth(node) = sum(subtreeWidth(child)) || 1.
 *   4. Recurse again: assign x by walking the subtree, allocating width
 *      to each child proportional to subtreeWidth(child).
 *   5. y is depth × NODE_VERTICAL_GAP.
 *
 * Cycle / unreachable safety: nodes never visited by the BFS are pinned in
 * a column to the right of the placed tree so they remain inspectable
 * rather than vanishing from the canvas.
 */
export function computeWorkflowLayout(
  nodes: NodeQueryData[],
  edges: Edge[],
): LayoutResult {
  if (nodes.length === 0) {
    return { leafNodeIds: new Set(), positioned: [] };
  }

  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const childrenOf = new Map<string, string[]>();
  const parentsOf = new Map<string, string[]>();

  for (const edge of edges) {
    if (!nodeById.has(edge.sourceNodeId) || !nodeById.has(edge.targetNodeId)) {
      continue;
    }
    const kids = childrenOf.get(edge.sourceNodeId) ?? [];
    kids.push(edge.targetNodeId);
    childrenOf.set(edge.sourceNodeId, kids);

    const ps = parentsOf.get(edge.targetNodeId) ?? [];
    ps.push(edge.sourceNodeId);
    parentsOf.set(edge.targetNodeId, ps);
  }

  // 1. Find the root — preferring an explicit trigger when present so the
  //    layout is stable even if edge order ever lies.
  const roots = nodes.filter((n) => (parentsOf.get(n.id) ?? []).length === 0);
  const root =
    roots.find((n) => n.nodeType === 'TRIGGER') ?? roots[0] ?? nodes[0];

  // 2. Measure subtree widths (in "node-slots") with a memoised DFS.
  //    Slot count for a leaf is 1; for an internal node it's the sum of
  //    its children's slots — so a node with 3 leaf branches reserves 3
  //    slots' worth of horizontal space.
  const widthCache = new Map<string, number>();
  const visiting = new Set<string>();
  const subtreeWidth = (nodeId: string): number => {
    if (widthCache.has(nodeId)) return widthCache.get(nodeId)!;
    if (visiting.has(nodeId)) return 1; // cycle guard
    visiting.add(nodeId);
    const kids = childrenOf.get(nodeId) ?? [];
    const w =
      kids.length === 0
        ? 1
        : kids.reduce((acc, kid) => acc + subtreeWidth(kid), 0);
    visiting.delete(nodeId);
    widthCache.set(nodeId, w);
    return w;
  };

  const slotWidth = NODE_WIDTH + NODE_HORIZONTAL_GAP;

  // 3. Walk the tree in pre-order to assign positions + step numbers. We
  //    pass each call the centre x at which this node should be placed.
  const positioned: PositionedNode[] = [];
  const visited = new Set<string>();
  let stepCounter = 0;

  const place = (nodeId: string, depth: number, centerX: number): void => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    stepCounter += 1;

    const node = nodeById.get(nodeId);
    if (!node) return;

    positioned.push({
      depth,
      node,
      position: { x: centerX, y: depth * NODE_VERTICAL_GAP },
      stepNumber: stepCounter,
    });

    const kids = childrenOf.get(nodeId) ?? [];
    if (kids.length === 0) return;

    // Allocate horizontal range to each child proportional to its slot count.
    const totalSlots = kids.reduce((acc, kid) => acc + subtreeWidth(kid), 0);
    const totalSpan = totalSlots * slotWidth;
    let cursor = centerX - totalSpan / 2;

    for (const kidId of kids) {
      const kidSlots = subtreeWidth(kidId);
      const kidSpan = kidSlots * slotWidth;
      const kidCenter = cursor + kidSpan / 2;
      place(kidId, depth + 1, kidCenter);
      cursor += kidSpan;
    }
  };

  place(root.id, 0, 0);

  // 4. Cycle / unreachable fallback — orphan nodes get pinned in a side
  //    column so they're not lost. Should never trigger for a healthy graph.
  if (visited.size < nodes.length) {
    const orphans = nodes.filter((n) => !visited.has(n.id));
    const orphanColumnX =
      Math.max(...positioned.map((p) => p.position.x), 0) + slotWidth;
    orphans.forEach((node, index) => {
      stepCounter += 1;
      positioned.push({
        depth: index,
        node,
        position: { x: orphanColumnX, y: index * NODE_VERTICAL_GAP },
        stepNumber: stepCounter,
      });
    });
  }

  // 5. Leaf set — drives the "+ append" button at the bottom of each path.
  const leafNodeIds = new Set<string>();
  for (const node of nodes) {
    if ((childrenOf.get(node.id) ?? []).length === 0) {
      leafNodeIds.add(node.id);
    }
  }

  return { leafNodeIds, positioned };
}
