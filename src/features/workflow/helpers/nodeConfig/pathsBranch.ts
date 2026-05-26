import { BRANCH_HANDLE_PREFIX } from '../../constants';
import type { PathsNodeConfig } from '../../types/nodeConfig/paths';

interface NodeLike {
  configJson?: Record<string, unknown> | null;
  id: string;
}

interface EdgeLike {
  sourceHandle: string;
  sourceNodeId: string;
}

/**
 * Resolve the human-readable label of the paths branch this edge represents,
 * or null when it's a normal "default" edge (not coming from a Paths node).
 *
 * Used by WorkflowEdge to render a "Path A" chip on the wire so users can
 * see which branch a child sits under without opening the node.
 */
function resolveEdgeBranchLabel(
  edge: EdgeLike,
  nodes: NodeLike[],
): string | null {
  const branchId = parseBranchHandle(edge.sourceHandle);
  if (!branchId) return null;

  const source = nodes.find((n) => n.id === edge.sourceNodeId);
  const config = (source?.configJson ?? {}) as Partial<PathsNodeConfig>;
  const branch = (config.branches ?? []).find((b) => b.id === branchId);
  return branch?.label ?? 'Branch';
}

/** Edge sourceHandle scheme: `branch_<branchId>` routes the executor. */
const toBranchHandle = (branchId: string): string =>
  `${BRANCH_HANDLE_PREFIX}${branchId}`;

const parseBranchHandle = (sourceHandle: string): string | null =>
  sourceHandle.startsWith(BRANCH_HANDLE_PREFIX)
    ? sourceHandle.slice(BRANCH_HANDLE_PREFIX.length)
    : null;

export { parseBranchHandle, resolveEdgeBranchLabel, toBranchHandle };
