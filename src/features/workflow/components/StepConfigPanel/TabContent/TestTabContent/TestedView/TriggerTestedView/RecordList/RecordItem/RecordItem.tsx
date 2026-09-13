'use client';

import { CaretRightIcon } from '@phosphor-icons/react';

import type { GoogleFormTriggerRecord } from '@/features/workflow/types';
import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';

import { RecordDetail } from './RecordDetail';

interface RecordItemProps {
  fetchedAt?: string;
  isSelected: boolean;
  label: string;
  onClick: () => void;
  record: GoogleFormTriggerRecord;
}

const RecordItem = ({
  fetchedAt,
  isSelected,
  label,
  onClick,
  record,
}: RecordItemProps) => {
  const dateLabel =
    fetchedAt &&
    `original record pulled on ${new Date(fetchedAt).toLocaleDateString(
      'en-US',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
    )}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'h-auto w-full justify-between rounded-md border px-3 py-2.5 text-left',
            {
              'border-outline-variant/40 hover:border-secondary/40':
                !isSelected,
              'border-secondary bg-secondary/5 shadow-[0_0_0_2px_var(--accent-glow)]':
                isSelected,
            },
          )}
          onClick={onClick}
          variant="ghost"
        >
          <div>
            <p className="text-on-surface text-sm font-semibold">{label}</p>
            {dateLabel && (
              <p className="text-on-surface-variant mt-0.5 text-xs">
                {dateLabel}
              </p>
            )}
          </div>
          <CaretRightIcon className="text-outline shrink-0" size={14} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80" side="left">
        <RecordDetail record={record} />
      </PopoverContent>
    </Popover>
  );
};

export { RecordItem };
