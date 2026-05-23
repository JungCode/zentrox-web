'use client';

import { cn } from '@/lib/ui/utils';

interface SampleFieldItemProps {
  label: string;
  muted?: boolean;
  value: string;
}

const SampleFieldItem = ({ label, muted, value }: SampleFieldItemProps) => {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="bg-secondary/10 text-on-surface mt-0.5 shrink-0 rounded px-2 py-0.5 text-xs font-medium">
        {label}
      </span>
      <p
        className={cn(
          'min-w-0 flex-1 text-xs break-all',
          muted ? 'text-on-surface-variant' : 'text-on-surface',
        )}
      >
        {value}
      </p>
    </div>
  );
};

export { SampleFieldItem };
