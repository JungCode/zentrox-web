'use client';

import { useKnowledgeFileUpload } from '@/features/workflow/hooks';
import type { AiGenerateKnowledgeFile } from '@/features/workflow/types';
import { FormItem } from '@/shared/components/BaseForm';
import { CloudinaryUploader } from '@/shared/components/CloudinaryUploader';

import { KnowledgeFileItem } from './KnowledgeFileItem';

interface KnowledgeBaseSectionProps {
  files: AiGenerateKnowledgeFile[];
  onAdd: (file: AiGenerateKnowledgeFile) => void;
  onRemove: (id: string) => void;
}

const KnowledgeBaseSection = ({
  files,
  onAdd,
  onRemove,
}: KnowledgeBaseSectionProps) => {
  const {
    clientAllowedFormats,
    folder,
    handleError,
    handleUploaded,
    maxFileSize,
  } = useKnowledgeFileUpload(onAdd);

  return (
    <FormItem
      label="Knowledge base"
      legend="Attach reference documents the model can ground its answers on. Supported formats: PDF, Markdown, text."
    >
      <div className="space-y-2">
        {files.length > 0 && (
          <div className="space-y-1.5">
            {files.map((file) => (
              <KnowledgeFileItem
                key={file.id}
                onRemove={onRemove}
                zentroxFile={file}
              />
            ))}
          </div>
        )}
        <CloudinaryUploader
          clientAllowedFormats={clientAllowedFormats}
          description="PDF, Markdown or text up to 10MB"
          folder={folder}
          maxFileSize={maxFileSize}
          multiple
          onError={handleError}
          onUploaded={handleUploaded}
          resourceType="auto"
          title="Click to upload or drag & drop a document"
        />
      </div>
    </FormItem>
  );
};

export { KnowledgeBaseSection };
