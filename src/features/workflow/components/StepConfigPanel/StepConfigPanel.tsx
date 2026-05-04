'use client';

import { useQuery } from '@apollo/client/react';
import { CheckCircleIcon, XIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { cn } from '@/lib/ui/utils';
import { WorkflowNodeDocument } from '@/shared/api/workflow/workflow.schemas';
import { Button } from '@/shared/components/ui/button';

import type { ConfigStep, NodeQueryData } from '../../types/graph';
import { ConfigureTabContent } from './ConfigureTabContent';
import { SetupTabContent } from './SetupTabContent';
import { TestTabContent } from './TestTabContent';

interface StepConfigPanelProps {
  nodeId: string | undefined;
  nodeIndex: number | undefined;
  /** Called only when the user explicitly clicks the X button */
  onClose: () => void;
  /** Controls panel visibility (CSS transform) */
  open: boolean;
  /** The currently-selected workflow node being configured */
  workflowId: string;
}

/** Tab metadata for the three-step configuration stepper */
const CONFIG_STEPS: { id: ConfigStep; label: string; number: string }[] = [
  { id: 'setup', label: 'Setup', number: '1' },
  { id: 'configure', label: 'Configure', number: '2' },
  { id: 'test', label: 'Test', number: '3' },
];

/**
 * StepConfigPanel slides in from the RIGHT over the workflow canvas.
 *
 * It is absolutely positioned inside the canvas wrapper (no portal, no
 * backdrop, no blur). Height fills the canvas height. The panel only
 * closes when the user clicks the X button — clicking outside does nothing.
 */
const StepConfigPanel = ({
  nodeId,
  nodeIndex,
  onClose,
  open,
  workflowId,
}: StepConfigPanelProps) => {
  const { data } = useQuery(WorkflowNodeDocument, {
    skip: !nodeId,
    variables: {
      nodeId: nodeId ?? '',
      workflowId: workflowId,
    },
  });

  const node = data?.workflowNode as NodeQueryData;

  const [activeStep, setActiveStep] = useState<ConfigStep>('setup');

  return (
    <aside
      className={cn(
        'absolute top-0 right-0 z-10 flex h-full w-80 flex-col',
        'bg-surface-container-lowest border-border/60 border-l',
        'transition-transform duration-200 ease-in-out',
        open ? 'translate-x-0' : 'pointer-events-none translate-x-full',
      )}
    >
      {/* ── Panel header ────────────────────────────────────────── */}
      <div className="border-border/60 flex items-center gap-3 border-b px-4 py-3">
        {/* {app && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base shadow-sm">
            {<app.icon />}
          </span>
        )} */}
        icon
        <div className="min-w-0 flex-1">
          <p className="text-on-surface truncate text-sm font-semibold">
            {nodeIndex}. {node?.label ?? 'Step'}
          </p>
          <p className="text-on-surface-variant truncate text-xs">
            {node?.actionKey ?? 'Configure this step'}
          </p>
        </div>
        <Button
          className="shrink-0"
          onClick={onClose}
          size="icon-sm"
          variant="ghost"
        >
          <XIcon size={14} />
        </Button>
      </div>

      {/* ── Step tabs ───────────────────────────────────────────── */}
      <div className="border-border/60 flex items-center border-b px-4">
        {CONFIG_STEPS.map((step, idx) => {
          const isActive = activeStep === step.id;
          const isDone =
            CONFIG_STEPS.findIndex((s) => s.id === activeStep) > idx;

          return (
            <button
              className={cn(
                'flex items-center gap-1.5 border-b-2 py-3 text-xs font-semibold transition-colors',
                idx > 0 && 'ml-4',
                isActive
                  ? 'border-secondary text-secondary'
                  : 'text-on-surface-variant hover:text-on-surface border-transparent',
              )}
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              type="button"
            >
              {isDone ? (
                <CheckCircleIcon
                  className="text-success"
                  size={13}
                  weight="fill"
                />
              ) : (
                <span
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold',
                    isActive
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container text-on-surface-variant',
                  )}
                >
                  {step.number}
                </span>
              )}
              {step.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeStep === 'setup' && <SetupTabContent node={node} />}
        {activeStep === 'configure' && <ConfigureTabContent node={node} />}
        {activeStep === 'test' && <TestTabContent node={node} />}
      </div>
    </aside>
  );
};

export { StepConfigPanel };
