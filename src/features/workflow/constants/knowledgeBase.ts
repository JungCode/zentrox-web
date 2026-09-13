import { MB, UploadFormat } from '@/shared/constants';

export const KNOWLEDGE_BASE_FOLDER = 'zentrox/knowledge-base';

export const KNOWLEDGE_BASE_MAX_FILE_BYTES = 10 * MB;

export const KNOWLEDGE_BASE_ALLOWED_FORMATS = [
  UploadFormat.PDF,
  UploadFormat.MARKDOWN,
  UploadFormat.MARKDOWN_LONG,
  UploadFormat.TEXT,
] as const;

export type KnowledgeBaseAllowedFormat =
  (typeof KNOWLEDGE_BASE_ALLOWED_FORMATS)[number];
