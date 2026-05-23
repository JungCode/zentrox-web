import { HashIcon, TextTIcon, ToggleLeftIcon } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

interface AiGenerateOutputTypeOption {
  Icon: ComponentType<{ className?: string; size?: number }>;
  label: string;
  value: 'text' | 'number' | 'boolean';
}

export const AI_GENERATE_OUTPUT_TYPES: readonly AiGenerateOutputTypeOption[] = [
  { Icon: TextTIcon, label: 'Text', value: 'text' },
  { Icon: HashIcon, label: 'Number', value: 'number' },
  { Icon: ToggleLeftIcon, label: 'Boolean', value: 'boolean' },
] as const;

export type AiGenerateOutputType = AiGenerateOutputTypeOption['value'];
