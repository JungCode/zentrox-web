'use client';

import { XIcon } from '@phosphor-icons/react';

import {
  PATHS_OPERATOR_OPTIONS,
  UNARY_PATHS_OPERATORS,
} from '@/features/workflow/constants';
import type {
  NodeQueryData,
  PathsConditionOperator,
  PathsConditionRule,
} from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type { TokenVariableMeta } from '@/shared/types/baseform/token-input.types';

import { TokenInput } from '../ColumnMappingInput/TokenInput';

interface RuleRowProps {
  branchLogic: 'AND' | 'OR';
  isFirst: boolean;
  node: NodeQueryData;
  onRemove: () => void;
  onSetLeft: (value: string, meta: Record<string, TokenVariableMeta>) => void;
  onSetLogic: (logic: 'AND' | 'OR') => void;
  onSetOperator: (operator: PathsConditionOperator) => void;
  onSetRight: (value: string, meta: Record<string, TokenVariableMeta>) => void;
  rule: PathsConditionRule;
}

/**
 * Single condition row. Three slots: left tokenized value, operator,
 * right tokenized value — with the RHS hidden for unary operators
 * (is_empty / is_not_empty) so users aren't asked for a value that
 * gets ignored anyway. Subsequent rows show an AND/OR badge that
 * mirrors the branch's combine logic.
 */
const RuleRow = ({
  branchLogic,
  isFirst,
  node,
  onRemove,
  onSetLeft,
  onSetOperator,
  onSetRight,
  rule,
}: RuleRowProps) => {
  const isUnary = UNARY_PATHS_OPERATORS.has(rule.operator);

  // Group operator options for the select dropdown.
  const grouped = PATHS_OPERATOR_OPTIONS.reduce<
    Record<string, typeof PATHS_OPERATOR_OPTIONS>
  >((acc, opt) => {
    (acc[opt.group] ??= []).push(opt);
    return acc;
  }, {});

  return (
    <div className="flex items-start gap-2">
      <div className="flex w-10 shrink-0 justify-center pt-2">
        {isFirst ? (
          <span className="text-on-surface-variant text-xs">If</span>
        ) : (
          <span className="text-on-surface-variant bg-surface-container rounded px-1.5 py-0.5 text-xs">
            {branchLogic}
          </span>
        )}
      </div>

      <div className="grid flex-1 gap-2">
        <TokenInput
          nodeId={node.id}
          onChange={onSetLeft}
          placeholder="Field"
          value={rule.leftField.value}
          variableMeta={rule.leftField.variableMeta}
          workflowVersionId={node.workflowVersionId}
        />

        <Select
          onValueChange={(v) => onSetOperator(v as PathsConditionOperator)}
          value={rule.operator}
        >
          <SelectTrigger className="h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(grouped).map(([group, options]) => (
              <SelectGroup key={group}>
                <SelectLabel>{group}</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {!isUnary && (
          <TokenInput
            nodeId={node.id}
            onChange={onSetRight}
            placeholder="Value or {{token}}"
            value={rule.rightValue.value}
            variableMeta={rule.rightValue.variableMeta}
            workflowVersionId={node.workflowVersionId}
          />
        )}
      </div>

      <Button
        aria-label="Remove condition"
        className="mt-1 shrink-0"
        onClick={onRemove}
        size="icon-xs"
        variant="ghost"
      >
        <XIcon size={14} />
      </Button>
    </div>
  );
};

export { RuleRow };
