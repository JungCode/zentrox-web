import type { BaseSyntheticEvent } from 'react';

import type { ConfigStep } from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';

interface StepConfigPanelFooterProps {
  activeStep: ConfigStep;
  loading?: boolean;
  onSubmit: (e?: BaseSyntheticEvent) => void;
}

const StepConfigPanelFooter = ({
  activeStep,
  loading,
  onSubmit,
}: StepConfigPanelFooterProps) => {
  if (activeStep === 'test') return null;

  return (
    <div className="border-border/60 border-t px-4 py-3">
      <Button
        className="w-full"
        disabled={loading}
        onClick={onSubmit}
        size="lg"
        type="button"
        variant="secondary"
      >
        {loading && <Spinner data-icon="inline-start" />}
        Continue
      </Button>
    </div>
  );
};

export { StepConfigPanelFooter };
