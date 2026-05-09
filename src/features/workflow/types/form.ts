import {
  UpdateWorkflowNodeInput,
  WorkflowActionKey,
} from '@/shared/api/workflow/schemas';

export type SetupFormValues = Pick<
  UpdateWorkflowNodeInput,
  'actionKey' | 'integrationAccountId'
>;

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
