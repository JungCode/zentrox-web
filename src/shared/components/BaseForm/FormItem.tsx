'use client';

import * as React from 'react';

import { cn } from '@/lib/ui/utils';
import { Label } from '@/shared/components/ui/label';

interface FormItemProps {
  children: React.ReactNode;
  className?: string;
  label: string;
  required?: boolean;
}

const FormItem = ({ children, className, label, required }: FormItemProps) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
};

export { FormItem };
