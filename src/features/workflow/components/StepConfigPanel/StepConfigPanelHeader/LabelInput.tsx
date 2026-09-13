'use client';

import React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/shared/components/ui/input';

interface LabelInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  registration: UseFormRegisterReturn;
}

export const LabelInput = ({
  inputRef,
  onBlur,
  onKeyDown,
  registration,
}: LabelInputProps) => {
  const { onBlur: registerOnBlur, ref: registerRef, ...rest } = registration;

  return (
    <Input
      className="text-on-surface h-auto rounded px-1 py-0.5 text-sm font-semibold"
      onBlur={(e) => {
        registerOnBlur(e); // react-hook-form need this to track touched
        onBlur(e); // custom handler
      }}
      onKeyDown={onKeyDown}
      ref={(el) => {
        registerRef(el);
        inputRef.current = el;
      }}
      {...rest}
    />
  );
};
