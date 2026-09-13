import type {
  AiGenerateActionSampleData,
  AiGenerateNodeConfig,
  DataTabKey,
} from '@/features/workflow/types';

import { DataInTab } from './DataInTab';
import { DataOutTab } from './DataOutTab';

interface AiGenerateActionDataTabProps {
  activeTab: DataTabKey;
  config: AiGenerateNodeConfig | null;
  sampleData: AiGenerateActionSampleData | null | undefined;
  sampleLoading: boolean;
}

const AiGenerateActionDataTab = ({
  activeTab,
  config,
  sampleData,
  sampleLoading,
}: AiGenerateActionDataTabProps) => {
  if (activeTab === 'in') {
    return <DataInTab config={config} sample={sampleData} />;
  }

  return <DataOutTab data={sampleData} loading={sampleLoading} />;
};

export { AiGenerateActionDataTab };
