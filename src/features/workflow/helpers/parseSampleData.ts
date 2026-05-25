// src/features/workflow/helpers/parseSampleData.ts
//
// Converts raw upstream-node samples from the API into the
// `AvailableFieldGroup[]` structure the TokenInput's FieldPicker expects.
//
// One group per ancestor node, regardless of test status. Untested groups
// come through with an empty `fields` array and a non-`success`
// `connectionStatus` so the picker can flag them with a warning and let the
// user click through to test that step (Zapier-style data-mapping flow).

import {
  GOOGLE_FORM_BASE_FIELDS,
  ProviderAppMetadataRecord,
} from '@/features/workflow/constants';
import type {
  AiGenerateActionSampleData,
  GoogleFormTriggerRecord,
  GoogleFormTriggerRecordAnswer,
  GoogleSheetActionSampleData,
  NodeSample,
  PathsEvaluationSampleData,
  TriggerAnswerTokenPath,
} from '@/features/workflow/types';
import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';
import type { WorkflowVersionNodeSamplesQuery } from '@/shared/api/workflow/workflow.schemas';
import type {
  AvailableField,
  AvailableFieldGroup,
} from '@/shared/types/baseform/token-input.types';

import { getAnswerKind, getAnswerValue } from './triggerRecord';

// ─── Per-provider field parsers ──────────────────────────────────────────────

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

const parseGoogleFormSampleFields = (sample: NodeSample): AvailableField[] => {
  const data = (sample.sampleRecord?.data ?? {}) as GoogleFormTriggerRecord;

  const baseFields: AvailableField[] = GOOGLE_FORM_BASE_FIELDS.map(
    ({ key, label }) => ({
      fieldKey: key,
      fieldLabel: label,
      fieldPath: key,
      joinSeparator: null,
      nodeId: sample.nodeId,
      nodeLabel: sample.nodeLabel,
      nullFallback: null,
      previewValue: String(
        (data as unknown as Record<string, unknown>)[key] ?? '',
      ),
      valueKey: null,
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

/**
 * Google Sheet action samples store one top-level key per resolved column,
 * plus a `_meta` blob the picker should hide. The user can token-reference
 * those columns directly downstream (e.g. "{{sheetNode__Email}}").
 */
const parseGoogleSheetSampleFields = (sample: NodeSample): AvailableField[] => {
  const data = (sample.sampleRecord?.data ?? {}) as GoogleSheetActionSampleData;
  return scalarTopLevelFields(sample, data);
};

/**
 * AI Generate action samples expose user-declared outputs as top-level keys.
 * `_meta` is internal metadata and is skipped so the picker stays focused on
 * usable values.
 */
const parseAiGenerateSampleFields = (sample: NodeSample): AvailableField[] => {
  const data = (sample.sampleRecord?.data ?? {}) as AiGenerateActionSampleData;
  return scalarTopLevelFields(sample, data);
};

/**
 * Paths utility samples surface the picked branch — useful for downstream
 * nodes that want to annotate which path was taken (e.g. Slack message that
 * includes the matched branch label).
 */
const parsePathsSampleFields = (sample: NodeSample): AvailableField[] => {
  const data = (sample.sampleRecord?.data ?? {}) as PathsEvaluationSampleData;
  if (!sample.sampleRecord) return [];

  return [
    {
      fieldKey: 'matchedBranchLabel',
      fieldLabel: 'Matched branch label',
      fieldPath: 'matchedBranchLabel',
      joinSeparator: null,
      nodeId: sample.nodeId,
      nodeLabel: sample.nodeLabel,
      nullFallback: null,
      previewValue: String(data.matchedBranchLabel ?? ''),
      valueKey: null,
    },
    {
      fieldKey: 'matchedBranchId',
      fieldLabel: 'Matched branch id',
      fieldPath: 'matchedBranchId',
      joinSeparator: null,
      nodeId: sample.nodeId,
      nodeLabel: sample.nodeLabel,
      nullFallback: null,
      previewValue: String(data.matchedBranchId ?? ''),
      valueKey: null,
    },
  ];
};

// Shared helper for samples whose user-facing fields live at the top level
// of the JSON blob (Sheet, AI). Skips keys starting with `_` so run-trace /
// internal metadata never appears in the picker.
const scalarTopLevelFields = (
  sample: NodeSample,
  data: Record<string, unknown> | null | undefined,
): AvailableField[] => {
  if (!data) return [];
  return Object.entries(data)
    .filter(([key]) => !key.startsWith('_'))
    .map(([key, value]) => ({
      fieldKey: key,
      fieldLabel: key,
      fieldPath: key,
      joinSeparator: null,
      nodeId: sample.nodeId,
      nodeLabel: sample.nodeLabel,
      nullFallback: null,
      previewValue: toPreviewString(value),
      valueKey: null,
    }));
};

const toPreviewString = (value: unknown): string => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value).slice(0, 200);
    } catch {
      return '';
    }
  }
  return String(value);
};

// ─── Dispatcher ──────────────────────────────────────────────────────────────

/**
 * Pick the field-parser for a given sample's nodeType + providerApp. Returns
 * `[]` for genuinely-untested nodes (no stored sample) and for providers we
 * don't surface mapping for yet — both render in the picker as a warning row
 * so the user knows a step exists upstream, just without tokens to insert.
 */
const parseFieldsFor = (sample: NodeSample): AvailableField[] => {
  if (!sample.sampleRecord) return [];

  switch (sample.nodeType) {
    case WorkflowNodeType.Trigger:
      switch (sample.providerApp) {
        case WorkflowProviderApp.GoogleForm:
          return parseGoogleFormSampleFields(sample);
        default:
          return [];
      }

    case WorkflowNodeType.Action:
      switch (sample.providerApp) {
        case WorkflowProviderApp.GoogleSheet:
          return parseGoogleSheetSampleFields(sample);
        case WorkflowProviderApp.Ai:
          return parseAiGenerateSampleFields(sample);
        default:
          return [];
      }

    case WorkflowNodeType.Utility:
      switch (sample.providerApp) {
        case WorkflowProviderApp.Paths:
          return parsePathsSampleFields(sample);
        default:
          return [];
      }

    default:
      return [];
  }
};

// ─── Public entry point ──────────────────────────────────────────────────────

/**
 * Convert the BE's ancestor-sample list into picker-ready groups.
 *
 * Every ancestor — tested or not — gets a group; the picker uses the
 * `connectionStatus` field to render a warning + click-to-test affordance
 * for untested ones. Groups that are tested AND have no fields are filtered
 * out (e.g. a provider we don't surface mapping for yet) so the picker
 * doesn't show dead-weight rows.
 */
const parseSampleData = (
  samples: WorkflowVersionNodeSamplesQuery['workflowVersionNodeSamples'],
): AvailableFieldGroup[] =>
  samples
    .map((sample, index): AvailableFieldGroup | null => {
      const icon = sample.providerApp
        ? ProviderAppMetadataRecord[sample.providerApp]?.icon
        : undefined;

      const fields = parseFieldsFor(sample);
      const isTested = sample.connectionStatus === 'success';

      if (fields.length === 0 && isTested) return null;

      return {
        connectionStatus: sample.connectionStatus,
        fields,
        icon,
        nodeId: sample.nodeId,
        nodeLabel: sample.nodeLabel,
        stepNumber: index + 1,
      };
    })
    .filter((group): group is AvailableFieldGroup => group !== null);

export { parseSampleData };
