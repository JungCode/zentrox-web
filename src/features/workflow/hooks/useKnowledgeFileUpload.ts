'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';

import {
  KNOWLEDGE_BASE_ALLOWED_FORMATS,
  KNOWLEDGE_BASE_FOLDER,
  KNOWLEDGE_BASE_MAX_FILE_BYTES,
} from '@/features/workflow/constants';
import type { AiGenerateKnowledgeFile } from '@/features/workflow/types';
import { type CloudinaryUploadResult, toUploadedFileRef } from '@/shared/types';
import { generateId } from '@/shared/utils';

const useKnowledgeFileUpload = (
  onAdd: (file: AiGenerateKnowledgeFile) => void,
) => {
  const handleUploaded = (result: CloudinaryUploadResult) => {
    onAdd({
      file: toUploadedFileRef(result),
      id: generateId(),
      name: `${result.originalFilename}.${result.format}`,
    });
  };

  const handleError = (error: Error) => {
    toast.error('Upload failed.', { description: error.message });
  };

  return useMemo(
    () => ({
      clientAllowedFormats: [...KNOWLEDGE_BASE_ALLOWED_FORMATS],
      folder: KNOWLEDGE_BASE_FOLDER,
      handleError,
      handleUploaded,
      maxFileSize: KNOWLEDGE_BASE_MAX_FILE_BYTES,
    }),
    // Identity is stable; onAdd is the only changing input we depend on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onAdd],
  );
};

export { useKnowledgeFileUpload };
