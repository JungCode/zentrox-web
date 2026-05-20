import type { GoogleFormTriggerRecord } from './triggerRecord';

// Sample data emitted by a Google Form trigger node — one form response with
// question titles enriched onto each answer for display.
export type GoogleFormTriggerSampleData = GoogleFormTriggerRecord;

// Run metadata stored alongside the resolved column values in a Google Sheet
// action sample record.
export interface GoogleSheetActionSampleMeta {
  appendedAt: string;
  spreadsheetId: string;
  spreadsheetName: string;
  updatedRange: string | null;
  worksheetId: string;
  worksheetName: string;
}

// Sample data emitted by a Google Sheet action node after a successful test
// append. Resolved column-name → cell-value pairs live at the top level so
// downstream nodes can reference them with the same dot-path scheme used for
// trigger answers, with run metadata under `_meta`.
export interface GoogleSheetActionSampleData extends Record<string, unknown> {
  _meta: GoogleSheetActionSampleMeta;
}

// Discriminated union of every shape stored in the JSONB `data` column of
// `WorkflowNodeSampleRecord`. Add a new variant when a new node-test strategy
// emits its own sample shape.
export type NodeSampleRecordData =
  | GoogleFormTriggerSampleData
  | GoogleSheetActionSampleData;
