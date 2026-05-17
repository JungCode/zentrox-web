'use client';

import type { NodeQueryData } from '@/features/workflow/types';
import { WorkflowProviderApp } from '@/shared/api/workflow/schemas';

import { GoogleFormConfigForm } from './GoogleFormConfigForm';
import { GoogleSheetConfigForm } from './GoogleSheetConfigForm';

interface ConfigureTabContentProps {
  node: NodeQueryData;
}

const ConfigureTabContent = ({ node }: ConfigureTabContentProps) => {
  switch (node?.providerApp) {
    case WorkflowProviderApp.GoogleSheet:
      return <GoogleSheetConfigForm node={node} />;
    case WorkflowProviderApp.GoogleForm:
    default:
      return <GoogleFormConfigForm node={node} />;
  }
};

export { ConfigureTabContent };
