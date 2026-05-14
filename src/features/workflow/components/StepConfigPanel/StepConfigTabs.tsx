'use client';

import { CheckCircleIcon } from '@phosphor-icons/react';
import { useFormContext } from 'react-hook-form';

import type {
  ConfigStep,
  NodeQueryData,
} from '@/features/workflow/types/graph';
import { cn } from '@/lib/ui/utils';

import { CONFIG_STEPS } from '../../constants';
import { useUpdateWorkflowNode } from '../../hooks';
import { StepConfigFormValues } from '../../types';

interface StepConfigTabsProps {
  activeStep: ConfigStep;
  node: NodeQueryData | undefined;
  onStepChange: (step: ConfigStep) => void;
  workflowId: string;
}

const StepConfigTabs = ({
  activeStep,
  node,
  onStepChange,
  workflowId,
}: StepConfigTabsProps) => {
  const methods = useFormContext<StepConfigFormValues>();

  const { updateNode } = useUpdateWorkflowNode({ node, workflowId });

  const handleSetup = async (values: StepConfigFormValues) => {
    await updateNode({
      actionKey: values.actionKey,
      integrationAccountId: values.integrationAccountId,
    });
  };

  const handleConfigure = async (values: StepConfigFormValues) => {
    await updateNode({
      configJson: {
        ...(node?.configJson ?? {}),
        formId: values.configJson?.formId,
        formName: values.configJson?.formName,
      },
    });
  };

  const handleSubmit = methods.handleSubmit(async (values) => {
    switch (activeStep) {
      case 'setup':
        handleSetup(values);
        onStepChange('configure');
        break;

      case 'configure':
        handleConfigure(values);
        onStepChange('test');
        break;

      case 'test':
      default:
        onStepChange('test');
        break;
    }
  });

  return (
    <div className="border-border/60 flex items-center border-b px-4">
      {CONFIG_STEPS.map((step, idx) => {
        const isActive = activeStep === step.id;
        const isDone = CONFIG_STEPS.findIndex((s) => s.id === activeStep) > idx;

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
            onClick={handleSubmit}
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
  );
};

export { StepConfigTabs };
