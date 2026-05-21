export interface TriggerRecordTextAnswers {
  answers: Array<{ value: string }>;
}

export interface TriggerRecordUploadedFile {
  fileId: string;
  fileName: string;
  mimeType: string;
}

export interface TriggerRecordFileUploadAnswers {
  answers: TriggerRecordUploadedFile[];
}

export type TriggerRecordAnswerKind = 'fileUpload' | 'text' | 'unknown';

export interface TriggerAnswerTokenPath {
  fieldPath: string;
  valueKey: null | string;
}

export interface GoogleFormTriggerRecordAnswer {
  fileUploadAnswers?: TriggerRecordFileUploadAnswers;
  questionId: string;
  questionTitle: string;
  respondentEmail?: string; // only present when the form requires Google sign-in
  textAnswers?: TriggerRecordTextAnswers;
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
