'use client';

import { useState } from 'react';

import { RECORD_LABELS } from '@/features/workflow/constants/triggerRecord';
import {
  useContinueWithTriggerRecord,
  useTriggerNodeRecords,
} from '@/features/workflow/hooks';
import type { NodeQueryData } from '@/features/workflow/types/graph';
import type { GoogleFormTriggerRecord } from '@/features/workflow/types/triggerRecord';
import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';

import { TestTabContentLayout } from '../../TestTabContentLayout';
import { RecordList } from './RecordList/RecordList';

interface TestedViewProps {
  node: NodeQueryData;
  workflowId: string;
}

const TriggerTestedView = ({ node, workflowId }: TestedViewProps) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string | undefined>(
    undefined,
  );

  const { loading, records, refetchRecords, sampleRecord } =
    useTriggerNodeRecords({ nodeId: node.id, workflowId });

  const sampleRecordData = sampleRecord?.data as GoogleFormTriggerRecord | null;
  const effectiveSelectedId = selectedRecordId ?? sampleRecordData?.responseId;

  const labeledRecords = records.map((record: unknown, i: number) => ({
    label: `Form Response ${RECORD_LABELS[i] ?? String(i + 1)}`,
    record: record as GoogleFormTriggerRecord,
  }));

  const { continueWithSelected, loading: selecting } =
    useContinueWithTriggerRecord({
      labeledRecords,
      nodeId: node.id,
      selectedRecordId: effectiveSelectedId,
      workflowId,
    });

  return (
    <TestTabContentLayout
      footer={
        <Button
          className="w-full"
          disabled={!effectiveSelectedId || selecting}
          onClick={continueWithSelected}
          size="lg"
          variant="secondary"
        >
          {selecting && <Spinner data-icon="inline-start" />}
          Continue with selected record
        </Button>
      }
    >
      <div className="space-y-3">
        <p className="text-on-surface-variant text-xs leading-relaxed">
          We found records in your Google Forms account. We will load up to 3
          most recent records, that have not appeared previously.{' '}
          <Button className="h-auto p-0 text-xs" variant="link">
            Learn more about test records
          </Button>
        </p>

        <Button
          className="w-full"
          onClick={() => refetchRecords()}
          variant="outline"
        >
          Find new records
        </Button>

        <RecordList
          loading={loading}
          onSelect={setSelectedRecordId}
          records={labeledRecords}
          sampleFetchedAt={sampleRecord?.fetchedAt}
          sampleResponseId={sampleRecordData?.responseId}
          selectedId={effectiveSelectedId}
        />
      </div>
    </TestTabContentLayout>
  );
};

export { TriggerTestedView };
