'use client';

import { CheckCircleIcon } from '@phosphor-icons/react';
import type { BaseSyntheticEvent } from 'react';

import { CONFIG_STEPS } from '@/features/workflow/constants';
import type { ConfigStep } from '@/features/workflow/types';
import { cn } from '@/lib/ui/utils';

interface StepConfigTabsProps {
  activeStep: ConfigStep;
  onSubmitToStep: (step: ConfigStep) => (e?: BaseSyntheticEvent) => void;
}

const StepConfigTabs = ({
  activeStep,
  onSubmitToStep,
}: StepConfigTabsProps) => (
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
          onClick={onSubmitToStep(step.id)}
          type="button"
        >
          {isDone ? (
            <CheckCircleIcon className="text-success" size={13} weight="fill" />
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

export { CONFIG_STEPS, StepConfigTabs };
