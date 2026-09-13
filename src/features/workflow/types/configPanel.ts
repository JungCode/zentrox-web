import type {
  TokenizedValue,
  TokenVariableMeta,
} from '@/shared/types/baseform/token-input.types';

import { ConfigStep } from './graph';

// =============================================================================
// Config Step
// =============================================================================
// Represents one step in the node configuration wizard (e.g. "1. Connect", "2. Configure").
// Used to drive the step indicator UI in StepConfigPanel.

interface ConfigStepProperties {
  id: ConfigStep; // enum value that identifies which step this is
  label: string; // human-readable step name shown in the UI
  number: string; // display number (string so it can be "1", "2", etc. without type coercion)
}

export type { ConfigStepProperties };
