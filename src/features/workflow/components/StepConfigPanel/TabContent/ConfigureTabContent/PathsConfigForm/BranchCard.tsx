'use client';

import { PlusIcon } from '@phosphor-icons/react';

import type {
  NodeQueryData,
  PathsBranch,
  PathsConditionOperator,
} from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type { TokenVariableMeta } from '@/shared/types/baseform/token-input.types';

import { RuleRow } from './RuleRow';

interface BranchCardProps {
  branch: PathsBranch;
  index: number;
  node: NodeQueryData;
  onAddRule: (branchId: string) => void;
  onRemoveRule: (branchId: string, ruleId: string) => void;
  onRenameBranch: (branchId: string, label: string) => void;
  onSetRuleLeft: (
    branchId: string,
    ruleId: string,
    value: string,
    variableMeta: Record<string, TokenVariableMeta>,
  ) => void;
  onSetRuleLogic: (branchId: string, ruleLogic: 'AND' | 'OR') => void;
  onSetRuleOperator: (
    branchId: string,
    ruleId: string,
    operator: PathsConditionOperator,
  ) => void;
  onSetRuleRight: (
    branchId: string,
    ruleId: string,
    value: string,
    variableMeta: Record<string, TokenVariableMeta>,
  ) => void;
}

/**
 * One branch in the Paths configure tab: editable name, AND/OR toggle,
 * and a list of rule rows. Deleting the branch entirely is out of scope
 * here — that would require server-side cleanup of the placeholder
 * child + edge and is best added once we see how users actually use
 * branches.
 */
const BranchCard = ({
  branch,
  index,
  node,
  onAddRule,
  onRemoveRule,
  onRenameBranch,
  onSetRuleLeft,
  onSetRuleLogic,
  onSetRuleOperator,
  onSetRuleRight,
}: BranchCardProps) => {
  return (
    <div className="border-outline-variant/40 bg-surface-container-lowest rounded-md border">
      <div className="border-outline-variant/30 flex items-center gap-2 border-b px-3 py-2">
        <span className="text-on-surface-variant font-mono text-xs">
          {index + 1}
        </span>
        <Input
          aria-label="Branch name"
          className="focus-visible:border-input h-8 flex-1 border-transparent shadow-none"
          onChange={(e) => onRenameBranch(branch.id, e.target.value)}
          value={branch.label}
        />
      </div>

      <div className="space-y-2 p-3">
        {branch.rules.length === 0 ? (
          <p className="text-on-surface-variant text-xs italic">
            No conditions — this branch matches every record.
          </p>
        ) : (
          branch.rules.map((rule, ruleIndex) => (
            <RuleRow
              branchLogic={branch.ruleLogic}
              isFirst={ruleIndex === 0}
              key={rule.id}
              node={node}
              onRemove={() => onRemoveRule(branch.id, rule.id)}
              onSetLeft={(value, meta) =>
                onSetRuleLeft(branch.id, rule.id, value, meta)
              }
              onSetLogic={(logic) => onSetRuleLogic(branch.id, logic)}
              onSetOperator={(op) => onSetRuleOperator(branch.id, rule.id, op)}
              onSetRight={(value, meta) =>
                onSetRuleRight(branch.id, rule.id, value, meta)
              }
              rule={rule}
            />
          ))
        )}

        <div className="flex items-center gap-2 pt-1">
          <Button
            className="h-7 gap-1.5 px-2 text-xs"
            onClick={() => onAddRule(branch.id)}
            size="sm"
            variant="ghost"
          >
            <PlusIcon size={12} />
            Add condition
          </Button>

          {branch.rules.length > 1 && (
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-on-surface-variant text-xs">Match</span>
              <Select
                onValueChange={(v) =>
                  onSetRuleLogic(branch.id, v as 'AND' | 'OR')
                }
                value={branch.ruleLogic}
              >
                <SelectTrigger className="h-7 w-20 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">All</SelectItem>
                  <SelectItem value="OR">Any</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { BranchCard };
