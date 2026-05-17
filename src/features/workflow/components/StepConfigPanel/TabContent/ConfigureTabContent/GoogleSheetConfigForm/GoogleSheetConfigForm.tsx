'use client';

import { useFormContext } from 'react-hook-form';

import { resolveDriveId } from '@/features/workflow/helpers';
import type {
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { FormGenerator } from '@/shared/components/BaseForm';
import type { FormField } from '@/shared/types';

import { GoogleDriveSelector } from './GoogleDriveSelector';
import { GoogleSpreadsheetSelector } from './GoogleSpreadsheetSelector';
import { GoogleWorksheetSelector } from './GoogleWorksheetSelector';

interface GoogleSheetConfigFormProps {
  node: NodeQueryData;
}

const GoogleSheetConfigForm = ({ node }: GoogleSheetConfigFormProps) => {
  const { setValue, watch } = useFormContext<StepConfigFormValues>();

  const integrationAccountId = node.integrationAccountId ?? '';
  const { driveId, isDriveSelected } = resolveDriveId(
    watch('configJson.driveId'),
  );
  const spreadsheetId = watch('configJson.spreadsheetId');

  const fields: FormField<StepConfigFormValues>[] = [
    {
      label: 'Drive',
      name: 'configJson.driveId',
      render: (field) => (
        <GoogleDriveSelector
          integrationAccountId={integrationAccountId}
          onValueChange={(val) => {
            field.onChange(val);
            setValue('configJson.driveName', val === null ? 'My Drive' : '');
            setValue('configJson.spreadsheetId', '');
            setValue('configJson.spreadsheetName', '');
            setValue('configJson.worksheetId', '');
            setValue('configJson.worksheetName', '');
          }}
          side="left"
          value={field.value as string | null | undefined}
        />
      ),
      required: true,
    },
    {
      label: 'Spreadsheet',
      name: 'configJson.spreadsheetId',
      render: (field) => (
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
          value={(field.value as string) ?? ''}
        />
      ),
      required: true,
    },
    {
      label: 'Worksheet',
      name: 'configJson.worksheetId',
      render: (field) => (
        <GoogleWorksheetSelector
          integrationAccountId={integrationAccountId}
          onValueChange={field.onChange}
          onWorksheetChange={(ws) => {
            setValue('configJson.worksheetName', ws.title);
          }}
          side="left"
          spreadsheetId={spreadsheetId}
          value={(field.value as string) ?? ''}
        />
      ),
      required: true,
    },
  ];

  return <FormGenerator<StepConfigFormValues> fields={fields} />;
};

export { GoogleSheetConfigForm };
