'use client';

import { PlusIcon } from '@phosphor-icons/react';

import type { ZentroxAiKnowledgeFile } from '@/features/workflow/types';
import { FormItem } from '@/shared/components/BaseForm';
import { Button } from '@/shared/components/ui/button';

import { KnowledgeFileItem } from './KnowledgeFileItem';

interface KnowledgeBaseSectionProps {
  files: ZentroxAiKnowledgeFile[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

const KnowledgeBaseSection = ({
  files,
  onAdd,
  onRemove,
}: KnowledgeBaseSectionProps) => {
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
                file={file}
                key={file.id}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
        <Button className="w-full" onClick={onAdd} size="sm" variant="outline">
          <PlusIcon data-icon="inline-start" size={14} />
          Add document
        </Button>
      </div>
    </FormItem>
  );
};

export { KnowledgeBaseSection };
