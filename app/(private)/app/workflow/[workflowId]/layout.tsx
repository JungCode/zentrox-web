'use client';

import { WorkflowStoreProvider } from '@/features/workflow/components/WorkflowProvider/WorkflowProvider';

const WorkflowLayout = ({ children }: { children: React.ReactNode }) => {
  return <WorkflowStoreProvider>{children}</WorkflowStoreProvider>;
};

export default WorkflowLayout;
