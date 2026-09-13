'use client';

import { useMemo } from 'react';

import { buildGoogleSheetDataOutFields } from '@/features/workflow/helpers';
import type { GoogleSheetActionSampleData } from '@/features/workflow/types';
import { Spinner } from '@/shared/components/ui/spinner';

import { SampleFieldItem } from '../SampleFieldItem';

interface DataOutTabProps {
  data: GoogleSheetActionSampleData | null | undefined;
  loading: boolean;
}

const DataOutTab = ({ data, loading }: DataOutTabProps) => {
  const fields = useMemo(() => buildGoogleSheetDataOutFields(data), [data]);

  return (
    <div className="space-y-3">
      {loading ? (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      ) : fields.length === 0 ? (
        <p className="text-on-surface-variant py-6 text-center text-xs">
          No output data available yet
        </p>
      ) : (
        <div className="space-y-1">
          {fields.map(({ label, value }) => (
            <SampleFieldItem key={label} label={label} value={value} />
          ))}
        </div>
      )}
    </div>
  );
};

export { DataOutTab };
