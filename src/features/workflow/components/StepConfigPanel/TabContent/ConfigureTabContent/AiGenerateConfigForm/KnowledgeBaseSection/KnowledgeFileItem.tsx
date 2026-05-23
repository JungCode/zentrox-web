'use client';

import { FileTextIcon, TrashIcon } from '@phosphor-icons/react';

import type { AiGenerateKnowledgeFile } from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';
import { formatBytes } from '@/shared/utils';

interface KnowledgeFileItemProps {
  onRemove: (id: string) => void;
  zentroxFile: AiGenerateKnowledgeFile;
}

const KnowledgeFileItem = ({
  onRemove,
  zentroxFile,
}: KnowledgeFileItemProps) => {
  return (
    <div className="border-outline-variant/40 bg-surface-container-lowest flex items-center justify-between gap-2 rounded border px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <FileTextIcon className="text-on-surface-variant shrink-0" size={16} />
        <a
          className="text-on-surface min-w-0 truncate text-sm hover:underline"
          href={zentroxFile.file.secureUrl}
          rel="noreferrer"
          target="_blank"
        >
          {zentroxFile.name}
        </a>
        <span className="text-on-surface-variant shrink-0 text-xs">
          {zentroxFile.file.format?.toUpperCase()} ·{' '}
          {formatBytes(zentroxFile.file.bytes)}
        </span>
      </div>
      <Button
        aria-label={`Remove ${zentroxFile.name}`}
        className="text-on-surface-variant size-7"
        onClick={() => onRemove(zentroxFile.id)}
        size="icon"
        variant="ghost"
      >
        <TrashIcon size={14} />
      </Button>
    </div>
  );
};

export { KnowledgeFileItem };
