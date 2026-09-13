'use client';

import { GitBranchIcon, PlusIcon } from '@phosphor-icons/react';
import { Handle, type NodeProps, Position } from '@xyflow/react';

import {
  NODE_CONNECTOR_HEIGHT,
  ProviderAppMetadataRecord,
} from '@/features/workflow/constants';
import {
  useAddPathsBranch,
  useCreateWorkflowNode,
  useWorkflowStore,
} from '@/features/workflow/hooks';
import type { CanvasNode } from '@/features/workflow/types/graph';
import { cn } from '@/lib/ui/utils';
import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';
import { Button } from '@/shared/components/ui/button';

import { WorkflowNodeAssigned } from './WorkflowNodeAssigned';
import { WorkflowNodeUnassigned } from './WorkflowNodeUnassigned';

const WorkflowNode = ({ data }: NodeProps<CanvasNode>) => {
  const {
    connectionStatus,
    id,
    isLast,
    label,
    nodeType,
    providerApp,
    stepNumber,
    workflowId,
  } = data;
  const assigned = !!providerApp;
  const providerAppMetadata =
    providerApp && ProviderAppMetadataRecord[providerApp];
  const isSelected = useWorkflowStore((state) => state.selectedNode?.id === id);
  const runtimeStatus = useWorkflowStore(
    (state) => state.nodeRuntimeStatuses[id],
  );
  const isPathsNode =
    nodeType === WorkflowNodeType.Utility &&
    providerApp === WorkflowProviderApp.Paths;

  const { createNode } = useCreateWorkflowNode({
    sourceNodeId: id,
    stepNumber,
    workflowId,
  });

  const { addBranch, loading: addingBranch } = useAddPathsBranch({
    pathsNodeId: id,
    workflowId,
  });

  const handleAddStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    createNode();
  };

  const handleAddBranch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addBranch();
  };

  return (
    <div className="relative w-90">
      {/* Invisible target handle at the top edge */}
      <Handle
        className="pointer-events-none! border-none! bg-transparent!"
        position={Position.Top}
        style={{ height: 1, minHeight: 0, minWidth: 0, width: 1 }}
        type="target"
      />

      <div
        className={cn(
          runtimeStatus && 'workflow-node-runtime',
          runtimeStatus === 'running' && 'workflow-node-runtime-running',
          runtimeStatus === 'success' && 'workflow-node-runtime-success',
          runtimeStatus === 'failed' && 'workflow-node-runtime-failed',
          runtimeStatus === 'skipped' && 'workflow-node-runtime-skipped',
        )}
      >
        {assigned && providerAppMetadata ? (
          <WorkflowNodeAssigned
            connectionStatus={connectionStatus}
            isSelected={isSelected}
            label={label}
            nodeId={id}
            providerAppMetadata={providerAppMetadata}
            stepNumber={stepNumber}
            workflowId={workflowId}
          />
        ) : (
          <WorkflowNodeUnassigned
            isSelected={isSelected}
            label={label}
            stepNumber={stepNumber}
          />
        )}
      </div>

      {/* Invisible source handle at the bottom edge */}
      <Handle
        className="pointer-events-none! border-none! bg-transparent!"
        position={Position.Bottom}
        style={{ height: 1, minHeight: 0, minWidth: 0, width: 1 }}
        type="source"
      />

      {/*
        Paths nodes need a dedicated "+ Add branch" affordance (multi-children
        entry point) regardless of whether they're a leaf. Renders right under
        the card so it's discoverable next to the configured branches.
      */}
      {isPathsNode && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `calc(100% + 12px)` }}
        >
          <Button
            className={cn(
              'nodrag nopan h-7 gap-1.5 rounded-full border px-3 text-xs',
              'border-outline-variant bg-surface-container-lowest text-on-surface',
              'hover:border-secondary hover:bg-secondary/10',
            )}
            disabled={addingBranch}
            onClick={handleAddBranch}
            size="sm"
            title="Add branch"
            variant="ghost"
          >
            <GitBranchIcon size={12} weight="bold" />
            Add branch
          </Button>
        </div>
      )}

      {/*
        Leaf "+ append step" — shown on every branch tail. Suppressed on a
        paths node itself because branches grow horizontally from the node
        card, not vertically below it.
      */}
      {isLast && !isPathsNode && (
        <>
          {/* Connector line from card bottom to plus button */}
          <div
            className="absolute left-1/2 -translate-x-px"
            style={{
              backgroundColor: 'var(--outline-variant)',
              height: NODE_CONNECTOR_HEIGHT,
              top: '100%',
              width: 2,
            }}
          />
          {/* Plus button */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `calc(100% + ${NODE_CONNECTOR_HEIGHT}px)` }}
          >
            <Button
              className={cn(
                'nodrag nopan rounded-full border-2',
                'border-outline-variant bg-surface-container-lowest text-outline shadow-sm',
                'hover:border-secondary hover:bg-secondary hover:text-on-secondary hover:scale-110',
                'hover:shadow-[0_0_0_4px_var(--accent-glow)]',
              )}
              onClick={handleAddStep}
              size="icon-sm"
              title="Add step"
              variant="ghost"
            >
              <PlusIcon size={14} strokeWidth={2.5} weight="bold" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export { WorkflowNode };
