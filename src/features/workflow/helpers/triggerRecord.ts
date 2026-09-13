import type {
  GoogleFormTriggerRecord,
  GoogleFormTriggerRecordAnswer,
  TriggerRecordAnswerKind,
} from '@/features/workflow/types';

interface RecordField {
  label: string;
  value: string;
}

const getAnswerKind = (
  answer: GoogleFormTriggerRecordAnswer,
): TriggerRecordAnswerKind => {
  if (answer.textAnswers) return 'text';
  if (answer.fileUploadAnswers) return 'fileUpload';
  return 'unknown';
};

const getAnswerValue = (answer: GoogleFormTriggerRecordAnswer): string => {
  switch (getAnswerKind(answer)) {
    case 'text':
      return (
        answer.textAnswers?.answers.map((a) => a.value).join(', ') ?? 'N/A'
      );
    case 'fileUpload':
      return (
        answer.fileUploadAnswers?.answers.map((a) => a.fileName).join(', ') ??
        'N/A'
      );
    default:
      return 'N/A';
  }
};

const buildTriggerRecordFields = (
  record: GoogleFormTriggerRecord,
): RecordField[] => {
  const systemFields: RecordField[] = [
    { label: 'Response Id', value: record.responseId },
    { label: 'Create Time', value: record.createTime },
    { label: 'Last Submitted Time', value: record.lastSubmittedTime },
    { label: 'Respondent Email', value: record.respondentEmail ?? 'N/A' },
  ];

  const answerFields: RecordField[] = Object.entries(record.answers ?? {}).map(
    ([, answer]) => ({
      label: `Question ${answer.questionTitle}`,
      value: getAnswerValue(answer),
    }),
  );

  return [...systemFields, ...answerFields];
};

export { buildTriggerRecordFields, getAnswerKind, getAnswerValue };
export type { RecordField };
