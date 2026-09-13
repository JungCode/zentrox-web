'use client';

import {
  type GoogleSpreadsheet,
  useGoogleSpreadsheets,
} from '@/features/workflow/hooks';
import { BaseSelector } from '@/shared/components/BaseForm';

import { GoogleSpreadsheetOption } from './GoogleSpreadsheetOption';
import { GoogleSpreadsheetSelectorLabel } from './GoogleSpreadsheetSelectorLabel';

interface GoogleSpreadsheetSelectorProps {
  driveId: string | null | undefined;
  integrationAccountId: string;
  onSpreadsheetChange?: (spreadsheet: GoogleSpreadsheet) => void;
  onValueChange?: (value: string) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  value?: string;
}

const GoogleSpreadsheetSelector = ({
  driveId,
  integrationAccountId,
  onSpreadsheetChange,
  onValueChange,
  side,
  value,
}: GoogleSpreadsheetSelectorProps) => {
  const { loading, spreadsheets } = useGoogleSpreadsheets({
    driveId,
    integrationAccountId,
  });

  const options = spreadsheets.map((sheet) => ({
    data: sheet,
    label: sheet.name,
    value: sheet.id,
  }));

  const placeholder = loading ? 'Loading spreadsheets…' : 'Select spreadsheet…';

  return (
    <BaseSelector
      align="center"
      disabled={driveId === undefined || loading}
      onValueChange={(selectedId) => {
        onValueChange?.(selectedId);

        const selected = spreadsheets.find((s) => s.id === selectedId);
        if (selected) onSpreadsheetChange?.(selected);
      }}
      options={options}
      placeholder={placeholder}
      renderLabel={(selectedOption) => (
        <GoogleSpreadsheetSelectorLabel
          loading={loading}
          placeholder={placeholder}
          selectedOption={selectedOption}
        />
      )}
      renderOption={(option) => <GoogleSpreadsheetOption option={option} />}
      side={side}
      value={value}
    />
  );
};

export { GoogleSpreadsheetSelector };
