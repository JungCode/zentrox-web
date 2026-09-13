// src/shared/components/BaseForm/TokenInput/TokenChip.tsx
'use client';

import type { ReactNode } from 'react';
import { useSelected } from 'slate-react';

import { cn } from '@/lib/ui/utils';
import type { SlateTokenElement } from '@/shared/types/baseform/token-input.types';

// Fixes Chromium bug: https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
// Provides cursor anchor at the edges of the inline void element
const ChromiumBugfix = () => (
  <span className="text-[0px]" contentEditable={false}>
    {' '}
  </span>
);

interface TokenChipProps {
  attributes: Record<string, unknown>;
  children: ReactNode;
  element: SlateTokenElement;
}

const TokenChip = ({ attributes, children, element }: TokenChipProps) => {
  const selected = useSelected();

  return (
    <span {...attributes} contentEditable={false}>
      <ChromiumBugfix />
      {/*
       * display: inline lets this badge split at word boundaries when it
       * overflows the line — only the overflowing part wraps down, not the
       * whole badge. box-decoration-break: clone re-applies the background
       * and border-radius to every line fragment so each looks like a pill.
       */}
      <span
        className={cn(
          'inline rounded-xs px-1.5 py-0.5 align-middle text-xs break-all select-none',
          'bg-primary/10 text-primary',
          selected && 'bg-primary/20 ring-primary ring-1',
        )}
        style={{
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone',
        }}
      >
        <span className="text-muted-foreground">{element.nodeLabel}:</span>{' '}
        <span className="font-medium">{element.fieldLabel}</span>
        {element.previewValue && (
          <span className="text-muted-foreground">
            {' · '}
            {element.previewValue.length > 15
              ? `${element.previewValue.slice(0, 15)}…`
              : element.previewValue}
          </span>
        )}
      </span>
      <ChromiumBugfix />
      {children}
    </span>
  );
};

export { TokenChip };
