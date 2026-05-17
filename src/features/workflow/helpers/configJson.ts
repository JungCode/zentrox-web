import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/workflow/schemas';

import type {
  ConfigFormValues,
  GoogleFormTriggerConfig,
  GoogleSheetActionConfig,
  StepConfigFormValues,
} from '../types';

const resolveConfigJson = (
  nodeType: WorkflowNodeType | null | undefined,
  providerApp: WorkflowProviderApp | null | undefined,
  baseConfig: Record<string, unknown>,
  values: StepConfigFormValues,
): Record<string, unknown> => {
  switch (nodeType) {
    case WorkflowNodeType.Trigger:
      switch (providerApp) {
        case WorkflowProviderApp.GoogleForm:
          const config =
            values.configJson as ConfigFormValues<GoogleFormTriggerConfig>;
          return {
            ...baseConfig,
            formId: config.configJson?.formId,
            formName: config.configJson?.formName,
          };

        case WorkflowProviderApp.GoogleSheet:
        default:
          return {};
      }

    case WorkflowNodeType.Action: {
      switch (providerApp) {
        case WorkflowProviderApp.GoogleSheet:
          const config =
            values.configJson as ConfigFormValues<GoogleSheetActionConfig>;
          return {
            ...baseConfig,
            columnMappings: config.configJson?.columnMappings,
            driveId: config.configJson?.driveId,
            driveName: config.configJson?.driveName,
            spreadsheetId: config.configJson?.spreadsheetId,
            spreadsheetName: config.configJson?.spreadsheetName,
            worksheetId: config.configJson?.worksheetId,
            worksheetName: config.configJson?.worksheetName,
          };

        case WorkflowProviderApp.GoogleForm:
        default:
          return {};
      }
    }
    default:
      return baseConfig;
  }
};

export { resolveConfigJson };
