'use client';

import { QuestionIcon } from '@phosphor-icons/react';
import * as React from 'react';

import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

interface FormItemProps {
  children: React.ReactNode;
  className?: string;
  label: string;
  legend?: React.ReactNode;
  required?: boolean;
}

const FormItem = ({
  children,
  className,
  label,
  legend,
  required,
}: FormItemProps) => {
  return (
    <div className={cn('space-y-1', className)}>
      <Label className="flex items-center gap-1">
        <span>
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </span>
        {legend && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label={`About ${label}`}
                  className="text-on-surface-variant hover:text-on-surface size-4 rounded-full"
                  size="icon-xs"
                  tabIndex={-1}
                  type="button"
                  variant="ghost"
                >
                  <QuestionIcon size={12} weight="bold" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs" side="top">
                {legend}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Label>
      {children}
    </div>
  );
};

export { FormItem };
