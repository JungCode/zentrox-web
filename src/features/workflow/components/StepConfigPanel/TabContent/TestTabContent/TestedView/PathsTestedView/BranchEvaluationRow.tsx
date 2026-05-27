'use client';

import {
  CaretDownIcon,
  CaretRightIcon,
  CheckCircleIcon,
  CircleIcon,
  WarningCircleIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { useState } from 'react';

import { PATHS_OPERATOR_OPTIONS } from '@/features/workflow/constants';
import { formatTokenizedValue } from '@/features/workflow/helpers';
import type { PathsBranch } from '@/features/workflow/types';
import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';

// Match codegen's nullable-scalar shape exactly — GraphQL `String` fields
// come back as `T | null | undefined`, so widening here avoids a cast at the
// call site.
interface BranchEvaluation {
  branchId: string;
  branchLabel: string;
  matched: boolean;
  rules: {
    passed: boolean;
    resolvedLeft?: string | null;
    resolvedRight?: string | null;
    ruleId: string;
  }[];
}

interface BranchEvaluationRowProps {
  branch: PathsBranch;
  evaluation: BranchEvaluation | null;
  index: number;
  isMatched: boolean;
}

/**
 * One branch's row in the test tab. Collapsed by default; expanding shows
 * each rule's resolved LHS/RHS and pass/fail so users can debug why a
 * branch didn't match. The picked branch (first match) is highlighted.
 */
const BranchEvaluationRow = ({
  branch,
  evaluation,
  index,
  isMatched,
}: BranchEvaluationRowProps) => {
  const [expanded, setExpanded] = useState(isMatched);

  const StatusIcon = !evaluation
    ? CircleIcon
    : evaluation.matched
      ? CheckCircleIcon
      : WarningCircleIcon;

  return (
    <div
      className={cn(
        'border-outline-variant/40 bg-surface-container-lowest overflow-hidden rounded-md border',
        isMatched && 'border-success/50 shadow-[0_0_0_2px_var(--accent-glow)]',
      )}
    >
      <button
        className="hover:bg-surface-container/30 flex w-full items-center gap-2 px-3 py-2 text-left"
        onClick={() => setExpanded((prev) => !prev)}
        type="button"
      >
        <StatusIcon
          className={
            !evaluation
              ? 'text-outline'
              : evaluation.matched
                ? 'text-success'
                : 'text-warning'
          }
          size={16}
          weight={evaluation ? 'fill' : 'regular'}
        />
        <span className="text-on-surface-variant text-xs">{index + 1}</span>
        <span className="text-on-surface flex-1 text-sm font-medium">
          {branch.label}
        </span>
        {evaluation ? (
          <span className="text-on-surface-variant text-xs">
            {evaluation.rules.filter((r) => r.passed).length}/
            {evaluation.rules.length} rules
          </span>
        ) : (
          <span className="text-on-surface-variant text-xs italic">
            Not evaluated
          </span>
        )}
        {expanded ? (
          <CaretDownIcon className="text-outline" size={12} />
        ) : (
          <CaretRightIcon className="text-outline" size={12} />
        )}
      </button>

      {expanded && (
        <div className="border-outline-variant/30 space-y-1.5 border-t px-3 py-2">
          {branch.rules.length === 0 ? (
            <p className="text-on-surface-variant text-xs italic">
              Catch-all (no conditions)
            </p>
          ) : (
            branch.rules.map((rule) => {
              const ruleEval = evaluation?.rules.find(
                (r) => r.ruleId === rule.id,
              );
              const operatorLabel =
                PATHS_OPERATOR_OPTIONS.find((o) => o.value === rule.operator)
                  ?.label ?? rule.operator;
              const RuleIcon = !ruleEval
                ? CircleIcon
                : ruleEval.passed
                  ? CheckCircleIcon
                  : XCircleIcon;

              return (
                <div className="flex items-start gap-2 text-xs" key={rule.id}>
                  <RuleIcon
                    className={cn(
                      'mt-0.5 shrink-0',
                      !ruleEval
                        ? 'text-outline'
                        : ruleEval.passed
                          ? 'text-success'
                          : 'text-destructive',
                    )}
                    size={14}
                    weight={ruleEval ? 'fill' : 'regular'}
                  />
                  <div className="flex-1 space-y-0.5">
                    <code className="text-on-surface block wrap-break-word">
                      <span className="bg-surface-container rounded px-1 py-0.5 font-mono">
                        {ruleEval?.resolvedLeft ||
                          formatTokenizedValue(rule.leftField)}
                      </span>{' '}
                      <span className="text-on-surface-variant">
                        {operatorLabel}
                      </span>{' '}
                      {ruleEval?.resolvedRight != null && (
                        <span className="bg-surface-container rounded px-1 py-0.5 font-mono">
                          {ruleEval.resolvedRight || '∅'}
                        </span>
                      )}
                    </code>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {evaluation && (
        <div className="border-outline-variant/30 hidden border-t px-3 py-1.5">
          <Button className="h-6 px-2 text-xs" size="sm" variant="ghost">
            View input
          </Button>
        </div>
      )}
    </div>
  );
};

export { BranchEvaluationRow };
