'use client';

import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { createContext, type ReactNode, useContext } from 'react';

import { useCloudinarySignature } from '@/shared/hooks';
import type { CloudinaryUploadResult } from '@/shared/types';

// ── Types ──────────────────────────────────────────────────────────────────

type UploadInfo = {
  bytes: number;
  format: string;
  original_filename: string;
  public_id: string;
  resource_type: string;
  secure_url: string;
};

interface CloudinaryUploaderContextValue {
  isDisabled: boolean;
  isLoading: boolean;
  open: () => void;
}

interface CloudinaryUploaderRootProps {
  children?: ReactNode;
  clientAllowedFormats?: string[];
  disabled?: boolean;
  folder?: string;
  maxFileSize?: number;
  multiple?: boolean;
  onError?: (error: Error) => void;
  onUploaded: (result: CloudinaryUploadResult) => void;
  resourceType?: 'auto' | 'image' | 'video' | 'raw';
}

// ── Context ────────────────────────────────────────────────────────────────

const CloudinaryUploaderContext =
  createContext<CloudinaryUploaderContextValue | null>(null);

const useCloudinaryUploader = (): CloudinaryUploaderContextValue => {
  const ctx = useContext(CloudinaryUploaderContext);
  if (!ctx) {
    throw new Error(
      'useCloudinaryUploader must be used inside <CloudinaryUploaderRoot>.',
    );
  }
  return ctx;
};

// ── Helpers ────────────────────────────────────────────────────────────────

const toUploadResult = (info: UploadInfo): CloudinaryUploadResult => ({
  bytes: info.bytes,
  format: info.format,
  originalFilename: info.original_filename,
  publicId: info.public_id,
  resourceType: info.resource_type,
  secureUrl: info.secure_url,
});

const toErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'statusText' in error) {
    return (error as { statusText: string }).statusText;
  }
  return 'Cloudinary upload failed.';
};

// ── Root ───────────────────────────────────────────────────────────────────

/**
 * Headless root — owns widget state, auth, and callbacks.
 * Renders no UI of its own; exposes `open`, `isLoading`, and `isDisabled`
 * to children via context so any trigger UI can consume them.
 */
const CloudinaryUploaderRoot = ({
  children,
  clientAllowedFormats,
  disabled = false,
  folder,
  maxFileSize,
  multiple = false,
  onError,
  onUploaded,
  resourceType = 'auto',
}: CloudinaryUploaderRootProps) => {
  const uploadSignature = useCloudinarySignature();

  const handleSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (!results.info || typeof results.info !== 'object') return;
    onUploaded(toUploadResult(results.info as UploadInfo));
  };

  const handleError = (error: unknown) => {
    onError?.(new Error(toErrorMessage(error)));
  };

  return (
    <CldUploadWidget
      onError={handleError}
      onSuccess={handleSuccess}
      options={{
        clientAllowedFormats,
        folder,
        maxFileSize,
        multiple,
        resourceType,
        sources: ['local', 'url'],
        uploadSignature,
      }}
    >
      {({ isLoading, open }) => (
        <CloudinaryUploaderContext.Provider
          value={{
            isDisabled: disabled || !!isLoading,
            isLoading: !!isLoading,
            open,
          }}
        >
          {children}
        </CloudinaryUploaderContext.Provider>
      )}
    </CldUploadWidget>
  );
};

export {
  CloudinaryUploaderContext,
  CloudinaryUploaderRoot,
  type CloudinaryUploaderRootProps,
  useCloudinaryUploader,
};
