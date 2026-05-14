import {
  UpdateWorkflowNodeInput,
  WorkflowActionKey,
} from '@/shared/api/workflow/schemas';
export interface GoogleFormConfig {
  formId?: string;
  formName?: string;
}

export type SetupFormValues = Pick<
  UpdateWorkflowNodeInput,
  'actionKey' | 'integrationAccountId'
>;

export type ConfigFormValues<T> = {
  configJson: T;
};

export type LabelFormValues = {
  label: string;
};

export type GoogleFormTriggerEventOption = {
  data: {
    description: string;
  };
  label: string;
  value: WorkflowActionKey;
};

export type StepConfigFormValues = SetupFormValues &
  ConfigFormValues<GoogleFormConfig>;
