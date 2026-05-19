// src/shared/components/BaseForm/TokenInput/FieldPicker.tsx
'use client';

import { ArticleIcon, CaretDownIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';
import type {
  AvailableField,
  AvailableFieldGroup,
} from '@/shared/types/baseform/token-input.types';

interface FieldItemProps {
  field: AvailableField;
  icon?: AvailableFieldGroup['icon'];
  onSelect: (field: AvailableField) => void;
}

const FieldItem = ({ field, icon: Icon, onSelect }: FieldItemProps) => {
  return (
    <div className="hover:bg-accent flex items-center gap-2 py-2 pr-3 pl-6">
      <Button
        className="h-auto flex-1 justify-start gap-2 overflow-hidden p-0 font-normal hover:bg-transparent"
        onClick={() => onSelect(field)}
        type="button"
        variant="ghost"
      >
        {Icon ? (
          <Icon className="text-primary shrink-0" size={16} />
        ) : (
          <ArticleIcon className="text-primary shrink-0" size={16} />
        )}
        <span className="min-w-0 shrink-0 text-sm font-medium">
          {field.fieldLabel}
        </span>

        <span className="text-muted-foreground min-w-0 truncate text-xs">
          {field.previewValue}
        </span>
      </Button>
    </div>
  );
};

interface FieldPickerProps {
  groups: AvailableFieldGroup[];
  onSelect: (field: AvailableField) => void;
}

const FieldPicker = ({ groups, onSelect }: FieldPickerProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(groups.map((g) => g.nodeId)),
  );

  const toggleGroup = (nodeId: string) =>
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(nodeId) ? next.delete(nodeId) : next.add(nodeId);
      return next;
    });

  return (
    <div
      className="max-h-80 overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {groups.map((group, groupIndex) => {
        const isExpanded = expandedGroups.has(group.nodeId);
        const GroupIcon = group.icon;

        return (
          <div key={group.nodeId}>
            <Button
              className="h-auto w-full justify-start gap-2 rounded-none px-3 py-2 font-semibold"
              onClick={() => toggleGroup(group.nodeId)}
              type="button"
              variant="ghost"
            >
              {GroupIcon && (
                <GroupIcon className="text-primary shrink-0" size={16} />
              )}
              <span className="flex-1 truncate text-left text-sm">
                {groupIndex + 1}. {group.nodeLabel}
              </span>
              <CaretDownIcon
                className={cn(
                  'shrink-0 transition-transform',
                  isExpanded && 'rotate-180',
                )}
                size={14}
              />
            </Button>

            {isExpanded &&
              group.fields.map((field) => (
                <FieldItem
                  field={field}
                  icon={GroupIcon}
                  key={field.fieldKey}
                  onSelect={onSelect}
                />
              ))}
          </div>
        );
      })}

      {groups.length === 0 && (
        <p className="text-muted-foreground px-3 py-6 text-center text-sm">
          No fields available
        </p>
      )}
    </div>
  );
};

export { FieldPicker };
