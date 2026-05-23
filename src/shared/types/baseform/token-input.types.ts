// src/shared/types/baseform/token-input.types.ts
import type { ElementType } from 'react';

// ─── Segments ─────────────────────────────────────────────────────────────────
// A "segment" is one piece of the TokenInput's logical value.
// The full value is a sequence of segments — either plain text or a variable reference.
// This union is used when reasoning about the content model at a high level.

export interface TextSegment {
  type: 'text';
  value: string;
}

// A variable segment references a field from an upstream workflow node.
// nodeId + fieldKey together uniquely identify the field within a workflow.
export interface VariableSegment {
  fieldKey: string;
  fieldLabel: string; // human-readable name shown in the chip, e.g. "Response ID"
  fieldPath: string; // dot-notation path into the runtime record, e.g. "answers.abc.textAnswers.answers"
  nodeId: string;
  nodeLabel: string;
  previewValue?: string; // sample value shown during editing so the user can verify they picked the right field
  type: 'variable';
}

export type TokenSegment = TextSegment | VariableSegment;

// ─── Field Picker ─────────────────────────────────────────────────────────────
// These types describe the data surfaced in the popover that lets the user
// choose which workflow field to insert as a token.

export interface AvailableField {
  fieldKey: string; // short identifier used to build the serialized token key (nodeId__fieldKey)
  fieldLabel: string; // display name shown in the picker list and inside the chip
  fieldPath: string; // runtime access path — how the backend/executor resolves the value
  joinSeparator: string | null; // when the field is an array, join its items with this separator; null = use first item
  nodeId: string;
  nodeLabel: string;
  nullFallback: string | null; // value to use if the field resolves to null/undefined at runtime
  previewValue: string; // sample value from stored node sample data, shown in the picker
  valueKey: string | null; // for array-of-objects fields, the key within each object to extract (e.g. "value")
}

// Groups fields by the workflow node they come from so the picker can show a
// header with the node name and icon for each source step.
export interface AvailableFieldGroup {
  fields: AvailableField[];
  icon?: ElementType<{ className?: string; size?: number }>; // provider icon (e.g. Google Form logo)
  nodeId: string;
  nodeLabel: string;
}

// ─── Serialization ────────────────────────────────────────────────────────────
// The TokenInput stores its value as a plain string like:
//   "Hello {{nodeA__fieldKey}} world"
// where {{nodeId__tokenKey}} is a variable placeholder.
//
// Because the string alone doesn't carry field metadata (label, path, etc.),
// we store that separately in a VariableMeta map keyed by "nodeId__tokenKey".
// Both the string and the map are passed to onChange and saved to the form.

// Keyed by "nodeId__tokenKey" — matches backend token format {{nodeId__tokenKey}}
// Canonical name: TokenVariableMeta. Mirrors the BE TokenVariableMeta exactly,
// so any field stored as a TokenizedValue is interpreted the same way on both
// sides (Sheet column mappings, AI inputs, future tokenized fields).
export interface TokenVariableMeta {
  fieldLabel: string;
  fieldPath: string;
  joinSeparator: string | null;
  nodeId: string;
  nodeLabel: string;
  nullFallback: string | null;
  valueKey: string | null;
}

/**
 * Any field that accepts the TokenInput template format. Extend this when
 * declaring a tokenized config field — e.g. GoogleSheetColumnMapping,
 * ZentroxAiInputField — so the shared resolver on the BE can interpret it.
 */
export interface TokenizedValue {
  value: string;
  variableMeta: Record<string, TokenVariableMeta>;
}

// Back-compat aliases. Prefer the canonical TokenVariableMeta / TokenizedValue
// names in new code; these stay so existing imports keep working.
export type VariableMetaEntry = TokenVariableMeta;
export type VariableMeta = Record<string, TokenVariableMeta>;

// ─── Component Props ──────────────────────────────────────────────────────────

export interface TokenInputProps {
  // The workflow node this input belongs to — used to fetch upstream sample data
  // and exclude the current node from the field picker (can't reference yourself).
  nodeId: string;
  // Called whenever the user edits the input. Receives both the serialized string
  // value and the metadata map so the form can persist both together.
  onChange?: (value: string, variableMeta: VariableMeta) => void;
  placeholder?: string;
  value?: string; // controlled value — the serialized string (may contain {{...}} tokens)
  variableMeta?: VariableMeta; // metadata for any tokens already present in `value`
  workflowVersionId: string; // used to scope the sample data query to the correct workflow version
}

// ─── Slate Element Types ───────────────────────────────────────────────────────
// The editor uses Slate.js under the hood. Slate represents content as a tree of
// "elements" and "text leaves". We define two element types:
//   - paragraph: the single top-level block (the input is always one line)
//   - token:     an inline void element that renders as a chip (non-editable pill)

// A token element is "void" in Slate terms — the user cannot place the cursor
// inside it. It is also "inline" — it flows with surrounding text.
// The empty children array is required by Slate's data model even for void nodes.
export interface SlateTokenElement {
  children: [{ text: string }]; // always empty string — required by Slate for void nodes
  fieldKey: string;
  fieldLabel: string;
  fieldPath: string;
  joinSeparator: string | null;
  nodeId: string;
  nodeLabel: string;
  nullFallback: string | null;
  previewValue?: string;
  type: 'token';
  valueKey: string | null;
}

// The single wrapping block. Because TokenInput is single-line, there is always
// exactly one paragraph element at the top level.
export interface SlateParagraphElement {
  children: Array<{ text: string } | SlateTokenElement>;
  type: 'paragraph';
}

// ─── Slate Module Augmentation ────────────────────────────────────────────────
// Slate's TypeScript support is driven by module augmentation — we tell the
// `slate` package which concrete types our editor, elements, and text use.
// Without this block, Slate's generics fall back to `unknown`.

declare module 'slate' {
  interface CustomTypes {
    Editor: import('slate').BaseEditor &
      import('slate-react').ReactEditor &
      import('slate-history').HistoryEditor;
    Element: SlateParagraphElement | SlateTokenElement;
    Text: { text: string };
  }
}
