'use client';

import { useShallow } from 'zustand/shallow';

import { findNextNode } from '@/features/workflow/helpers';
import type { LabeledRecord } from '@/features/workflow/types';

import { useSelectTriggerNodeSampleRecord } from './useSelectTriggerNodeSampleRecord';
import { useWorkflowStore } from './useWorkflowStore';

interface UseContinueWithTriggerRecordProps {
  labeledRecords: LabeledRecord[];
  nodeId: string;
  selectedRecordId: string | undefined;
  workflowId: string;
}

const useContinueWithTriggerRecord = ({
  labeledRecords,
  nodeId,
  selectedRecordId,
  workflowId,
}: UseContinueWithTriggerRecordProps) => {
  const { nodeChain, setSelectedNode } = useWorkflowStore(
    useShallow((state) => ({
      nodeChain: state.nodeChain,
      setSelectedNode: state.setSelectedNode,
    })),
  );

  const goToNextNode = () => {
    const nextNode = findNextNode(nodeId, nodeChain);

    if (nextNode) {
      setSelectedNode(nextNode);
    }
  };

  const { loading, selectSampleRecord } = useSelectTriggerNodeSampleRecord({
    nodeId,
    onCompleted: goToNextNode,
    workflowId,
  });

  const continueWithSelected = () => {
    const selectedRecord = labeledRecords.find(
      (entry) => entry.record.responseId === selectedRecordId,
    )?.record;

    if (!selectedRecord) return;

    selectSampleRecord(selectedRecord as unknown as Record<string, unknown>);
  };

  return { continueWithSelected, loading };
};

export { useContinueWithTriggerRecord };
