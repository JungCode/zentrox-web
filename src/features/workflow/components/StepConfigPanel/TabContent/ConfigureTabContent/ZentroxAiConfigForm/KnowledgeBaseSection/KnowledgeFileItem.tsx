'use client';

import { FileTextIcon, TrashIcon } from '@phosphor-icons/react';

import type { ZentroxAiKnowledgeFile } from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';
import { formatBytes } from '@/shared/utils';

interface KnowledgeFileItemProps {
  file: ZentroxAiKnowledgeFile;
  onRemove: (id: string) => void;
}

const KnowledgeFileItem = ({ file, onRemove }: KnowledgeFileItemProps) => {
  return (
    <div className="border-outline-variant/40 bg-surface-container-lowest flex items-center justify-between gap-2 rounded border px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <FileTextIcon className="text-on-surface-variant shrink-0" size={16} />
        <a
          className="text-on-surface min-w-0 truncate text-sm hover:underline"
          href={file.file.secureUrl}
          rel="noreferrer"
          target="_blank"
        >
          {file.name}
        </a>
        <span className="text-on-surface-variant shrink-0 text-xs">
          {file.file.format.toUpperCase()} · {formatBytes(file.file.bytes)}
        </span>
      </div>
      <Button
        aria-label={`Remove ${file.name}`}
        className="text-on-surface-variant size-7"
        onClick={() => onRemove(file.id)}
        size="icon"
        variant="ghost"
      >
        <TrashIcon size={14} />
      </Button>
    </div>
  );
};

export { KnowledgeFileItem };
