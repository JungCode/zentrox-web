import type { GoogleFormTriggerRecord } from '@/features/workflow/types';

interface RecordField {
  label: string;
  value: string;
}

const buildTriggerRecordFields = (
  record: GoogleFormTriggerRecord,
): RecordField[] => {
  const systemFields: RecordField[] = [
    { label: 'Response Id', value: record.responseId },
    { label: 'Create Time', value: record.createTime },
    { label: 'Last Submitted Time', value: record.lastSubmittedTime },
  ];

  const answerFields: RecordField[] = Object.entries(record.answers ?? {}).map(
    ([, answer]) => ({
      label: `Question ${answer.questionTitle}`,
      value: answer.textAnswers.answers.map((a) => a.value).join(', '),
    }),
  );

  return [...systemFields, ...answerFields];
};

export { buildTriggerRecordFields };
export type { RecordField };
