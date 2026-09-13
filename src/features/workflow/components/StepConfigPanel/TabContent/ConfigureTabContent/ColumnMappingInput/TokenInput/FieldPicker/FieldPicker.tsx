// src/shared/components/BaseForm/TokenInput/FieldPicker.tsx
'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';
import type {
  AvailableField,
  AvailableFieldGroup,
} from '@/shared/types/baseform/token-input.types';

import { FieldItem } from './FieldItem';
import { UntestedGroupRow } from './UntestedGroupRow';

interface FieldPickerProps {
  groups: AvailableFieldGroup[];
  /**
   * Called when the user clicks the warning row of an untested upstream
   * node. Owner is expected to close the popover, select the node, and open
   * the step config panel.
   */
  onNavigateToNode: (nodeId: string) => void;
  onSelect: (field: AvailableField) => void;
}

const isUntested = (group: AvailableFieldGroup): boolean =>
  group.connectionStatus !== 'success';

const FieldPicker = ({
  groups,
  onNavigateToNode,
  onSelect,
}: FieldPickerProps) => {
  // All groups start collapsed so the popover opens in a scannable, compact
  // state — useful when there are many upstream steps. The user clicks any
  // group header to expand it and reveal its fields.
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(),
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
      {groups.map((group) => {
        const GroupIcon = group.icon;
        const untested = isUntested(group);

        // Untested rows are click-to-navigate: no expand caret, just a
        // warning + "set up" hint and the whole row dispatches the
        // navigation action. Mirrors Zapier's "set up this step first" UX.
        if (untested) {
          return (
            <UntestedGroupRow
              group={group}
              GroupIcon={GroupIcon}
              key={group.nodeId}
              onNavigate={onNavigateToNode}
            />
          );
        }

        const isExpanded = expandedGroups.has(group.nodeId);

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
                {group.stepNumber}. {group.nodeLabel}
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
