'use client';

import type { LabeledRecord } from '@/features/workflow/types';
import { Spinner } from '@/shared/components/ui/spinner';

import { RecordItem } from './RecordItem/RecordItem';

interface RecordListProps {
  loading: boolean;
  onSelect: (responseId: string) => void;
  records: LabeledRecord[];
  sampleFetchedAt: string | undefined;
  sampleResponseId: string | undefined;
  selectedId: string | undefined;
}

const RecordList = ({
  loading,
  onSelect,
  records,
  sampleFetchedAt,
  sampleResponseId,
  selectedId,
}: RecordListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {records.map(({ label, record }) => (
        <RecordItem
          fetchedAt={
            record.responseId === sampleResponseId ? sampleFetchedAt : undefined
          }
          isSelected={record.responseId === selectedId}
          key={record.responseId}
          label={label}
          onClick={() => onSelect(record.responseId)}
          record={record}
        />
      ))}
    </div>
  );
};

export { RecordList };
