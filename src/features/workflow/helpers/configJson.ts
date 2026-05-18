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
          const config = values.configJson as GoogleFormTriggerConfig;

          return {
            ...baseConfig,
            formId: config?.formId,
            formName: config?.formName,
          };

        case WorkflowProviderApp.GoogleSheet:
        default:
          return {};
      }

    case WorkflowNodeType.Action: {
      switch (providerApp) {
        case WorkflowProviderApp.GoogleSheet:
          const config = values.configJson as GoogleSheetActionConfig;
          return {
            ...baseConfig,
            columnMappings: config?.columnMappings,
            driveId: config?.driveId,
            driveName: config?.driveName,
            spreadsheetId: config?.spreadsheetId,
            spreadsheetName: config?.spreadsheetName,
            worksheetId: config?.worksheetId,
            worksheetName: config?.worksheetName,
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
