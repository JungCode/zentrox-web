import { EdgeQueryData, NodeQueryData } from '../types';

type edge = Pick<EdgeQueryData, 'sourceNodeId' | 'targetNodeId'>;

const getTargetNodeIds = (nodeId: string, edges: edge[]): string[] => {
  return edges
    .filter((edge) => edge.sourceNodeId === nodeId)
    .map((edge) => edge.targetNodeId);
};

const findNextNode = (
  currentNodeId: string,
  nodeChain: readonly NodeQueryData[],
): NodeQueryData | null => {
  const currentIndex = nodeChain.findIndex((node) => node.id === currentNodeId);
  if (currentIndex < 0) return null;

  return nodeChain[currentIndex + 1] ?? null;
};

export { findNextNode, getTargetNodeIds };
