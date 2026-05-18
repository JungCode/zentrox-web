// src/shared/types/baseform/token-input.types.ts
import type { ElementType } from 'react';

// ─── Segments ─────────────────────────────────────────────────────────────────

export interface TextSegment {
  type: 'text';
  value: string;
}

export interface VariableSegment {
  fieldKey: string;
  fieldLabel: string;
  nodeId: string;
  nodeLabel: string;
  previewValue: string;
  type: 'variable';
}

export type TokenSegment = TextSegment | VariableSegment;

// ─── Field Picker ─────────────────────────────────────────────────────────────

export interface AvailableField {
  fieldKey: string;
  fieldLabel: string;
  nodeId: string;
  nodeLabel: string;
  previewValue: string;
}

export interface AvailableFieldGroup {
  fields: AvailableField[];
  icon?: ElementType<{ className?: string; size?: number }>;
  nodeId: string;
  nodeLabel: string;
}

// ─── Serialization ────────────────────────────────────────────────────────────

// Keyed by "nodeId.fieldKey" — mirrors the {{nodeId.fieldKey.value}} template token
export type VariableMetaEntry = Omit<VariableSegment, 'type'>;
export type VariableMeta = Record<string, VariableMetaEntry>;

// ─── Component Props ──────────────────────────────────────────────────────────

export interface TokenInputProps {
  nodeId: string;
  onChange?: (value: string, variableMeta: VariableMeta) => void;
  placeholder?: string;
  value?: string;
  variableMeta?: VariableMeta;
  workflowVersionId: string;
}

// ─── Slate Element Types ───────────────────────────────────────────────────────

export interface SlateTokenElement {
  children: [{ text: string }];
  fieldKey: string;
  fieldLabel: string;
  nodeId: string;
  nodeLabel: string;
  previewValue: string;
  type: 'token';
}

export interface SlateParagraphElement {
  children: Array<{ text: string } | SlateTokenElement>;
  type: 'paragraph';
}

// ─── Slate Module Augmentation ────────────────────────────────────────────────

declare module 'slate' {
  interface CustomTypes {
    Editor: import('slate').BaseEditor &
      import('slate-react').ReactEditor &
      import('slate-history').HistoryEditor;
    Element: SlateParagraphElement | SlateTokenElement;
    Text: { text: string };
  }
}
