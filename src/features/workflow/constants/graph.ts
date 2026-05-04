import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';

import type { BaseDropdownMenuItem } from '@/shared/components/BaseDropdownMenu';

/** Vertical pixel distance between consecutive node centers */
export const NODE_VERTICAL_GAP = 180;

/** Fixed width for all workflow nodes (px) */
export const NODE_WIDTH = 360;

const WORKFLOW_NODE_MENU_ITEMS: BaseDropdownMenuItem[] = [
  { icon: PencilSimpleIcon, label: 'Edit', onClick: () => {} },
  { type: 'separator' },
  {
    icon: TrashIcon,
    label: 'Delete',
    onClick: () => {},
    variant: 'destructive',
  },
];

export { WORKFLOW_NODE_MENU_ITEMS };
