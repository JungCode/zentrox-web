import type {
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

export { buildGoogleSheetDataInFields, buildGoogleSheetDataOutFields };
