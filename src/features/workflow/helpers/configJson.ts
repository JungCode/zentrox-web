import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';

import type {
  GoogleFormTriggerConfig,
  GoogleFormTriggerRecord,
  GoogleSheetActionConfig,
  NodeSample,
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
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
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
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        default:
          return {};
      }
    }

    case WorkflowNodeType.Utility:
    default:
      return baseConfig;
  }
};

// ─── Typed sample data accessors ─────────────────────────────────────────────
// sampleRecord.data is stored as a generic JSON blob in the API response.
// These helpers cast it to the correct typed shape per provider so callers
// never need to use `any` or guard every field access manually.

const resolveSampleDataJson = (sample: NodeSample): GoogleFormTriggerRecord => {
  switch (sample.nodeType) {
    case WorkflowNodeType.Trigger:
      switch (sample.providerApp) {
        case WorkflowProviderApp.GoogleForm:
          return (sample.sampleRecord?.data ?? {}) as GoogleFormTriggerRecord;

        case WorkflowProviderApp.GoogleSheet:
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        default:
          return {} as GoogleFormTriggerRecord;
      }

    case WorkflowNodeType.Action:
      switch (sample.providerApp) {
        case WorkflowProviderApp.GoogleSheet:
        case WorkflowProviderApp.GoogleForm:
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        default:
          return {} as GoogleFormTriggerRecord;
      }

    case WorkflowNodeType.Utility:
    default:
      return {} as GoogleFormTriggerRecord;
  }
};

export { resolveConfigJson, resolveSampleDataJson };
