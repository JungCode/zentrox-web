// src/features/workflow/helpers/parse-sample-data.ts
import { ProviderAppMetadataRecord } from '@/features/workflow/constants';
import { WorkflowProviderApp } from '@/shared/api/workflow/schemas';
import type { WorkflowVersionNodeSamplesQuery } from '@/shared/api/workflow/workflow.schemas';
import type {
  AvailableField,
  AvailableFieldGroup,
} from '@/shared/types/baseform/token-input.types';

type NodeSample =
  WorkflowVersionNodeSamplesQuery['workflowVersionNodeSamples'][number];

// ─── Google Form ─────────────────────────────────────────────────────────────

const GOOGLE_FORM_BASE_FIELDS: { key: string; label: string }[] = [
  { key: 'responseId', label: 'Response ID' },
  { key: 'createTime', label: 'Create Time' },
  { key: 'lastSubmittedTime', label: 'Last Submitted Time' },
  { key: 'respondentEmail', label: 'Respondent Email' },
];

const parseGoogleFormSample = (sample: NodeSample): AvailableField[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: Record<string, any> = sample.sampleRecord?.data ?? {};

  const baseFields: AvailableField[] = GOOGLE_FORM_BASE_FIELDS.map(
    ({ key, label }) => ({
      fieldKey: key,
      fieldLabel: label,
      nodeId: sample.nodeId,
      nodeLabel: sample.nodeLabel,
      previewValue: String(data[key] ?? ''),
    }),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const answers: Record<string, any> = data.answers ?? {};
  const answerFields: AvailableField[] = Object.entries(answers).map(
    ([questionId, answer]) => ({
      fieldKey: questionId,
      fieldLabel: String(answer?.question?.title ?? questionId),
      nodeId: sample.nodeId,
      nodeLabel: sample.nodeLabel,
      previewValue: String(answer?.textAnswers?.answers?.[0]?.value ?? ''),
    }),
  );

  return [...baseFields, ...answerFields];
};

// ─── Parser ───────────────────────────────────────────────────────────────────

const parseSampleData = (
  samples: WorkflowVersionNodeSamplesQuery['workflowVersionNodeSamples'],
): AvailableFieldGroup[] =>
  samples
    .map((sample): AvailableFieldGroup | null => {
      switch (sample.providerApp) {
        case WorkflowProviderApp.GoogleForm:
          return {
            fields: parseGoogleFormSample(sample),
            icon: ProviderAppMetadataRecord[WorkflowProviderApp.GoogleForm]
              .icon,
            nodeId: sample.nodeId,
            nodeLabel: sample.nodeLabel,
          };
        default:
          return null;
      }
    })
    .filter((g): g is AvailableFieldGroup => g !== null && g.fields.length > 0);

export { parseSampleData };
