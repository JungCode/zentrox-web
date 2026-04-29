'use client';

import {
  CheckCircleIcon,
  InfoIcon,
  SpinnerIcon,
  WarningIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      className="toaster group"
      icons={{
        error: <XCircleIcon className="text-danger size-4" weight="fill" />,
        info: <InfoIcon className="size-4" weight="fill" />,
        loading: <SpinnerIcon className="size-4 animate-spin" />,
        success: (
          <CheckCircleIcon className="text-success size-4" weight="fill" />
        ),
        warning: <WarningIcon className="size-4" weight="fill" />,
      }}
      style={
        {
          '--border-radius': 'var(--radius)',
          '--error-bg': 'var(--popover)',
          '--error-border': 'var(--danger)',
          '--error-text': 'var(--popover-foreground)',
          '--normal-bg': 'var(--popover)',
          '--normal-border': 'var(--border)',
          '--normal-text': 'var(--popover-foreground)',
          '--success-bg': 'var(--popover)',
          '--success-border': 'var(--success)',
          '--success-text': 'var(--popover-foreground)',
        } as React.CSSProperties
      }
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          actionButton:
            'bg-secondary text-secondary-foreground rounded px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-secondary/90',
          cancelButton:
            'border border-outline-variant/60 text-secondary rounded px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-surface-container-low',
          description: 'text-xs !text-muted-foreground',
          error: '!border-danger/60',
          success: '!border-success/60',
          title: 'font-heading text-sm font-semibold text-popover-foreground',
          toast:
            'bg-popover text-popover-foreground border !rounded px-4 py-3 text-xs font-sans shadow-[0_16px_40px_var(--shadow-color)]',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
