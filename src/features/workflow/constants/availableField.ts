import { GoogleFormBaseFieldKey } from '../types';
// ─── Google Form ─────────────────────────────────────────────────────────────

// Top-level scalar fields present on every Google Form response.
// fieldPath === fieldKey because these are direct keys on GoogleFormTriggerRecord.
// `respondentEmail` is optional on the type (only populated when the form requires sign-in)
// but we always expose it so the user can reference it; it just resolves to '' at runtime.

const GOOGLE_FORM_BASE_FIELDS: {
  key: GoogleFormBaseFieldKey;
  label: string;
}[] = [
  { key: 'responseId', label: 'Response ID' },
  { key: 'createTime', label: 'Create Time' },
  { key: 'lastSubmittedTime', label: 'Last Submitted Time' },
  { key: 'respondentEmail', label: 'Respondent Email' },
];

export { GOOGLE_FORM_BASE_FIELDS };
