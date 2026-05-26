'use client';

import type { PathsTestRunResult } from '@/features/workflow/hooks';
import type { PathsBranch } from '@/features/workflow/types';

import { BranchEvaluationRow } from './BranchEvaluationRow';

interface BranchListProps {
  branches: PathsBranch[];
  /** Latest evaluation result, or null when the user hasn't tested yet. */
  result: PathsTestRunResult | null;
}

/**
 * Renders one row per configured branch — pre-test, post-test, or empty.
 *
 * Owns the "have any branches?" empty state so the parent stays a thin
 * composition shell. Looks up each branch's evaluation by id rather than
 * by index so re-ordered branches still line up with their results.
 */
const BranchList = ({ branches, result }: BranchListProps) => {
  if (branches.length === 0) {
    return (
      <p className="text-on-surface-variant text-sm">
        Configure at least one branch in the Configure tab before testing.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {branches.map((branch, index) => {
        const evaluation =
          result?.branches.find((b) => b.branchId === branch.id) ?? null;

        return (
          <BranchEvaluationRow
            branch={branch}
            evaluation={evaluation}
            index={index}
            isMatched={evaluation?.branchId === result?.matchedBranchId}
            key={branch.id}
          />
        );
      })}
    </div>
  );
};

export { BranchList };
