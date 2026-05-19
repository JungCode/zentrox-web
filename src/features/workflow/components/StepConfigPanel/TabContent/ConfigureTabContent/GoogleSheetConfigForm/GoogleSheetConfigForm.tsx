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
import { createTypedSetValue } from '@/shared/helpers';
import type { FormField } from '@/shared/types';

import { GoogleDriveSelector } from './GoogleDriveSelector';
import { GoogleSpreadsheetSelector } from './GoogleSpreadsheetSelector';
import { GoogleWorksheetSelector } from './GoogleWorksheetSelector';

interface GoogleSheetConfigFormProps {
  node: NodeQueryData;
}

const GoogleSheetConfigForm = ({ node }: GoogleSheetConfigFormProps) => {
  // useFormContext gives access to the react-hook-form instance created by the
  // parent StepConfigPanel. All fields here write into the shared form state.
  const { setValue, watch } = useFormContext<StepConfigFormValues>();
  const setTypedValue = createTypedSetValue<StepConfigFormValues>(setValue);

  // Helper functions for resetting dependent fields when a parent selector changes.
  // Changing Drive → must reset Spreadsheet + Worksheet + column mappings
  // Changing Spreadsheet → must reset Worksheet + column mappings
  // Changing Worksheet → must reset column mappings only
  const { resetColumnMappings, resetSpreadsheet, resetWorksheet } =
    useGoogleSheetForm();

  const integrationAccountId = node.integrationAccountId ?? '';

  // Watch these values reactively so dependent selectors can re-fetch when they change.
  const spreadsheetId = watch('configJson.spreadsheetId') ?? '';
  const worksheetName = watch('configJson.worksheetName') ?? '';

  // resolveDriveId normalizes the driveId field:
  //   null / undefined → isDriveSelected=false, driveId=undefined (means "My Drive")
  //   a real drive ID → isDriveSelected=true, driveId=<the id>
  // We disable the Spreadsheet selector until a drive is confirmed selected.
  const { driveId, isDriveSelected } = resolveDriveId(
    watch('configJson.driveId'),
  );

  // Called by useGoogleSheetHeaders once headers are loaded (or reloaded after worksheet change).
  // We merge the freshly-fetched headers with any existing column mappings so that:
  //   - columns that already have a value/variableMeta keep their data
  //   - new columns (e.g. a column was added to the sheet) get empty entries
  //   - removed columns are dropped (they won't appear in initHeaders)
  const initColumnFormValues = (initHeaders: GoogleSheetColumnHeader[]) => {
    const existing = watch('configJson.columnMappings') ?? [];

    const mappings = initHeaders.map((h) => {
      const existingMapping = existing.find((m) => m?.columnName === h.name);
      return {
        columnIndex: h.index,
        columnName: h.name,
        value: existingMapping?.value ?? '',
        variableMeta: existingMapping?.variableMeta ?? {},
      };
    });

    resetColumnMappings(mappings);
  };

  // Fetches the column headers for the currently-selected worksheet.
  // onComplete fires after the headers are loaded, which triggers initColumnFormValues
  // to sync the form's columnMappings array with the real columns.
  const { headers, loading: headersLoading } = useGoogleSheetHeaders({
    integrationAccountId,
    onComplete: initColumnFormValues,
    spreadsheetId,
    worksheetTitle: worksheetName,
  });

  // Build one FormField per worksheet column. Each renders a TokenInput so the
  // user can type plain text or insert variable tokens from upstream trigger data.
  //
  // The form field name is `configJson.columnMappings.${index}` — the entire
  // GoogleSheetColumnMapping object is stored as the field value, not just the string.
  // This is why onChange wraps val + meta back into the full mapping shape before
  // calling field.onChange, rather than passing val directly.
  const sheetHeaderFields: FormField<StepConfigFormValues>[] = headers.map(
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
            onChange={(val, meta) =>
              // Reconstruct the full mapping object so react-hook-form stores all
              // fields (columnIndex, columnName, value, variableMeta) atomically
              field.onChange({
                columnIndex: header.index,
                columnName: header.name,
                value: val,
                variableMeta: meta,
              })
            }
            placeholder={`Enter text or insert data`}
            value={mapping?.value ?? ''}
            variableMeta={mapping?.variableMeta}
            workflowVersionId={node.workflowVersionId}
          />
        );
      },
    }),
  );

  const googleDriveField: FormField<StepConfigFormValues> = {
    label: 'Drive',
    name: 'configJson.driveId',
    render: (field) => (
      <GoogleDriveSelector
        integrationAccountId={integrationAccountId}
        onValueChange={(val) => {
          // Store the drive ID (null for My Drive) and sync the display name separately,
          // then wipe the spreadsheet/worksheet selections since they're drive-specific.
          field.onChange(val?.id ?? null);

          if (val === null) {
            setTypedValue('configJson.driveName', 'My Drive');
          } else {
            setTypedValue('configJson.driveName', val.name);
          }
          resetSpreadsheet(); // also resets worksheet and columnMappings transitively
        }}
        side="left"
        value={field.value as string | null | undefined}
      />
    ),
    required: true,
  };

  const googleSpreadsheetField: FormField<StepConfigFormValues> = {
    label: 'Spreadsheet',
    name: 'configJson.spreadsheetId',
    render: (field) => (
      <GoogleSpreadsheetSelector
        driveId={driveId}
        // Pass an empty integrationAccountId when no drive is selected to prevent
        // the selector from fetching (it would use the wrong scope).
        integrationAccountId={isDriveSelected ? integrationAccountId : ''}
        onSpreadsheetChange={(sheet) => {
          setTypedValue('configJson.spreadsheetName', sheet.name);
          resetWorksheet(); // also resets columnMappings
        }}
        onValueChange={field.onChange}
        side="left"
        value={(field.value as string) ?? ''}
      />
    ),
    required: true,
  };

  const googleWorksheetField: FormField<StepConfigFormValues> = {
    label: 'Worksheet',
    name: 'configJson.worksheetId',
    render: (field) => (
      <GoogleWorksheetSelector
        integrationAccountId={integrationAccountId}
        onValueChange={field.onChange}
        onWorksheetChange={(workSheet) => {
          // Store the worksheet title (needed by the headers query which uses title, not ID)
          // and clear column mappings since the new worksheet may have different columns.
          setTypedValue('configJson.worksheetName', workSheet.title);
          resetColumnMappings();
        }}
        side="left"
        spreadsheetId={spreadsheetId}
        value={(field.value as string) ?? ''}
      />
    ),
    required: true,
  };

  // The static Drive/Spreadsheet/Worksheet selectors come first, followed by
  // the dynamic per-column TokenInput fields that only appear once headers are loaded.
  const fields: FormField<StepConfigFormValues>[] = [
    googleDriveField,
    googleSpreadsheetField,
    googleWorksheetField,
    // Dynamic column fields — only present after headers have been loaded
    ...sheetHeaderFields,
  ];

  return (
    <div className="space-y-4">
      <FormGenerator<StepConfigFormValues> fields={fields} />
      {/* Show a spinner while the worksheet headers are being fetched.
          The spinner appears below the existing fields so the Drive/Spreadsheet/Worksheet
          selectors remain visible and usable during loading. */}
      {headersLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export { GoogleSheetConfigForm };
