'use client';

import { type ReactNode } from 'react';

import { cn } from '@/lib/ui/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export interface BaseSelectorOption<T> {
  data?: T;
  label: string;
  value: string;
}

interface BaseSelectorProps<T = unknown> {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  headerSlot?: ReactNode;
  onValueChange?: (value: string) => void;
  options: BaseSelectorOption<T>[];
  placeholder?: string;
  position?: 'popper' | 'item-aligned';
  renderLabel?: (selected: BaseSelectorOption<T> | undefined) => ReactNode;
  renderOption?: (option: BaseSelectorOption<T>) => ReactNode;
  value?: string;
}

const BaseSelector = <T,>({
  className,
  defaultValue,
  disabled,
  headerSlot,
  onValueChange,
  options,
  placeholder = 'Select…',
  position = 'popper',
  renderLabel,
  renderOption,
  value,
}: BaseSelectorProps<T>) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Select
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={onValueChange}
      value={value}
    >
      <SelectTrigger
        className={cn(
          'h-auto! w-full rounded-xs border px-3 py-2.5 text-sm font-normal whitespace-normal shadow-none focus-visible:ring-1',
          className,
        )}
      >
        {renderLabel ? (
          <span className="flex min-w-0 flex-1 items-center">
            {renderLabel(selectedOption) ?? (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
        ) : selectedOption ? (
          <span>{selectedOption.label}</span>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent
        className="w-(--radix-select-trigger-width)"
        position={position}
      >
        {headerSlot}
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {renderOption ? (
              renderOption(opt)
            ) : (
              <span className="flex flex-col gap-0.5">
                <span>{opt.label}</span>
              </span>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { BaseSelector };
