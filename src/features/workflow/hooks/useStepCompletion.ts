'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';

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

  // Setup step
  let isIntegrationAccountComplete = false;

  // Configure step
  let isConfigureComplete = false;

  switch (node?.nodeType) {
    // =========================================================================
    //  ████████╗██████╗ ██╗ ██████╗  ██████╗ ███████╗██████╗  ██████╗
    //  ╚══██╔══╝██╔══██╗██║██╔════╝ ██╔════╝ ██╔════╝██╔══██╗██╔════╝
    //     ██║   ██████╔╝██║██║  ███╗██║  ███╗█████╗  ██████╔╝╚█████╗
    //     ██║   ██╔══██╗██║██║   ██║██║   ██║██╔══╝  ██╔══██╗ ╚═══██╗
    //     ██║   ██║  ██║██║╚██████╔╝╚██████╔╝███████╗██║  ██║██████╔╝
    // =========================================================================
    case WorkflowNodeType.Trigger:
      switch (node.providerApp) {
        case WorkflowProviderApp.GoogleForm:
          // Setup step
          isIntegrationAccountComplete = Boolean(integrationAccountId);

          // Configure step
          isConfigureComplete = Boolean(formId);
          break;

        case WorkflowProviderApp.GoogleSheet:
        case WorkflowProviderApp.Ai:
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        default:
          break;
      }
      break;

    // =========================================================================
    //   █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
    //  ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
    //  ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
    //  ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
    //  ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
    // =========================================================================
    case WorkflowNodeType.Action:
      switch (node.providerApp) {
        case WorkflowProviderApp.GoogleSheet:
          // Setup step
          isIntegrationAccountComplete = Boolean(integrationAccountId);

          // Configure step
          isConfigureComplete = Boolean(spreadsheetId && worksheetName);
          break;

        case WorkflowProviderApp.Ai:
          // Setup step
          isIntegrationAccountComplete = true; // No integration account needed for AI actions

          // Configure step
          isConfigureComplete = false;
          break;

        case WorkflowProviderApp.GoogleForm:
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        default:
          break;
      }
      break;

    // =========================================================================
    //  ██╗   ██╗████████╗██╗██╗     ██╗████████╗██╗███████╗███████╗
    //  ██║   ██║╚══██╔══╝██║██║     ██║╚══██╔══╝██║██╔════╝██╔════╝
    //  ██║   ██║   ██║   ██║██║     ██║   ██║   ██║█████╗  ███████╗
    //  ██║   ██║   ██║   ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║
    //  ╚██████╔╝   ██║   ██║███████╗██║   ██║   ██║███████╗███████║
    // =========================================================================
    case WorkflowNodeType.Utility:
      break;
  }

  return {
    configure: isConfigureComplete,
    setup: Boolean(actionKey && isIntegrationAccountComplete),
    test:
      Boolean(node?.connectionStatus) && node?.connectionStatus !== 'untested',
  };
};

export { useStepCompletion };
