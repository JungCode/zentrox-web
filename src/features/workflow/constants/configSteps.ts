import { ConfigStep } from '../types';
import { ConfigStepProperties } from '../types/configSteps';

export const CONFIG_STEPS: ConfigStepProperties[] = [
  { id: 'setup', label: 'Setup', number: '1' },
  { id: 'configure', label: 'Configure', number: '2' },
  { id: 'test', label: 'Test', number: '3' },
];

export const STEP_INCOMPLETE_MESSAGES: Partial<Record<ConfigStep, string>> = {
  configure: 'Select a form to continue',
  setup: 'Select a trigger event and account to continue',
};
