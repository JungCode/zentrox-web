'use client';

import { useMutation } from '@apollo/client/react';
import { PlusIcon } from '@phosphor-icons/react';
import { Handle, type NodeProps, Position } from '@xyflow/react';

import { cn } from '@/lib/ui/utils';
import { WorkflowEdgeSourceHandle } from '@/shared/api/workflow/schemas';
import {
  CreateWorkflowNodeDocument,
  WorkflowDocument,
} from '@/shared/api/workflow/workflow.schemas';
import { Button } from '@/shared/components/ui/button';

import {
  NODE_CONNECTOR_HEIGHT,
  ProviderAppMetadataRecord,
} from '../../../constants';
import type { CanvasNode } from '../../../types/graph';
import { WorkflowNodeAssigned } from './WorkflowNodeAssigned';
import { WorkflowNodeUnassigned } from './WorkflowNodeUnassigned';

const WorkflowNode = ({ data }: NodeProps<CanvasNode>) => {
  const { id, isLast, label, providerApp, stepNumber, workflowId } = data;
  const assigned = !!providerApp;
  const providerAppMetadata =
    providerApp && ProviderAppMetadataRecord[providerApp];

  const [createWorkflowNode] = useMutation(CreateWorkflowNodeDocument, {
    refetchQueries: [WorkflowDocument],
    //TODO: handle onCompleted, loading and onError.
  });

  const handleAddStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    createWorkflowNode({
      variables: {
        input: {
          label: `New step ${stepNumber + 1}`,
          sourceHandle: WorkflowEdgeSourceHandle.Default,
          sourceNodeId: id,
        },
        workflowId,
      },
    });
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

      {assigned && providerAppMetadata ? (
        <WorkflowNodeAssigned
          label={label}
          nodeId={id}
          providerAppMetadata={providerAppMetadata}
          stepNumber={stepNumber}
          workflowId={workflowId}
        />
      ) : (
        <WorkflowNodeUnassigned label={label} stepNumber={stepNumber} />
      )}

      {/* Invisible source handle at the bottom edge */}
      <Handle
        className="pointer-events-none! border-none! bg-transparent!"
        position={Position.Bottom}
        style={{ height: 1, minHeight: 0, minWidth: 0, width: 1 }}
        type="source"
      />

      {isLast && (
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
