import {
  DataTabKey,
  GoogleSheetActionConfig,
  GoogleSheetActionSampleData,
} from '@/features/workflow/types';

import { DataInTab } from './DataInTab';
import { DataOutTab } from './DataOutTab';

interface GoogleSheetActionDataTabProps {
  activeTab: DataTabKey;
  config: GoogleSheetActionConfig | null;
  sampleData: GoogleSheetActionSampleData | null | undefined;
  sampleLoading: boolean;
}

const GoogleSheetActionDataTab = ({
  activeTab,
  config,
  sampleData,
  sampleLoading,
}: GoogleSheetActionDataTabProps) => {
  if (activeTab === 'in')
    return <DataInTab config={config} sample={sampleData} />;

  return <DataOutTab data={sampleData} loading={sampleLoading} />;
};

export { GoogleSheetActionDataTab };
