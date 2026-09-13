import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';

import type {
  AiGenerateNodeConfig,
  GoogleFormTriggerConfig,
  GoogleFormTriggerRecord,
  GoogleSheetActionConfig,
  NodeSample,
  PathsNodeConfig,
  StepConfigFormValues,
} from '../../types';

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

        case WorkflowProviderApp.Ai: {
          const aiConfig = values.configJson as AiGenerateNodeConfig;
          // Spread baseConfig first so legacy keys persisted by the old
          // handler (model, knowledgeSource, evaluationRules,
          // decisionThresholds, outputFields) aren't dropped — the new form
          // fields then overwrite the parts it owns.
          return {
            ...baseConfig,
            inputs: aiConfig?.inputs ?? [],
            knowledgeFiles: aiConfig?.knowledgeFiles ?? [],
            outputs: aiConfig?.outputs ?? [],
            systemPrompt: aiConfig?.systemPrompt ?? '',
          };
        }

        case WorkflowProviderApp.GoogleForm:
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        default:
          return {};
      }
    }

    case WorkflowNodeType.Utility: {
      switch (providerApp) {
        case WorkflowProviderApp.Paths: {
          // Branches are managed via the dedicated addPathsBranch mutation
          // (each add creates a placeholder child + edge). The configure tab
          // only edits in-place: branch labels, rule logic, and rules. So we
          // spread baseConfig to keep server-managed bits (matchMode, branch
          // ids) intact and overwrite with whatever the form changed.
          const pathsConfig = values.configJson as PathsNodeConfig;
          return {
            ...baseConfig,
            branches: pathsConfig?.branches ?? [],
            matchMode: 'first_match',
          };
        }

        default:
          return baseConfig;
      }
    }
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
