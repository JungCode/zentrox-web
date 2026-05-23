import { UpdateWorkflowNodeInput } from '@/shared/api/base.schemas';

import { AiGenerateNodeConfig } from './aiGenerate';
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
  | ConfigFormValues<GoogleFormTriggerConfig>
  | ConfigFormValues<GoogleSheetActionConfig>
  | ConfigFormValues<AiGenerateNodeConfig>;

// Label name of the workflow node
type LabelFormValues = {
  label: string;
};

// Overall form values of the config panel
type StepConfigFormValues = SetupFormValues & AllConfigFormValues;

export type {
  AllConfigFormValues,
  ConfigFormValues,
  LabelFormValues,
  SetupFormValues,
  StepConfigFormValues,
};
