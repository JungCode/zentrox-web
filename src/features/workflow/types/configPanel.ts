import type { VariableMeta } from '@/shared/types';

import { ConfigStep } from './graph';

// =============================================================================
// Config Step
// =============================================================================

interface ConfigStepProperties {
  id: ConfigStep;
  label: string;
  number: string;
}

// =============================================================================
// Google Form
// =============================================================================

interface GoogleFormTriggerConfig {
  formId?: string;
  formName?: string;
}

// =============================================================================
// Google Sheet
// =============================================================================

interface GoogleSheetColumnMapping {
  columnName: string;
  value: string;
  variableMeta?: VariableMeta;
}

interface GoogleSheetActionConfig {
  columnMappings?: GoogleSheetColumnMapping[];
  driveId?: string | null;
  driveName?: string;
  spreadsheetId?: string;
  spreadsheetName?: string;
  worksheetId?: string;
  worksheetName?: string;
}

export type {
  ConfigStepProperties,
  GoogleFormTriggerConfig,
  GoogleSheetActionConfig,
  GoogleSheetColumnMapping,
};
