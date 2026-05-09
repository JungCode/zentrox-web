'use client';

import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';

import type { NodeQueryData } from '@/features/workflow/types/graph';

const ConfigureTabContent = ({
  node: _node,
}: {
  node: NodeQueryData | undefined;
}) => {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-on-surface-variant text-xs font-semibold tracking-wide uppercase">
          Spreadsheet / Form ID
        </label>
        <input
          className="border-outline-variant/30 bg-surface-container text-on-surface focus:border-secondary/50 focus:ring-secondary/10 w-full rounded-md border px-3 py-2.5 text-sm transition outline-none focus:ring-2"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter form ID or URL…"
          type="text"
          value={value}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-on-surface-variant text-xs font-semibold tracking-wide uppercase">
          Trigger on
        </label>
        <div className="border-outline-variant/30 bg-surface-container flex items-center justify-between rounded-md border px-3 py-2.5">
          <span className="text-on-surface text-sm">Any new response</span>
          <svg
            className="text-outline h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <Button className="w-full" size="lg" variant="secondary">
        Continue
      </Button>
    </div>
  );
};

export { ConfigureTabContent };
