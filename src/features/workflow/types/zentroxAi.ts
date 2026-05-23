import type { ZentroxAiOutputType } from '@/features/workflow/constants';
import type { UploadedFileRef } from '@/shared/types';
import type { TokenizedValue } from '@/shared/types/baseform/token-input.types';

/**
 * One named input. Extends TokenizedValue so the BE token resolver can
 * interpolate `{{nodeId__tokenKey}}` tokens inside `value` at execution time,
 * identical to how GoogleSheetColumnMapping is resolved.
 */
export interface ZentroxAiInputField extends TokenizedValue {
  id: string;
  /** Variable name referenced from the system prompt, e.g. "candidate_resume". */
  name: string;
}

export interface ZentroxAiOutputField {
  description: string;
  id: string;
  name: string;
  required: boolean;
  type: ZentroxAiOutputType;
}

export interface ZentroxAiKnowledgeFile {
  file: UploadedFileRef;
  id: string;
  name: string;
}

/**
 * Full configuration object persisted for a Zentrox AI action node — the FE
 * mirror of the BE ZentroxAiActionConfig. Drives ZentroxAiConfigForm via
 * react-hook-form (under `configJson` in StepConfigFormValues).
 */
export interface ZentroxAiActionConfig {
  inputs: ZentroxAiInputField[];
  knowledgeFiles: ZentroxAiKnowledgeFile[];
  outputs: ZentroxAiOutputField[];
  systemPrompt: string;
}
