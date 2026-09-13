'use client';

import {
  type GoogleWorksheet,
  useGoogleWorksheets,
} from '@/features/workflow/hooks';
import { BaseSelector } from '@/shared/components/BaseForm';

import { GoogleWorksheetOption } from './GoogleWorksheetOption';
import { GoogleWorksheetSelectorLabel } from './GoogleWorksheetSelectorLabel';

interface GoogleWorksheetSelectorProps {
  integrationAccountId: string;
  onValueChange?: (value: string) => void;
  onWorksheetChange?: (worksheet: GoogleWorksheet) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  spreadsheetId: string | undefined;
  value?: string;
}

const GoogleWorksheetSelector = ({
  integrationAccountId,
  onValueChange,
  onWorksheetChange,
  side,
  spreadsheetId,
  value,
}: GoogleWorksheetSelectorProps) => {
  const { loading, worksheets } = useGoogleWorksheets({
    integrationAccountId,
    spreadsheetId,
  });

  const options = worksheets.map((ws) => ({
    data: ws,
    label: ws.title,
    value: String(ws.sheetId),
  }));

  const placeholder = loading ? 'Loading worksheets…' : 'Select worksheet…';

  return (
    <BaseSelector
      align="start"
      disabled={!spreadsheetId || loading}
      onValueChange={(selectedId) => {
        onValueChange?.(selectedId);

        const selected = worksheets.find(
          (ws) => String(ws.sheetId) === selectedId,
        );
        if (selected) onWorksheetChange?.(selected);
      }}
      options={options}
      placeholder={placeholder}
      renderLabel={(selectedOption) => (
        <GoogleWorksheetSelectorLabel
          loading={loading}
          placeholder={placeholder}
          selectedOption={selectedOption}
        />
      )}
      renderOption={(option) => <GoogleWorksheetOption option={option} />}
      side={side}
      value={value}
    />
  );
};

export { GoogleWorksheetSelector };
