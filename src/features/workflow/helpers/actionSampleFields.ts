import type {
  AiGenerateActionSampleData,
  AiGenerateNodeConfig,
  GoogleSheetActionConfig,
  GoogleSheetActionSampleData,
} from '@/features/workflow/types';

export interface ActionSampleField {
  label: string;
  value: string;
}

interface DataInFields {
  emptyFields: ActionSampleField[];
  filledFields: ActionSampleField[];
}

const toDisplayString = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  return String(value);
};

const buildGoogleSheetDataInFields = (
  config: GoogleSheetActionConfig | null | undefined,
  sample: GoogleSheetActionSampleData | null | undefined,
): DataInFields => {
  const baseFields: ActionSampleField[] = [];

  const spreadsheetId =
    sample?._meta?.spreadsheetId ?? config?.spreadsheetId ?? '';
  if (spreadsheetId) {
    baseFields.push({ label: 'spreadsheet', value: spreadsheetId });
  }

  const worksheetId = sample?._meta?.worksheetId ?? config?.worksheetId ?? '';
  if (worksheetId) {
    baseFields.push({ label: 'worksheet', value: worksheetId });
  }

  const filledMappings: ActionSampleField[] = [];
  const emptyMappings: ActionSampleField[] = [];

  for (const mapping of config?.columnMappings ?? []) {
    const resolved = toDisplayString(sample?.[mapping.columnName]);

    if (resolved.trim().length > 0) {
      filledMappings.push({ label: mapping.columnName, value: resolved });
    } else {
      emptyMappings.push({
        label: mapping.columnName,
        value: 'empty (optional)',
      });
    }
  }

  return {
    emptyFields: emptyMappings,
    filledFields: [...baseFields, ...filledMappings],
  };
};

const buildGoogleSheetDataOutFields = (
  data: GoogleSheetActionSampleData | null | undefined,
): ActionSampleField[] => {
  if (!data) {
    return [];
  }

  return Object.entries(data)
    .filter(([key]) => key !== '_meta')
    .map(([label, value]) => ({ label, value: toDisplayString(value) }));
};

// AI Generate — Data In: each configured input rendered against the value
// the BE resolved for it (stored under sample._meta.inputData[input.name]).
// Inputs without a resolved value land in `emptyFields`. BE-internal helpers
// (_preprocessedText, _structuredFacts) are excluded by iterating
// config.inputs rather than scanning inputData directly.
const buildAiGenerateDataInFields = (
  config: AiGenerateNodeConfig | null | undefined,
  sample: AiGenerateActionSampleData | null | undefined,
): DataInFields => {
  const inputData = (sample?._meta?.inputData ?? {}) as Record<string, unknown>;
  const filledFields: ActionSampleField[] = [];
  const emptyFields: ActionSampleField[] = [];

  for (const input of config?.inputs ?? []) {
    const resolved = toDisplayString(inputData[input.name]);

    if (resolved.trim().length > 0) {
      filledFields.push({ label: input.name, value: resolved });
    } else {
      emptyFields.push({
        label: input.name,
        value: 'empty (no upstream data)',
      });
    }
  }

  return { emptyFields, filledFields };
};

// AI Generate — Data Out: every top-level key on the sample is a model
// output (decision, score, reason, plus any user-defined outputs).
// `_meta` carries run metadata and is filtered out.
const buildAiGenerateDataOutFields = (
  data: AiGenerateActionSampleData | null | undefined,
): ActionSampleField[] => {
  if (!data) {
    return [];
  }

  return Object.entries(data)
    .filter(([key]) => key !== '_meta')
    .map(([label, value]) => ({ label, value: toDisplayString(value) }));
};

export {
  buildAiGenerateDataInFields,
  buildAiGenerateDataOutFields,
  buildGoogleSheetDataInFields,
  buildGoogleSheetDataOutFields,
};
