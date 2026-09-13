import {
  UpdateWorkflowNodeInput,
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';

import {
  AllConfigFormValues,
  LabelFormValues,
  SetupFormValues,
} from '../types';

export const WORKFLOW_NODE_FORM_FALLBACKS: UpdateWorkflowNodeInput = {
  actionKey: undefined,
  configJson: {},
  integrationAccountId: '',
  label: '',
};

export const LABEL_FORM_FALLBACKS: LabelFormValues = {
  label: '',
};

export const SETUP_FORM_FALLBACKS: SetupFormValues = {
  actionKey: undefined,
  integrationAccountId: '',
};

export const CONFIG_FORM_FALLBACKS: Partial<
  Record<
    WorkflowNodeType,
    Partial<Record<WorkflowProviderApp, AllConfigFormValues>>
  >
> = {
  [WorkflowNodeType.Action]: {
    [WorkflowProviderApp.Ai]: {
      configJson: {
        inputs: [],
        knowledgeFiles: [],
        outputs: [],
        systemPrompt: '',
      },
    },
    [WorkflowProviderApp.GoogleSheet]: {
      configJson: {
        driveId: '',
        driveName: '',
        spreadsheetId: '',
        spreadsheetName: '',
        worksheetId: '',
        worksheetName: '',
      },
    },
  },
  [WorkflowNodeType.Trigger]: {
    [WorkflowProviderApp.GoogleForm]: {
      configJson: { formId: '', formName: '' },
    },
  },
  [WorkflowNodeType.Utility]: {
    [WorkflowProviderApp.Paths]: {
      configJson: {
        branches: [],
        matchMode: 'first_match',
      },
    },
  },
};
