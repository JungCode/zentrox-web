import {
  WorkflowActionKey,
  WorkflowProviderApp,
} from '@/shared/api/workflow/schemas';

export type EventMetaData = {
  label: string;
  options: Partial<Record<WorkflowProviderApp, GoogleFormTriggerEventOption[]>>;
  placeholder: string;
};

export type GoogleFormTriggerEventOption = {
  data: {
    description: string;
  };
  label: string;
  value: WorkflowActionKey;
};
