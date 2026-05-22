import { ComponentType, ElementType } from 'react';

import { WorkflowProviderApp } from '@/shared/api/base.schemas';
import { IIconProps } from '@/shared/assets/types';

export type IconByAppProviderKey = Record<
  WorkflowProviderApp,
  ElementType<IIconProps>
>;

export type ProviderAppMetadataType = {
  category: string;
  description: string;
  icon: ElementType<IIconProps>;
  id: WorkflowProviderApp;
  name: string;
};

// A mapping of WorkflowProviderApp to its metadata, used for rendering app options in the app selector and displaying assigned apps on nodes.
export type ProviderAppMetadataRecordType = Record<
  WorkflowProviderApp,
  ProviderAppMetadataType
>;

export interface Category {
  Icon: ComponentType<{ className?: string; size?: number }>;
  id: string;
  label: string;
}
