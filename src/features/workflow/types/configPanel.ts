import { ConfigStep } from './graph';

export interface ConfigStepProperties {
  id: ConfigStep;
  label: string;
  number: string;
}

export interface GoogleFormConfig {
  formId?: string;
  formName?: string;
}
