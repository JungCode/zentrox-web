'use client';

import { type Path, useFormContext } from 'react-hook-form';

import { resolveDriveId } from '@/features/workflow/helpers';
import {
  GoogleSheetColumnHeader,
  useGoogleSheetForm,
  useGoogleSheetHeaders,
} from '@/features/workflow/hooks';
import type {
  GoogleSheetColumnMapping,
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { FormGenerator, TokenInput } from '@/shared/components/BaseForm';
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
  const { resetColumnMappings, resetSpreadsheet, resetWorksheet } =
    useGoogleSheetForm();

  const integrationAccountId = node.integrationAccountId ?? '';
  const spreadsheetId = watch('configJson.spreadsheetId') ?? '';
  const worksheetName = watch('configJson.worksheetName') ?? '';

  const { driveId, isDriveSelected } = resolveDriveId(
    watch('configJson.driveId'),
  );

  const initColumnFormValues = (initHeaders: GoogleSheetColumnHeader[]) => {
    const existing = watch('configJson.columnMappings') ?? [];

    const mappings = initHeaders.map((h) => {
      const existingValue =
        existing.find((m) => m?.columnName === h.name)?.value ?? '';

      return { columnName: h.name, value: existingValue };
    });

    resetColumnMappings(mappings);
  };

  const { headers, loading: headersLoading } = useGoogleSheetHeaders({
    integrationAccountId,
    onComplete: initColumnFormValues,
    spreadsheetId,
    worksheetTitle: worksheetName,
  });

  const headerFields: FormField<StepConfigFormValues>[] = headers.map(
    (header, index) => ({
      label: `${header.index}. ${header.name}`,
      name: `configJson.columnMappings.${index}` as Path<StepConfigFormValues>,
      render: (
        field: Parameters<FormField<StepConfigFormValues>['render']>[0],
      ) => {
        const mapping = field.value as GoogleSheetColumnMapping | undefined;
        return (
          <TokenInput
            nodeId={node.id}
            onChange={(val, meta) => {
              console.log({ meta, val });
              field.onChange({
                columnName: header.name,
                value: val,
                variableMeta: meta,
              });
            }}
            placeholder={`Enter text or insert data`}
            value={mapping?.value ?? ''}
            variableMeta={mapping?.variableMeta}
            workflowVersionId={node.workflowVersionId}
          />
        );
      },
    }),
  );

  const fields: FormField<StepConfigFormValues>[] = [
    {
      label: 'Drive',
      name: 'configJson.driveId',
      render: (field) => (
        <GoogleDriveSelector
          integrationAccountId={integrationAccountId}
          onValueChange={(val) => {
            field.onChange(val?.id ?? null);

            if (val === null) {
              setValue('configJson.driveName', 'My Drive');
            } else {
              setValue('configJson.driveName', val.name);
            }
            resetSpreadsheet();
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
            resetWorksheet();
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
          onWorksheetChange={(workSheet) => {
            setValue('configJson.worksheetName', workSheet.title);
            resetColumnMappings();
          }}
          side="left"
          spreadsheetId={spreadsheetId}
          value={(field.value as string) ?? ''}
        />
      ),
      required: true,
    },
    ...headerFields,
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
