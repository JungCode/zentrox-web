import type { ZentroxAiOutputType } from '@/features/workflow/constants';
import type { UploadedFileRef } from '@/shared/types';
import type { VariableMeta } from '@/shared/types/baseform/token-input.types';

export interface ZentroxAiInputField {
  id: string;
  name: string;
  value: string;
  variableMeta?: VariableMeta;
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

export interface ZentroxAiConfigDraft {
  inputs: ZentroxAiInputField[];
  knowledgeFiles: ZentroxAiKnowledgeFile[];
  outputs: ZentroxAiOutputField[];
  systemPrompt: string;
}
