'use client';

import type { ReactNode } from 'react';

import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

type ComingSoonModalProps = {
  children?: ReactNode;
  message?: string;
  title?: string;
  triggerClassName?: string;
  triggerLabel: string;
  triggerSize?: 'default' | 'sm';
  triggerVariant?: 'default' | 'ghost';
};

export const ComingSoonModal = ({
  children,
  message = 'This feature is not available yet.',
  title = 'Coming Soon',
  triggerClassName,
  triggerLabel,
  triggerSize = 'sm',
  triggerVariant = 'ghost',
}: ComingSoonModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={triggerClassName}
          size={triggerSize}
          type="button"
          variant={triggerVariant}
        >
          {children ?? triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="px-4 py-2 text-xs"
              size="sm"
              type="button"
              variant="default"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
