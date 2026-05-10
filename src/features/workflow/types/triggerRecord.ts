interface GoogleFormTriggerRecordAnswer {
  questionId: string;
  questionTitle: string;
  textAnswers: {
    answers: Array<{ value: string }>;
  };
}

interface GoogleFormTriggerRecord {
  answers: Record<string, GoogleFormTriggerRecordAnswer>;
  createTime: string;
  lastSubmittedTime: string;
  responseId: string;
}

interface LabeledRecord {
  label: string;
  record: GoogleFormTriggerRecord;
}
export type {
  GoogleFormTriggerRecord,
  GoogleFormTriggerRecordAnswer,
  LabeledRecord,
};
