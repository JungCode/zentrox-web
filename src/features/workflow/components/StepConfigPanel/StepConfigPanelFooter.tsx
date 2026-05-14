import type { BaseSyntheticEvent } from 'react';

import type { ConfigStep } from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { STEP_INCOMPLETE_MESSAGES } from '../../constants';

interface StepConfigPanelFooterProps {
  activeStep: ConfigStep;
  loading?: boolean;
  onSubmit: (e?: BaseSyntheticEvent) => void;
  stepCompletion: Record<ConfigStep, boolean>;
}

const StepConfigPanelFooter = ({
  activeStep,
  loading,
  onSubmit,
  stepCompletion,
}: StepConfigPanelFooterProps) => {
  if (activeStep === 'test') return null;

  const isCurrentStepComplete = stepCompletion[activeStep];

  const isDisabled = loading || !isCurrentStepComplete;
  const tooltipMessage = STEP_INCOMPLETE_MESSAGES[activeStep];

  return (
    <div className="border-border/60 border-t px-4 py-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* span needed — disabled buttons suppress pointer events for the tooltip */}
            <span className="block w-full">
              <Button
                className="w-full"
                disabled={isDisabled}
                onClick={onSubmit}
                size="lg"
                type="button"
                variant="secondary"
              >
                {loading && <Spinner data-icon="inline-start" />}
                Continue
              </Button>
            </span>
          </TooltipTrigger>
          {!isCurrentStepComplete && tooltipMessage && (
            <TooltipContent side="top">{tooltipMessage}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { StepConfigPanelFooter };
