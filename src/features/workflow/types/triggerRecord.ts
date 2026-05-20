export interface GoogleFormTriggerRecordAnswer {
  questionId: string;
  questionTitle: string;
  respondentEmail?: string; // only present when the form requires Google sign-in
  textAnswers: {
    answers: Array<{ value: string }>;
  };
}

export interface GoogleFormTriggerRecord {
  answers: Record<string, GoogleFormTriggerRecordAnswer>;
  createTime: string;
  lastSubmittedTime: string;
  respondentEmail?: string; // only present when the form requires Google sign-in
  responseId: string;
}

export interface LabeledRecord {
  label: string;
  record: GoogleFormTriggerRecord;
}
