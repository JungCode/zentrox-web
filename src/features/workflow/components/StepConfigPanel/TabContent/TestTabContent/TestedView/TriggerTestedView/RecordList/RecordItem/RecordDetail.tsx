'use client';

import { buildTriggerRecordFields } from '@/features/workflow/helpers';
import type { GoogleFormTriggerRecord } from '@/features/workflow/types';

interface RecordDetailProps {
  record: GoogleFormTriggerRecord;
}

const RecordDetail = ({ record }: RecordDetailProps) => {
  const fields = buildTriggerRecordFields(record);

  return (
    <div className="divide-border/60 divide-y">
      {fields.map(({ label, value }) => (
        <div
          className="flex items-start gap-2 truncate py-2 first:pt-0 last:pb-0"
          key={label}
        >
          <span className="bg-surface-container text-on-surface-variant shrink-0 truncate rounded px-2 py-0.5 text-xs font-medium">
            {label}
          </span>
          <p className="text-on-surface truncate text-xs break-all">{value}</p>
        </div>
      ))}
    </div>
  );
};

export { RecordDetail };
