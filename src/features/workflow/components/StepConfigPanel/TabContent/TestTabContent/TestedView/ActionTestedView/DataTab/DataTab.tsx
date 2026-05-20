import {
  DataTabKey,
  GoogleSheetActionConfig,
  GoogleSheetActionSampleData,
} from '@/features/workflow/types';

import { DataInTab } from './DataInTab';
import { DataOutTab } from './DataOutTab';

interface DataTabProps {
  activeTab: DataTabKey;
  config: GoogleSheetActionConfig | null;
  sampleData: GoogleSheetActionSampleData | null | undefined;
  sampleLoading: boolean;
}

const DataTab = ({
  activeTab,
  config,
  sampleData,
  sampleLoading,
}: DataTabProps) => {
  if (activeTab === 'in')
    return <DataInTab config={config} sample={sampleData} />;

  return <DataOutTab data={sampleData} loading={sampleLoading} />;
};

export { DataTab };
