'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/workflow/schemas';

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
  const [
    actionKey,
    integrationAccountId,
    formId,
    spreadsheetId,
    worksheetName,
  ] = useWatch({
    control,
    name: [
      'actionKey',
      'integrationAccountId',
      'configJson.formId',
      'configJson.spreadsheetId',
      'configJson.worksheetName',
    ],
  });

  let configure = false;

  switch (node?.nodeType) {
    ///////////////////////////
    // trigger //
    ///////////////////////////
    case WorkflowNodeType.Trigger:
      switch (node.providerApp) {
        case WorkflowProviderApp.GoogleForm:
          configure = Boolean(formId);
          break;

        default:
          configure = false;
          break;
      }
      break;
    ///////////////////////////
    // action //
    //////////////////////////
    case WorkflowNodeType.Action:
      switch (node.providerApp) {
        case WorkflowProviderApp.GoogleSheet:
          configure = Boolean(spreadsheetId && worksheetName);
          break;

        case WorkflowProviderApp.GoogleForm:
          configure = false;
          break;

        default:
          configure = false;
          break;
      }
      break;
  }

  return {
    configure,
    setup: Boolean(actionKey && integrationAccountId),
    test:
      Boolean(node?.connectionStatus) && node?.connectionStatus !== 'untested',
  };
};

export { useStepCompletion };
