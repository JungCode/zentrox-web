import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { createTypedSetValue } from '@/shared/helpers';

import { GoogleSheetColumnMapping, StepConfigFormValues } from '../types';

export const useGoogleSheetForm = () => {
  const { setValue } = useFormContext<StepConfigFormValues>();
  const setTypedValue = createTypedSetValue<StepConfigFormValues>(setValue);

  const resetColumnMappings = useCallback(
    (value: GoogleSheetColumnMapping[] = []) => {
      setTypedValue('configJson.columnMappings', value);
    },
    [setTypedValue],
  );

  const resetWorksheet = useCallback(() => {
    setTypedValue('configJson.worksheetId', '');
    setTypedValue('configJson.worksheetName', '');
    resetColumnMappings();
  }, [setTypedValue, resetColumnMappings]);

  const resetSpreadsheet = useCallback(() => {
    setTypedValue('configJson.spreadsheetId', '');
    setTypedValue('configJson.spreadsheetName', '');
    resetWorksheet();
  }, [setTypedValue, resetWorksheet]);

  return { resetColumnMappings, resetSpreadsheet, resetWorksheet };
};
