import { WorkflowActionKey } from '@/shared/api/workflow/schemas';

import { GoogleFormTriggerEventOption } from '../types';

export const GOOGLE_FORM_TRIGGER_EVENT_OPTIONS: GoogleFormTriggerEventOption[] =
  [
    {
      data: {
        description: 'Triggers when a new response is submitted to the form.',
      },
      label: 'New Form Response',
      value: WorkflowActionKey.GoogleFormCreated,
    },
    {
      data: {
        description:
          'Triggers when a new response is submitted or an existing response is updated in the form.',
      },
      label: 'New or Updated Form Response',
      value: WorkflowActionKey.GoogleFormCreatedOrUpdated,
    },
  ];
