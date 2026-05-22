// src/features/workflow/helpers/parse-sample-data.ts
// Converts raw workflow node sample records (fetched from the API) into the
// AvailableFieldGroup[] structure the TokenInput's field picker expects.
// Each workflow node/step type has its own shape, so parsing is done per-provider.
import {
  GOOGLE_FORM_BASE_FIELDS,
  ProviderAppMetadataRecord,
} from '@/features/workflow/constants';
import type {
  GoogleFormTriggerRecordAnswer,
  NodeSample,
  TriggerAnswerTokenPath,
} from '@/features/workflow/types';
import { WorkflowProviderApp } from '@/shared/api/base.schemas';
import type { WorkflowVersionNodeSamplesQuery } from '@/shared/api/workflow/workflow.schemas';
import type {
  AvailableField,
  AvailableFieldGroup,
} from '@/shared/types/baseform/token-input.types';

import { resolveSampleDataJson } from './configJson';
import { getAnswerKind, getAnswerValue } from './triggerRecord';

const resolveAnswerFieldPath = (
  questionId: string,
  answer: GoogleFormTriggerRecordAnswer,
): TriggerAnswerTokenPath => {
  switch (getAnswerKind(answer)) {
    case 'text':
      return {
        fieldPath: `answers.${questionId}.textAnswers.answers`,
        valueKey: 'value',
      };
    case 'fileUpload':
      return {
        fieldPath: `answers.${questionId}.fileUploadAnswers.answers`,
        valueKey: 'fileName',
      };
    default:
      return { fieldPath: `answers.${questionId}`, valueKey: null };
  }
};

// Parses a Google Form response sample into a flat list of AvailableFields.
// The sample record has two layers of fields:
//   1. Base fields (responseId, createTime, etc.) — fixed, defined above
//   2. Answer fields — one per question in the form, keyed by Google's questionId
//
// Answer fields use a nested path because the Google Forms API wraps answers in:
//   answers[questionId].textAnswers.answers  (an array of { value: string } objects)
// The valueKey="value" tells the executor to pluck the "value" property from each item.
// joinSeparator=null means it takes only the first answer (single-select / text fields).
const parseSampleFields = (sample: NodeSample): AvailableField[] => {
  const data = resolveSampleDataJson(sample);

  const baseFields: AvailableField[] = GOOGLE_FORM_BASE_FIELDS.map(
    ({ key, label }) => ({
      fieldKey: key,
      fieldLabel: label,
      fieldPath: key, // top-level key, no nesting needed
      joinSeparator: null,
      nodeId: sample.nodeId,
      nodeLabel: sample.nodeLabel,
      nullFallback: null,
      previewValue: String(data[key] ?? ''), // populate from sample so picker shows real values
      valueKey: null, // not an array-of-objects — take the value directly
    }),
  );

  const answerFields: AvailableField[] = Object.entries(data.answers ?? {}).map(
    ([questionId, answer]) => {
      const { fieldPath, valueKey } = resolveAnswerFieldPath(
        questionId,
        answer,
      );
      return {
        fieldKey: questionId,
        fieldLabel: answer.questionTitle ?? questionId,
        fieldPath,
        joinSeparator: null,
        nodeId: sample.nodeId,
        nodeLabel: sample.nodeLabel,
        nullFallback: null,
        previewValue: getAnswerValue(answer),
        valueKey,
      };
    },
  );

  return [...baseFields, ...answerFields];
};

// ─── Parser ───────────────────────────────────────────────────────────────────

// Main entry point. Takes the raw array of node samples from the API and returns
// one AvailableFieldGroup per supported provider node.
//
// Nodes with unsupported providerApp types (or empty field lists) are filtered out
// so the picker never shows an empty or unknown group.
const parseSampleData = (
  samples: WorkflowVersionNodeSamplesQuery['workflowVersionNodeSamples'],
): AvailableFieldGroup[] =>
  samples
    .map((sample): AvailableFieldGroup | null => {
      switch (sample.providerApp) {
        case WorkflowProviderApp.GoogleForm:
          return {
            fields: parseSampleFields(sample),
            icon: ProviderAppMetadataRecord[WorkflowProviderApp.GoogleForm]
              .icon,
            nodeId: sample.nodeId,
            nodeLabel: sample.nodeLabel,
          };
        // Other provider types (e.g. GoogleSheet action nodes) are not trigger
        // sources and don't produce sample data the user can reference, so they
        // fall through to null and are filtered out below.
        default:
          return null;
      }
    })
    .filter(
      (group): group is AvailableFieldGroup =>
        !!group && group.fields.length > 0,
    );

export { parseSampleData };
