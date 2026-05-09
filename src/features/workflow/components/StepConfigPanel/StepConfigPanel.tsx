'use client';

import { useState } from 'react';

import { useStepConfigNode } from '@/features/workflow/hooks';
import type { ConfigStep } from '@/features/workflow/types/graph';
import { cn } from '@/lib/ui/utils';

import { StepConfigPanelHeader } from './StepConfigPanelHeader/StepConfigPanelHeader';
import { StepConfigPanelLoadingSkeleton } from './StepConfigPanelLoadingSkeleton';
import { StepConfigTabs } from './StepConfigTabs';
import { TabContent } from './TabContent';

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
  const { loading, node, providerAppMetadata } = useStepConfigNode({
    nodeId,
    workflowId,
  });
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
      {loading ? (
        <StepConfigPanelLoadingSkeleton />
      ) : (
        <>
          <StepConfigPanelHeader
            node={node}
            nodeIndex={nodeIndex}
            onClose={onClose}
            providerAppMetadata={providerAppMetadata}
            workflowId={workflowId}
          />

          <StepConfigTabs
            activeStep={activeStep}
            onStepChange={setActiveStep}
          />

          <TabContent
            activeStep={activeStep}
            node={node}
            providerAppMetadata={providerAppMetadata}
            workflowId={workflowId}
          />
        </>
      )}
    </aside>
  );
};

export { StepConfigPanel };
