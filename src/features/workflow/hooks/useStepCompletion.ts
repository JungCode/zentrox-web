'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import type { ConfigStep, StepConfigFormValues } from '../types';
import type { NodeQueryData } from '../types/graph';

interface UseStepCompletionProps {
  control: ReturnType<typeof useFormContext<StepConfigFormValues>>['control'];
  node: NodeQueryData | undefined;
}

const useStepCompletion = ({
  control,
  node,
}: UseStepCompletionProps): Record<ConfigStep, boolean> => {
  const actionKey = useWatch({ control, name: 'actionKey' });
  const integrationAccountId = useWatch({
    control,
    name: 'integrationAccountId',
  });
  const formId = useWatch({ control, name: 'configJson.formId' });

  return {
    configure: Boolean(formId),
    setup: Boolean(actionKey && integrationAccountId),
    test:
      Boolean(node?.connectionStatus) && node?.connectionStatus !== 'untested',
  };
};

export { useStepCompletion };
