import { UpdateWorkflowNodeInput } from '@/shared/api/workflow/schemas';

import {
  GoogleFormTriggerConfig,
  GoogleSheetActionConfig,
} from './configPanel';

// Step 1. Step Up Form Values at Config Panel
export type SetupFormValues = Pick<
  UpdateWorkflowNodeInput,
  'actionKey' | 'integrationAccountId'
>;

// Step 2. Configure Form Values at Config Panel
export type ConfigFormValues<T> = {
  configJson: T;
};

export type AllConfigFormValues =
  // trigger
  | ConfigFormValues<GoogleFormTriggerConfig>
  // action
  | ConfigFormValues<GoogleSheetActionConfig>;

// Label name of the workflow node
export type LabelFormValues = {
  label: string;
};

// Overall form values of the config panel
export type StepConfigFormValues = SetupFormValues & AllConfigFormValues;
