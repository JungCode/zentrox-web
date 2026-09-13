type WorkflowEdge = {
  sourceNodeId: string;
  targetNodeId: string;
};

type WorkflowNodeBase = {
  id: string;
};

/**
 * Sorts workflow nodes based on their connections defined by edges.
 *
 * This function implements a topological sort (Kahn's algorithm) to order
 * the nodes in a way that respects their dependencies. Nodes with no incoming
 * edges are placed first, followed by nodes that depend on them, and so on.
 *
 * If the graph has cycles or invalid structure, the function returns the original
 * node order to avoid breaking the UI.
 *
 * @param nodes - The list of workflow nodes to be sorted. Each node must have a unique `id` property.
 * @param edges - The list of edges defining connections between nodes. Each edge should have `sourceNodeId` and `targetNodeId` properties referencing node ids.
 * @returns A new array of nodes sorted according to their dependencies, or the original array if sorting is not possible.
 */

export const sortWorkflowNodesByEdges = <T extends WorkflowNodeBase>(
  nodes: T[],
  edges: WorkflowEdge[],
): T[] => {
  // Create a quick lookup map so we can get a node by its id.
  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  // inDegree stores how many incoming edges each node has.
  // Example: if A -> B, then B has an inDegree of 1.
  const inDegree = new Map<string, number>();

  // outgoing stores which nodes each node points to.
  // Example: if A -> B and A -> C, outgoing.get("A") will be ["B", "C"].
  const outgoing = new Map<string, string[]>();

  // Initialize every node with:
  // - 0 incoming edges
  // - an empty list of outgoing edges
  nodes.forEach((node) => {
    inDegree.set(node.id, 0);
    outgoing.set(node.id, []);
  });

  // Build the graph information from the edges.
  edges.forEach((edge) => {
    // Ignore edges that reference missing nodes.
    // This prevents broken edge data from causing incorrect sorting.
    if (!nodeById.has(edge.sourceNodeId) || !nodeById.has(edge.targetNodeId)) {
      return;
    }

    // Record that sourceNodeId points to targetNodeId.
    outgoing.get(edge.sourceNodeId)?.push(edge.targetNodeId);

    // Since targetNodeId has one more incoming edge, increase its inDegree.
    inDegree.set(edge.targetNodeId, (inDegree.get(edge.targetNodeId) ?? 0) + 1);
  });

  // Start with nodes that have no incoming edges.
  // These are the first steps in the workflow.
  const queue = nodes.filter((node) => inDegree.get(node.id) === 0);

  // This will contain the nodes in sorted workflow order.
  const sorted: T[] = [];

  // Process nodes from start to end.
  while (queue.length > 0) {
    const node = queue.shift()!;

    // Add the current node to the sorted result.
    sorted.push(node);

    // Visit every node that comes after the current node.
    for (const targetId of outgoing.get(node.id) ?? []) {
      // We have now processed one incoming edge for the target node,
      // so reduce its inDegree by 1.
      inDegree.set(targetId, (inDegree.get(targetId) ?? 0) - 1);

      // When a node has no remaining incoming edges,
      // it means all previous steps have already been processed,
      // so it is ready to be added to the queue.
      if (inDegree.get(targetId) === 0) {
        const targetNode = nodeById.get(targetId);
        if (targetNode) queue.push(targetNode);
      }
    }
  }

  // If all nodes were sorted, return the sorted list.
  // If not, the graph probably has a cycle or invalid structure,
  // so fallback to the original node order to avoid breaking the UI.
  return sorted.length === nodes.length ? sorted : nodes;
};
