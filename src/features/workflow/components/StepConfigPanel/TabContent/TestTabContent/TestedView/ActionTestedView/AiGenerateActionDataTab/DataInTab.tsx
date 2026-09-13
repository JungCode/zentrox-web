'use client';

import { useMemo } from 'react';

import { buildAiGenerateDataInFields } from '@/features/workflow/helpers';
import type {
  AiGenerateActionSampleData,
  AiGenerateNodeConfig,
} from '@/features/workflow/types';

import { SampleFieldItem } from '../SampleFieldItem';

interface DataInTabProps {
  config: AiGenerateNodeConfig | null | undefined;
  sample: AiGenerateActionSampleData | null | undefined;
}

const DataInTab = ({ config, sample }: DataInTabProps) => {
  const { emptyFields, filledFields } = useMemo(
    () => buildAiGenerateDataInFields(config, sample),
    [config, sample],
  );

  if (filledFields.length === 0 && emptyFields.length === 0) {
    return (
      <p className="text-on-surface-variant py-6 text-center text-xs">
        No inputs configured for this AI step
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {filledFields.map(({ label, value }) => (
        <SampleFieldItem key={label} label={label} value={value} />
      ))}

      {emptyFields.length > 0 && (
        <>
          <div className="border-border/60 my-3 border-t" />
          <p className="text-on-surface text-xs font-semibold">Empty inputs:</p>
          {emptyFields.map(({ label, value }) => (
            <SampleFieldItem key={label} label={label} muted value={value} />
          ))}
        </>
      )}
    </div>
  );
};

export { DataInTab };
