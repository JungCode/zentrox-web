import { EdgeQueryData } from '../types';

type edge = Pick<EdgeQueryData, 'sourceNodeId' | 'targetNodeId'>;

export const getTargetNodeIds = (nodeId: string, edges: edge[]): string[] => {
  return edges
    .filter((edge) => edge.sourceNodeId === nodeId)
    .map((edge) => edge.targetNodeId);
};
