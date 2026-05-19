export type HomeTemplate = {
  symbol: string;
  title: string;
  description: string;
};

export type HomeWorkflowStatus = 'Active' | 'Paused';

export type HomeWorkflow = {
  name: string;
  status: HomeWorkflowStatus;
  updated: string;
};
