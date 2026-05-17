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

export interface GoogleSheetConfig {
  driveId?: string | null;
  driveName?: string;
  spreadsheetId?: string;
  spreadsheetName?: string;
  worksheetId?: string;
  worksheetName?: string;
}
