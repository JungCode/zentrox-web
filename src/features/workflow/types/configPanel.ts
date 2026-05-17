import { ConfigStep } from './graph';

// =============================================================================
// Config Step
// =============================================================================

export interface ConfigStepProperties {
  id: ConfigStep;
  label: string;
  number: string;
}

// =============================================================================
// Google Form
// =============================================================================

export interface GoogleFormTriggerConfig {
  formId?: string;
  formName?: string;
}

// =============================================================================
// Google Sheet
// =============================================================================

export interface GoogleSheetColumnMapping {
  columnName: string;
  value: string;
}

export interface GoogleSheetActionConfig {
  columnMappings?: GoogleSheetColumnMapping[];
  driveId?: string | null;
  driveName?: string;
  spreadsheetId?: string;
  spreadsheetName?: string;
  worksheetId?: string;
  worksheetName?: string;
}
