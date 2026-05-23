import { HashIcon, TextTIcon, ToggleLeftIcon } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

interface ZentroxAiOutputTypeOption {
  Icon: ComponentType<{ className?: string; size?: number }>;
  label: string;
  value: 'text' | 'number' | 'boolean';
}

export const ZENTROX_AI_OUTPUT_TYPES: readonly ZentroxAiOutputTypeOption[] = [
  { Icon: TextTIcon, label: 'Text', value: 'text' },
  { Icon: HashIcon, label: 'Number', value: 'number' },
  { Icon: ToggleLeftIcon, label: 'Boolean', value: 'boolean' },
] as const;

export type ZentroxAiOutputType = ZentroxAiOutputTypeOption['value'];
