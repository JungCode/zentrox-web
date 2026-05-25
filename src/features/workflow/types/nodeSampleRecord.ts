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

// Run metadata stored alongside the AI Generate output fields. Mirrors
// AiGenerateActionSampleMeta on the BE — captures the resolved upstream
// inputs and the step-by-step processing trace from the test run.
export interface AiGenerateActionSampleMeta {
  generatedAt: string;
  // input.name → resolved value (plus BE-internal `_preprocessedText` /
  // `_structuredFacts` helpers, which the UI filters out via config.inputs).
  inputData: Record<string, unknown>;
  model: string;
  processingLog: { data: Record<string, unknown> | null; step: string }[];
}

// Sample data emitted by an AI Generate action node. Declared output fields
// (decision, score, reason, plus any user-defined outputs) live at the top
// level so downstream nodes can token-reference them with the same dot-path
// scheme used for trigger answers. Run metadata + processing trace under
// `_meta`.
export interface AiGenerateActionSampleData extends Record<string, unknown> {
  _meta: AiGenerateActionSampleMeta;
}

// Sample data emitted by a Paths utility node after a successful evaluation.
// Mirrors PathsEvaluationSampleData on the BE — downstream nodes can token-
// reference matchedBranchLabel/matchedBranchId to annotate which branch was
// picked under first-match-wins.
export interface PathsEvaluationSampleData extends Record<string, unknown> {
  _meta: { evaluatedAt: string };
  branches: {
    branchId: string;
    branchLabel: string;
    matched: boolean;
    rules: {
      passed: boolean;
      resolvedLeft: string | null;
      resolvedRight: string | null;
      ruleId: string;
    }[];
  }[];
  matchedBranchId: string | null;
  matchedBranchLabel: string | null;
}

// Discriminated union of every shape stored in the JSONB `data` column of
// `WorkflowNodeSampleRecord`. Add a new variant when a new node-test strategy
// emits its own sample shape.
export type NodeSampleRecordData =
  | AiGenerateActionSampleData
  | GoogleFormTriggerSampleData
  | GoogleSheetActionSampleData
  | PathsEvaluationSampleData;
