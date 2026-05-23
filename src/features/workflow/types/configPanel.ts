import type {
  TokenizedValue,
  TokenVariableMeta,
} from '@/shared/types/baseform/token-input.types';

import { ConfigStep } from './graph';

// =============================================================================
// Config Step
// =============================================================================
// Represents one step in the node configuration wizard (e.g. "1. Connect", "2. Configure").
// Used to drive the step indicator UI in StepConfigPanel.

interface ConfigStepProperties {
  id: ConfigStep; // enum value that identifies which step this is
  label: string; // human-readable step name shown in the UI
  number: string; // display number (string so it can be "1", "2", etc. without type coercion)
}

// =============================================================================
// Google Form
// =============================================================================
// Configuration saved for a Google Form trigger node.
// The user picks a form; these two fields record the selection for display and API calls.

interface GoogleFormTriggerConfig {
  formId?: string; // Google Forms API form ID used to set up the webhook/polling
  formName?: string; // display name shown in the config UI so the user can identify the form
}

// =============================================================================
// Google Sheet
// =============================================================================
// Configuration for a Google Sheets action node that appends or updates rows.

// Back-compat alias — the shape is identical to the shared TokenVariableMeta.
// Prefer importing TokenVariableMeta directly in new code.
type GoogleSheetVariableMeta = TokenVariableMeta;

// One spreadsheet column's value template plus the metadata needed to resolve
// any tokens inside it. Extends TokenizedValue so the BE resolver can treat it
// the same as any other tokenized field (AI inputs, future provider fields).
interface GoogleSheetColumnMapping extends TokenizedValue {
  columnIndex: number; // zero-based column position in the worksheet
  columnName: string; // header name shown in the config UI (e.g. "Email", "Name")
}

// Full configuration object persisted for a Google Sheets action node.
// The Drive → Spreadsheet → Worksheet selection is hierarchical:
//   selecting a different drive resets spreadsheet and worksheet
//   selecting a different spreadsheet resets worksheet
//   selecting a different worksheet resets columnMappings
interface GoogleSheetActionConfig {
  columnMappings?: GoogleSheetColumnMapping[]; // one entry per column header found in the selected worksheet
  driveId?: string | null; // null means "My Drive" (no shared drive selected)
  driveName?: string; // display name for the selected drive
  spreadsheetId?: string;
  spreadsheetName?: string;
  worksheetId?: string;
  worksheetName?: string; // stored separately because some APIs need the title, not just the ID
}

export type {
  ConfigStepProperties,
  GoogleFormTriggerConfig,
  GoogleSheetActionConfig,
  GoogleSheetColumnMapping,
  GoogleSheetVariableMeta,
};
