import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { GoogleSheetColumnMapping, StepConfigFormValues } from '../types';

export const useGoogleSheetForm = () => {
  const { setValue } = useFormContext<StepConfigFormValues>();

  const resetColumnMappings = useCallback(
    (value: GoogleSheetColumnMapping[] = []) => {
      setValue('configJson.columnMappings', value);
    },
    [setValue],
  );

  const resetWorksheet = useCallback(() => {
    setValue('configJson.worksheetId', '');
    setValue('configJson.worksheetName', '');
    resetColumnMappings();
  }, [setValue, resetColumnMappings]);

  const resetSpreadsheet = useCallback(() => {
    setValue('configJson.spreadsheetId', '');
    setValue('configJson.spreadsheetName', '');
    resetWorksheet();
  }, [setValue, resetWorksheet]);

  return { resetColumnMappings, resetSpreadsheet, resetWorksheet };
};
