'use client';

import * as React from 'react';

import { cn } from '@/lib/ui/utils';
import { Label } from '@/shared/components/ui/label';

interface FormItemProps {
  children: React.ReactNode;
  className?: string;
  label: string;
}

const FormItem = ({ children, className, label }: FormItemProps) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
};

export { FormItem };
