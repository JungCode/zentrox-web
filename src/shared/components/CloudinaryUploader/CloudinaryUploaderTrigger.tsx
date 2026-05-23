'use client';

import { UploadSimpleIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/ui/utils';
import { Spinner } from '@/shared/components/ui/spinner';

import { useCloudinaryUploader } from './CloudinaryUploader';

interface CloudinaryUploaderTriggerProps {
  className?: string;
  description?: ReactNode;
  title?: ReactNode;
}

/**
 * Default dropzone trigger — reads `open`, `isLoading`, and `isDisabled`
 * from the nearest <CloudinaryUploaderRoot> via context.
 * Swap this out for any custom trigger by calling `useCloudinaryUploader()`
 * directly in your own component.
 */
const CloudinaryUploaderTrigger = ({
  className,
  description,
  title = 'Click to upload or drag & drop',
}: CloudinaryUploaderTriggerProps) => {
  const { isDisabled, isLoading, open } = useCloudinaryUploader();

  return (
    <div
      aria-disabled={isDisabled}
      className={cn(
        'border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant flex w-full flex-col items-center justify-center gap-2 rounded-xs border border-dashed px-4 py-6 text-sm transition-colors',
        isDisabled
          ? 'hover:bg-surface-container-lowest cursor-not-allowed opacity-60'
          : 'cursor-pointer',
        className,
      )}
      onClick={() => !isDisabled && open()}
      onKeyDown={(event) => {
        if (isDisabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
    >
      {isLoading ? (
        <>
          <Spinner className="size-5" />
          <span className="text-foreground text-sm font-medium">
            Preparing…
          </span>
        </>
      ) : (
        <>
          <UploadSimpleIcon
            className="text-on-surface-variant"
            size={20}
            weight="duotone"
          />
          <span className="text-foreground text-sm font-medium">{title}</span>
          {description && (
            <span className="text-on-surface-variant text-xs">
              {description}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export { CloudinaryUploaderTrigger, type CloudinaryUploaderTriggerProps };
