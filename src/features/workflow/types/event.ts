import {
  WorkflowActionKey,
  WorkflowProviderApp,
} from '@/shared/api/workflow/schemas';

type EventMetaData = {
  label: string;
  options: Partial<Record<WorkflowProviderApp, GoogleFormTriggerEventOption[]>>;
  placeholder: string;
};

type GoogleFormTriggerEventOption = {
  data: {
    description: string;
  };
  label: string;
  value: WorkflowActionKey;
};

export type { EventMetaData, GoogleFormTriggerEventOption };
