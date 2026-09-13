'use client';

import { useMemo } from 'react';

import { buildGoogleSheetDataInFields } from '@/features/workflow/helpers';
import type {
  GoogleSheetActionConfig,
  GoogleSheetActionSampleData,
} from '@/features/workflow/types';

import { SampleFieldItem } from '../SampleFieldItem';

interface DataInTabProps {
  config: GoogleSheetActionConfig | null | undefined;
  sample: GoogleSheetActionSampleData | null | undefined;
}

const DataInTab = ({ config, sample }: DataInTabProps) => {
  const { emptyFields, filledFields } = useMemo(
    () => buildGoogleSheetDataInFields(config, sample),
    [config, sample],
  );

  return (
    <div className="space-y-3">
      {filledFields.length === 0 && emptyFields.length === 0 ? (
        <p className="text-on-surface-variant py-6 text-center text-xs">
          No matching fields
        </p>
      ) : (
        <div className="space-y-1">
          {filledFields.map(({ label, value }) => (
            <SampleFieldItem key={label} label={label} value={value} />
          ))}

          {emptyFields.length > 0 && (
            <>
              <div className="border-border/60 my-3 border-t" />
              <p className="text-on-surface text-xs font-semibold">
                Empty fields:
              </p>
              {emptyFields.map(({ label, value }) => (
                <SampleFieldItem
                  key={label}
                  label={label}
                  muted
                  value={value}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export { DataInTab };
