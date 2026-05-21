import { useFormContext } from 'react-hook-form';

import { createTypedSetValue } from '@/shared/helpers';

import { GoogleSheetColumnMapping, StepConfigFormValues } from '../../types';
export const useGoogleSheetForm = () => {
  const { setValue } = useFormContext<StepConfigFormValues>();
  const setTypedValue = createTypedSetValue<StepConfigFormValues>(setValue);

  const resetColumnMappings = (value: GoogleSheetColumnMapping[] = []) => {
    setValue('configJson.columnMappings', value, { shouldDirty: true });
  };

  const resetWorksheet = () => {
    setTypedValue('configJson.worksheetId', '');
    setTypedValue('configJson.worksheetName', '');
  };

  const resetSpreadsheet = () => {
    setTypedValue('configJson.spreadsheetId', '');
    setTypedValue('configJson.spreadsheetName', '');
    resetWorksheet();
  };

  return {
    resetColumnMappings,
    resetSpreadsheet,
    resetWorksheet,
  };
};
