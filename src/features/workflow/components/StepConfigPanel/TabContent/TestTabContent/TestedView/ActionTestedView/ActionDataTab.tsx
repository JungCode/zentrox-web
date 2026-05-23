'use client';

import type {
  AiGenerateActionSampleData,
  AiGenerateNodeConfig,
  DataTabKey,
  GoogleSheetActionConfig,
  GoogleSheetActionSampleData,
  NodeQueryData,
  NodeSampleRecordData,
} from '@/features/workflow/types';
import { WorkflowProviderApp } from '@/shared/api/base.schemas';

import { AiGenerateActionDataTab } from './AiGenerateActionDataTab';
import { GoogleSheetActionDataTab } from './GoogleSheetActionDataTab';

interface ActionDataTabProps {
  activeTab: DataTabKey;
  node: NodeQueryData;
  sampleData: NodeSampleRecordData | null | undefined;
  sampleLoading: boolean;
}

// Provider dispatcher for the action test-data display. Each provider gets
// its own per-tab renderer; this component only routes by node.providerApp
// and forwards the typed config + sample so each branch stays self-contained.
const ActionDataTab = ({
  activeTab,
  node,
  sampleData,
  sampleLoading,
}: ActionDataTabProps) => {
  switch (node.providerApp) {
    case WorkflowProviderApp.GoogleSheet:
      return (
        <GoogleSheetActionDataTab
          activeTab={activeTab}
          config={node.configJson as GoogleSheetActionConfig | null}
          sampleData={sampleData as GoogleSheetActionSampleData | undefined}
          sampleLoading={sampleLoading}
        />
      );

    case WorkflowProviderApp.Ai:
      return (
        <AiGenerateActionDataTab
          activeTab={activeTab}
          config={node.configJson as AiGenerateNodeConfig | null}
          sampleData={sampleData as AiGenerateActionSampleData | undefined}
          sampleLoading={sampleLoading}
        />
      );

    default:
      return (
        <p className="text-on-surface-variant py-6 text-center text-xs">
          Test data preview is not yet available for this app
        </p>
      );
  }
};

export { ActionDataTab };
