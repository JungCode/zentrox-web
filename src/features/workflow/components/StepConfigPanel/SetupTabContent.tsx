'use client';

import { Button } from '@/shared/components/ui/button';

import type { NodeQueryData } from '../../types/graph';

const SetupTabContent = ({ node }: { node: NodeQueryData | undefined }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-on-surface-variant text-xs font-semibold tracking-wide uppercase">
          App
        </label>
        <div className="border-outline-variant/30 bg-surface-container flex items-center gap-2.5 rounded-md border px-3 py-2.5">
          {node ? (
            <>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-sm">
                {/* {<app.icon />} */}
                icon
              </span>
              <span className="text-on-surface text-sm font-medium">
                {node.label}
              </span>
            </>
          ) : (
            <span className="text-outline text-sm">No app selected</span>
          )}
          <button
            className="text-secondary ml-auto text-xs font-semibold hover:underline"
            type="button"
          >
            Change
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-on-surface-variant text-xs font-semibold tracking-wide uppercase">
          Trigger Event
        </label>
        <div className="border-outline-variant/30 bg-surface-container flex items-center justify-between rounded-md border px-3 py-2.5">
          <span className="text-on-surface text-sm">
            {node?.actionKey ?? 'New Form Response'}
          </span>
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

      <div className="space-y-1.5">
        <label className="text-on-surface-variant text-xs font-semibold tracking-wide uppercase">
          Account
        </label>
        <div className="border-outline-variant/30 bg-surface-container rounded-md border px-3 py-2.5">
          <p className="text-on-surface text-sm font-medium">user@zentrox.io</p>
          <p className="text-on-surface-variant mt-0.5 text-xs">
            Used in 1 workflow
          </p>
        </div>
      </div>

      <p className="text-on-surface-variant bg-surface-container rounded-md p-3 text-xs leading-relaxed">
        {node?.label ?? 'This app'} is a secure partner with Zentrox. Your
        credentials are encrypted and can be removed at any time.
      </p>

      <Button className="w-full" size="lg" variant="secondary">
        Continue
      </Button>
    </div>
  );
};

export { SetupTabContent };
