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

// Mirrors VariableMetaEntry from token-input.types.ts but scoped to this feature's config.
// Stored alongside each column mapping so the backend knows how to resolve token values
// at workflow execution time (which path to follow, how to join arrays, etc.).
interface GoogleSheetVariableMeta {
  fieldLabel: string; // human-readable field name (for display in logs/debugging)
  fieldPath: string; // dot-notation path into the trigger's runtime record
  joinSeparator: string | null; // join character when the resolved value is an array; null = first item only
  nodeId: string; // the upstream node this variable comes from
  nodeLabel: string;
  nullFallback: string | null; // value to use if the field resolves to null at runtime
  valueKey: string | null; // for array-of-objects, which key to extract from each item
}

// Represents the mapping for one spreadsheet column: what text/variable value to write into it.
// `value` is the serialized TokenInput string (may contain {{nodeId__fieldKey}} placeholders).
// `variableMeta` holds the metadata for every placeholder used in `value`, keyed by "nodeId__fieldKey".
interface GoogleSheetColumnMapping {
  columnIndex: number; // zero-based column position in the worksheet
  columnName: string; // header name shown in the config UI (e.g. "Email", "Name")
  value: string; // the TokenInput serialized value — plain text or a mix with {{...}} tokens
  variableMeta: Record<string, GoogleSheetVariableMeta>; // metadata for each variable token in `value`
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
