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
    aiSystemPrompt,
    aiOutputs,
    pathsBranches,
  ] = useWatch({
    control,
    name: [
      'actionKey',
      'integrationAccountId',
      'configJson.formId',
      'configJson.spreadsheetId',
      'configJson.worksheetName',
      'configJson.systemPrompt',
      'configJson.outputs',
      'configJson.branches',
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

          // Configure step — system prompt is required, and at least one
          // declared output (so the model has a target shape to fill).
          const hasSystemPrompt =
            typeof aiSystemPrompt === 'string' &&
            aiSystemPrompt.trim().length > 0;
          const hasOutputs = Array.isArray(aiOutputs) && aiOutputs.length > 0;
          isConfigureComplete = hasSystemPrompt && hasOutputs;
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
      switch (node.providerApp) {
        case WorkflowProviderApp.Paths:
          // Paths has no setup step beyond picking the app — actionKey is
          // auto-assigned (`paths_branch`) and there's no integration
          // account. Configure step is complete once the user has at least
          // one branch defined.
          isIntegrationAccountComplete = true;
          isConfigureComplete =
            Array.isArray(pathsBranches) && pathsBranches.length > 0;
          break;

        default:
          break;
      }
      break;
  }

  // Utility nodes don't expose an actionKey field; trust the BE-assigned
  // value so the "setup complete" gate doesn't false-fail for them.
  const isSetupComplete =
    node?.nodeType === WorkflowNodeType.Utility
      ? isIntegrationAccountComplete
      : Boolean(actionKey && isIntegrationAccountComplete);

  return {
    configure: isConfigureComplete,
    setup: isSetupComplete,
    test:
      Boolean(node?.connectionStatus) && node?.connectionStatus !== 'untested',
  };
};

export { useStepCompletion };
