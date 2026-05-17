'use client';

import { type Path,useFormContext } from 'react-hook-form';

import { resolveDriveId } from '@/features/workflow/helpers';
import { useGoogleSheetHeaders } from '@/features/workflow/hooks';
import type {
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { FormGenerator } from '@/shared/components/BaseForm';
import { Input } from '@/shared/components/ui/input';
import { Spinner } from '@/shared/components/ui/spinner';
import type { FormField } from '@/shared/types';

import { GoogleDriveSelector } from './GoogleDriveSelector';
import { GoogleSpreadsheetSelector } from './GoogleSpreadsheetSelector';
import { GoogleWorksheetSelector } from './GoogleWorksheetSelector';

interface GoogleSheetConfigFormProps {
  node: NodeQueryData;
}

const GoogleSheetConfigForm = ({ node }: GoogleSheetConfigFormProps) => {
  const { setValue, watch } = useFormContext<StepConfigFormValues>();

  const { driveId, isDriveSelected } = resolveDriveId(
    watch('configJson.driveId'),
  );
  const integrationAccountId = node.integrationAccountId ?? '';
  const spreadsheetId = watch('configJson.spreadsheetId') ?? '';
  const worksheetName = watch('configJson.worksheetName') ?? '';

  const { headers, loading: headersLoading } = useGoogleSheetHeaders({
    integrationAccountId,
    spreadsheetId,
    worksheetTitle: worksheetName,
  });

  // useEffect(() => {
  //   if (headersLoading || headers.length === 0) return;
  //   const existing = watch('configJson.columnMappings') ?? [];
  //   setValue(
  //     'configJson.columnMappings',
  //     headers.map((h) => ({
  //       columnName: h.name,
  //       value: existing.find((m) => m.columnName === h.name)?.value ?? '',
  //     })),
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [headers, headersLoading]);

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
            setValue('configJson.columnMappings', []);
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
            setValue('configJson.columnMappings', []);
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
            setValue('configJson.columnMappings', []);
          }}
          side="left"
          spreadsheetId={spreadsheetId}
          value={(field.value as string) ?? ''}
        />
      ),
      required: true,
    },
    ...headers.map((header, index) => ({
      label: `${header.index}. ${header.name}`,
      name: `configJson.columnMappings.${index}.value` as Path<StepConfigFormValues>,
      render: (
        field: Parameters<FormField<StepConfigFormValues>['render']>[0],
      ) => (
        <Input
          placeholder={`Value for ${header.name}…`}
          {...field}
          value={(field.value as string) ?? ''}
        />
      ),
    })),
  ];

  return (
    <div className="space-y-4">
      <FormGenerator<StepConfigFormValues> fields={fields} />
      {headersLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export { GoogleSheetConfigForm };
