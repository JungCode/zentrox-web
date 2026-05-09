'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';

import type { CanvasNode } from '../types/graph';

interface UseWorkflowNodeTransitionsProps {
  setNodes: Dispatch<SetStateAction<CanvasNode[]>>;
}

const NODE_ENTER_ANIMATION_MS = 220;
const NODE_EXIT_ANIMATION_MS = 220;

const clearTimerMap = (
  timerMap: Map<string, ReturnType<typeof setTimeout>>,
) => {
  timerMap.forEach((timer) => clearTimeout(timer));
  timerMap.clear();
};

const getNodeIds = (nodes: CanvasNode[]) => nodes.map((node) => node.id);

const getAddedNodeIds = (nextNodeIds: string[], previousNodeIds: Set<string>) =>
  nextNodeIds.filter((nodeId) => !previousNodeIds.has(nodeId));

const getRemovedNodeIds = (
  nextNodeIds: string[],
  previousNodeIds: Set<string>,
) => [...previousNodeIds].filter((nodeId) => !new Set(nextNodeIds).has(nodeId));

const markNodeAsEntering = (node: CanvasNode): CanvasNode => ({
  ...node,
  data: {
    ...node.data,
    isEntering: true,
    isExiting: false,
  },
});

const markNodeAsExiting = (node: CanvasNode): CanvasNode => ({
  ...node,
  data: {
    ...node.data,
    isEntering: false,
    isExiting: true,
  },
});

const clearEnterFlag = (node: CanvasNode): CanvasNode => ({
  ...node,
  data: {
    ...node.data,
    isEntering: false,
  },
});

const useWorkflowNodeTransitions = ({
  setNodes,
}: UseWorkflowNodeTransitionsProps) => {
  const enterTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const exitTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const previousNodeIdsRef = useRef<Set<string>>(new Set());
  const hasInitializedGraphRef = useRef(false);

  // Syncs the visual node list with the latest graph data while preserving
  // enter/exit transitions for newly added and removed nodes.
  const syncNodesWithTransitions = (nextNodes: CanvasNode[]) => {
    const nextNodeIds = getNodeIds(nextNodes);

    // The first render should show the graph immediately with no animation.
    if (!hasInitializedGraphRef.current) {
      setNodes(nextNodes);
      previousNodeIdsRef.current = new Set(nextNodeIds);
      hasInitializedGraphRef.current = true;
      return;
    }

    const nextNodeIdSet = new Set(nextNodeIds);
    const previousNodeIds = previousNodeIdsRef.current;
    const addedNodeIds = getAddedNodeIds(nextNodeIds, previousNodeIds);
    const removedNodeIds = getRemovedNodeIds(nextNodeIds, previousNodeIds);

    previousNodeIdsRef.current = new Set(nextNodeIds);

    // If a node comes back before its exit animation finishes, cancel the
    // pending removal so the node stays visible.
    nextNodeIdSet.forEach((nodeId) => {
      const existingExitTimer = exitTimersRef.current.get(nodeId);
      if (!existingExitTimer) return;

      clearTimeout(existingExitTimer);
      exitTimersRef.current.delete(nodeId);
    });

    setNodes((previousNodes) => {
      // Keep a lookup so we can reuse the old node object when marking nodes
      // as exiting. That preserves the existing card layout while it fades out.
      const previousNodesById = new Map(
        previousNodes.map((node) => [node.id, node]),
      );

      const continuingExitingNodes = previousNodes.filter(
        (node) => node.data.isExiting && !nextNodeIdSet.has(node.id),
      );

      const newlyExitingNodes = removedNodeIds
        .map((nodeId) => previousNodesById.get(nodeId))
        .filter((node): node is CanvasNode => Boolean(node))
        .map(markNodeAsExiting);

      const nextAnimatedNodes = nextNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isEntering: addedNodeIds.includes(node.id),
          isExiting: false,
        },
      }));

      return [
        ...nextAnimatedNodes,
        ...continuingExitingNodes,
        ...newlyExitingNodes,
      ];
    });

    // Newly added nodes start slightly hidden, then clear the flag once the
    // CSS transition has had time to finish.
    addedNodeIds.forEach((nodeId) => {
      const existingEnterTimer = enterTimersRef.current.get(nodeId);
      if (existingEnterTimer) {
        clearTimeout(existingEnterTimer);
      }

      const timer = setTimeout(() => {
        setNodes((previousNodes) =>
          previousNodes.map((node) =>
            node.id === nodeId ? clearEnterFlag(node) : node,
          ),
        );
        enterTimersRef.current.delete(nodeId);
      }, NODE_ENTER_ANIMATION_MS);

      enterTimersRef.current.set(nodeId, timer);
    });

    // Removed nodes stay mounted briefly so they can fade out before removal.
    removedNodeIds.forEach((nodeId) => {
      if (exitTimersRef.current.has(nodeId)) return;

      const timer = setTimeout(() => {
        setNodes((previousNodes) =>
          previousNodes.filter((node) => node.id !== nodeId),
        );
        exitTimersRef.current.delete(nodeId);
      }, NODE_EXIT_ANIMATION_MS);

      exitTimersRef.current.set(nodeId, timer);
    });
  };

  useEffect(() => {
    return () => {
      clearTimerMap(enterTimersRef.current);
      clearTimerMap(exitTimersRef.current);
    };
  }, []);

  return { syncNodesWithTransitions };
};

export { useWorkflowNodeTransitions };
