'use client';

import type React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

type BaseDropdownMenuActionItem = {
  disabled?: boolean;
  icon?: React.ElementType<{ className?: string }>;
  label: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  type?: 'item';
  variant?: 'default' | 'destructive';
};

type BaseDropdownMenuSeparatorItem = {
  type: 'separator';
};

type BaseDropdownMenuItem =
  | BaseDropdownMenuActionItem
  | BaseDropdownMenuSeparatorItem;

interface BaseDropdownMenuProps {
  align?: 'start' | 'center' | 'end';
  items: BaseDropdownMenuItem[];
  side?: 'top' | 'right' | 'bottom' | 'left';
  trigger: React.ReactNode;
}

const BaseDropdownMenu = ({
  align = 'end',
  items,
  side = 'bottom',
  trigger,
}: BaseDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} side={side}>
        {items.map((item, idx) =>
          item.type === 'separator' ? (
            <DropdownMenuSeparator key={idx} />
          ) : (
            <DropdownMenuItem
              disabled={item.disabled}
              key={idx}
              onClick={item.onClick}
              variant={item.variant}
            >
              {item.icon && <item.icon className="size-3.5" />}
              {item.label}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export {
  BaseDropdownMenu,
  type BaseDropdownMenuActionItem,
  type BaseDropdownMenuItem,
  type BaseDropdownMenuSeparatorItem,
};
