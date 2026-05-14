import { UpdateWorkflowNodeInput } from '@/shared/api/workflow/schemas';

import {
  ConfigFormValues,
  GoogleFormConfig,
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

export const CONFIGURE_GOOGLE_FORM_FALLBACKS: ConfigFormValues<GoogleFormConfig> =
  {
    configJson: { formId: '', formName: '' },
  };
