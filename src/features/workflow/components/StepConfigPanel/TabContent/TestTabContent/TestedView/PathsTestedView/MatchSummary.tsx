'use client';

import { CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/ui/utils';

interface MatchSummaryProps {
  /** null when no branch matched (every rule failed across all branches). */
  matchedBranchLabel: string | null;
}

/**
 * Headline summary shown above the branch list after a test run.
 *
 * Two visual states keyed off `matchedBranchLabel`:
 *   - matched   → green check + "Path X matched"
 *   - unmatched → amber warning + nudge to add a catch-all branch
 *
 * The unmatched copy specifically suggests "branch with no rules" because
 * that's how the evaluator treats catch-alls (always matches) — surfacing
 * the recovery path here saves users from rediscovering it on their own.
 */
const MatchSummary = ({ matchedBranchLabel }: MatchSummaryProps) => {
  const matched = matchedBranchLabel !== null;
  const Icon = matched ? CheckCircleIcon : WarningCircleIcon;

  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-md border px-3 py-2',
        matched
          ? 'border-success/30 bg-success/5'
          : 'border-warning/30 bg-warning/5',
      )}
    >
      <Icon
        className={matched ? 'text-success' : 'text-warning'}
        size={16}
        weight="fill"
      />
      <div className="flex-1">
        <p className="text-on-surface text-sm font-medium">
          {matched
            ? `Path "${matchedBranchLabel}" matched`
            : 'No branch matched'}
        </p>
        <p className="text-on-surface-variant text-xs">
          {matched
            ? 'The workflow continues down this branch.'
            : 'Add a catch-all branch (no rules) to handle this case.'}
        </p>
      </div>
    </div>
  );
};

export { MatchSummary };
