import { UpdateWorkflowNodeInput } from '@/shared/api/base.schemas';

import {
  GoogleFormTriggerConfig,
  GoogleSheetActionConfig,
} from './configPanel';

// Step 1. Step Up Form Values at Config Panel
type SetupFormValues = Pick<
  UpdateWorkflowNodeInput,
  'actionKey' | 'integrationAccountId'
>;

// Step 2. Configure Form Values at Config Panel
type ConfigFormValues<T> = {
  configJson: T;
};

type AllConfigFormValues =
  // trigger
  | ConfigFormValues<GoogleFormTriggerConfig>
  // action
  | ConfigFormValues<GoogleSheetActionConfig>;

// Label name of the workflow node
type LabelFormValues = {
  label: string;
};

// Overall form values of the config panel
type StepConfigFormValues = SetupFormValues & AllConfigFormValues;

export type {
  ConfigFormValues,
  LabelFormValues,
  SetupFormValues,
  StepConfigFormValues,
};
