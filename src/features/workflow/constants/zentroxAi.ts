import {
  BracketsCurlyIcon,
  HashIcon,
  ListBulletsIcon,
  TextTIcon,
  ToggleLeftIcon,
} from '@phosphor-icons/react';
import type { ComponentType } from 'react';

interface ZentroxAiOutputTypeOption {
  Icon: ComponentType<{ className?: string; size?: number }>;
  label: string;
  value: 'text' | 'number' | 'boolean' | 'json' | 'list';
}

export const ZENTROX_AI_OUTPUT_TYPES: readonly ZentroxAiOutputTypeOption[] = [
  { Icon: TextTIcon, label: 'Text', value: 'text' },
  { Icon: HashIcon, label: 'Number', value: 'number' },
  { Icon: ToggleLeftIcon, label: 'Boolean', value: 'boolean' },
  { Icon: BracketsCurlyIcon, label: 'JSON', value: 'json' },
  { Icon: ListBulletsIcon, label: 'List', value: 'list' },
] as const;

export type ZentroxAiOutputType = ZentroxAiOutputTypeOption['value'];
