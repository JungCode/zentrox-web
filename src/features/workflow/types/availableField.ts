import { WorkflowVersionNodeSamplesQuery } from '@/shared/api/workflow/workflow.schemas';

import { GoogleFormTriggerRecord } from './triggerRecord';

type NodeSample =
  WorkflowVersionNodeSamplesQuery['workflowVersionNodeSamples'][number];

type GoogleFormBaseFieldKey = keyof Omit<GoogleFormTriggerRecord, 'answers'>;

export type { GoogleFormBaseFieldKey, NodeSample };
