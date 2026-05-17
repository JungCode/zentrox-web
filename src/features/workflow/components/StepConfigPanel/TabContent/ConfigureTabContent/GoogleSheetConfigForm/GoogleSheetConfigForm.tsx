'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { resolveDriveId } from '@/features/workflow/helpers';
import type {
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { FormItem } from '@/shared/components/BaseForm';

import { GoogleDriveSelector } from './GoogleDriveSelector';
import { GoogleSpreadsheetSelector } from './GoogleSpreadsheetSelector';
import { GoogleWorksheetSelector } from './GoogleWorksheetSelector';

interface GoogleSheetConfigFormProps {
  node: NodeQueryData;
}

const GoogleSheetConfigForm = ({ node }: GoogleSheetConfigFormProps) => {
  const { control, setValue, watch } = useFormContext<StepConfigFormValues>();

  const integrationAccountId = node.integrationAccountId ?? '';

  const { driveId, isDriveSelected } = resolveDriveId(
    watch('configJson.driveId'),
  );

  const spreadsheetId = watch('configJson.spreadsheetId');

  return (
    <div className="space-y-4">
      <FormItem label="Drive">
        <Controller
          control={control}
          name="configJson.driveId"
          render={({ field }) => (
            <GoogleDriveSelector
              integrationAccountId={integrationAccountId}
              onValueChange={(val) => {
                field.onChange(val);
                setValue(
                  'configJson.driveName',
                  val === null ? 'My Drive' : '',
                );
                setValue('configJson.spreadsheetId', '');
                setValue('configJson.spreadsheetName', '');
                setValue('configJson.worksheetId', '');
                setValue('configJson.worksheetName', '');
              }}
              side="left"
              value={field.value as string | null | undefined}
            />
          )}
        />
      </FormItem>

      <FormItem label="Spreadsheet">
        <Controller
          control={control}
          name="configJson.spreadsheetId"
          render={({ field }) => (
            <GoogleSpreadsheetSelector
              driveId={driveId}
              integrationAccountId={isDriveSelected ? integrationAccountId : ''}
              onSpreadsheetChange={(sheet) => {
                setValue('configJson.spreadsheetName', sheet.name);
                setValue('configJson.worksheetId', '');
                setValue('configJson.worksheetName', '');
              }}
              onValueChange={field.onChange}
              side="left"
              value={field.value ?? ''}
            />
          )}
        />
      </FormItem>

      <FormItem label="Worksheet">
        <Controller
          control={control}
          name="configJson.worksheetId"
          render={({ field }) => (
            <GoogleWorksheetSelector
              integrationAccountId={integrationAccountId}
              onValueChange={field.onChange}
              onWorksheetChange={(ws) => {
                setValue('configJson.worksheetName', ws.title);
              }}
              side="left"
              spreadsheetId={spreadsheetId}
              value={field.value ?? ''}
            />
          )}
        />
      </FormItem>
    </div>
  );
};

export { GoogleSheetConfigForm };
