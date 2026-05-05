import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';

import type { BaseDropdownMenuItem } from '@/shared/components/BaseDropdownMenu';

/** Vertical pixel distance between consecutive node centers */
export const NODE_VERTICAL_GAP = 180;

/** Fixed width for all workflow nodes (px) */
export const NODE_WIDTH = 360;

/** Approximate rendered height of a workflow node card (px) */
export const NODE_HEIGHT = 77;

export const PLUS_BUTTON_SIZE = 29;

/** Height of the connector line between the last node card and the "+" append button.
 *  Derived to visually match the half-line on either side of the edge "+" button. */
export const NODE_CONNECTOR_HEIGHT =
  (NODE_VERTICAL_GAP - NODE_HEIGHT - PLUS_BUTTON_SIZE) / 2;

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
