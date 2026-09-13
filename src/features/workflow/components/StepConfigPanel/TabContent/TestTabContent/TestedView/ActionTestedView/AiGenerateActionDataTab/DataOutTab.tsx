'use client';

import { useMemo } from 'react';

import { buildAiGenerateDataOutFields } from '@/features/workflow/helpers';
import type { AiGenerateActionSampleData } from '@/features/workflow/types';
import { Spinner } from '@/shared/components/ui/spinner';

import { SampleFieldItem } from '../SampleFieldItem';

interface DataOutTabProps {
  data: AiGenerateActionSampleData | null | undefined;
  loading: boolean;
}

const DataOutTab = ({ data, loading }: DataOutTabProps) => {
  const fields = useMemo(() => buildAiGenerateDataOutFields(data), [data]);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Spinner />
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <p className="text-on-surface-variant py-6 text-center text-xs">
        No output produced yet — run the test to see the model output
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {fields.map(({ label, value }) => (
        <SampleFieldItem key={label} label={label} value={value} />
      ))}
    </div>
  );
};

export { DataOutTab };
