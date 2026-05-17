import {
  WorkflowActionKey,
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/workflow/schemas';

import { EventMetaData, GoogleFormTriggerEventOption } from '../types';

export const TRIGGER_EVENT_OPTIONS: Partial<
  Record<WorkflowProviderApp, GoogleFormTriggerEventOption[]>
> = {
  [WorkflowProviderApp.GoogleForm]: [
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
  ],
};

export const ACTION_EVENT_OPTIONS: Partial<
  Record<WorkflowProviderApp, GoogleFormTriggerEventOption[]>
> = {
  [WorkflowProviderApp.GoogleSheet]: [
    // {
    //   data: { description: 'Changes the properties of a sheet.' },
    //   label: 'Change Sheet Properties',
    //   value: WorkflowActionKey.GoogleSheetChangeSheetProperties,
    // },
    {
      data: { description: 'Creates a new column in a sheet.' },
      label: 'Create Column',
      value: WorkflowActionKey.GoogleSheetCreateColumn,
    },
    // {
    //   data: { description: 'Creates a new row in a sheet.' },
    //   label: 'Create Row',
    //   value: WorkflowActionKey.GoogleSheetCreateRow,
    // },
  ],
};

export const NODE_TYPE_EVENT_META_DATA: Partial<
  Record<WorkflowNodeType, EventMetaData>
> = {
  [WorkflowNodeType.Action]: {
    label: 'Action Event',
    options: ACTION_EVENT_OPTIONS,
    placeholder: 'Select action event…',
  },
  [WorkflowNodeType.Trigger]: {
    label: 'Trigger Event',
    options: TRIGGER_EVENT_OPTIONS,
    placeholder: 'Select trigger event…',
  },
};
