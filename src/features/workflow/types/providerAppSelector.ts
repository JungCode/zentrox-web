import { ElementType } from 'react';

import { WorkflowProviderApp } from '@/shared/api/workflow/schemas';
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

export type ProviderAppMetadataRecordType = Record<
  WorkflowProviderApp,
  ProviderAppMetadataType
>;
