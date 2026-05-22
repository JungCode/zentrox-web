'use client';

import type { ReactNode } from 'react';

import {
  CloudinaryUploaderRoot,
  type CloudinaryUploaderRootProps,
} from './CloudinaryUploader';
import { CloudinaryUploaderTrigger } from './CloudinaryUploaderTrigger';

export interface CloudinaryUploaderProps extends Omit<
  CloudinaryUploaderRootProps,
  'children'
> {
  className?: string;
  description?: ReactNode;
  title?: ReactNode;
}

/**
 * Pre-composed default: Root + Trigger in one component for the common case.
 * For a custom trigger, use <CloudinaryUploaderRoot> directly with
 * useCloudinaryUploader() in your own trigger component.
 */
const CloudinaryUploader = ({
  className,
  description,
  title,
  ...rootProps
}: CloudinaryUploaderProps) => (
  <CloudinaryUploaderRoot {...rootProps}>
    <CloudinaryUploaderTrigger
      className={className}
      description={description}
      title={title}
    />
  </CloudinaryUploaderRoot>
);

export { CloudinaryUploader };
