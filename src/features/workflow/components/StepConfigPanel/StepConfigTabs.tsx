'use client';

import { CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react';
import type { BaseSyntheticEvent } from 'react';

import { CONFIG_STEPS } from '@/features/workflow/constants';
import type { ConfigStep } from '@/features/workflow/types';
import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';

interface StepConfigTabsProps {
  activeStep: ConfigStep;
  onSubmitToStep: (step: ConfigStep) => (e?: BaseSyntheticEvent) => void;
  stepCompletion: Record<ConfigStep, boolean>;
}

const StepConfigTabs = ({
  activeStep,
  onSubmitToStep,
  stepCompletion,
}: StepConfigTabsProps) => {
  const activeStepIdx = CONFIG_STEPS.findIndex((s) => s.id === activeStep);

  return (
    <div className="border-border/60 flex items-center border-b px-4">
      {CONFIG_STEPS.map((step, idx) => {
        const isActive = activeStep === step.id;
        const isComplete = stepCompletion[step.id as ConfigStep];
        const isDisabled = idx > activeStepIdx && !isComplete;

        return (
          <Button
            className={cn(
              'h-auto rounded-none border-0 border-b-2 px-0 py-3 transition-colors',
              { 'ml-4': idx > 0 },
              {
                'border-secondary text-secondary': isActive,
                'cursor-not-allowed opacity-40': isDisabled,
                'hover:text-on-surface': !isDisabled,
                'text-on-surface-variant border-transparent': !isActive,
              },
            )}
            disabled={isDisabled}
            key={step.id}
            onClick={onSubmitToStep(step.id)}
            type="button"
            variant="ghost"
          >
            {isComplete ? (
              <CheckCircleIcon
                className="text-success"
                size={13}
                weight="fill"
              />
            ) : (
              <WarningCircleIcon
                className="text-warning"
                size={13}
                weight="fill"
              />
            )}
            {step.label}
          </Button>
        );
      })}
    </div>
  );
};

export { CONFIG_STEPS, StepConfigTabs };
