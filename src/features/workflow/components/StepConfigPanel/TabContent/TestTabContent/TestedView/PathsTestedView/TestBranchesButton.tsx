'use client';

import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';

interface TestBranchesButtonProps {
  /** Disabled until the user has at least one branch to evaluate. */
  hasBranches: boolean;
  /** True after the first successful run — flips the copy to "Re-test". */
  hasResult: boolean;
  loading: boolean;
  onClick: () => void;
}

/**
 * Footer button that drives the evaluator. Pulled out so the parent
 * doesn't need to spell out the disabled / loading / label logic inline.
 */
const TestBranchesButton = ({
  hasBranches,
  hasResult,
  loading,
  onClick,
}: TestBranchesButtonProps) => (
  <Button
    className="w-full"
    disabled={loading || !hasBranches}
    onClick={onClick}
    size="lg"
    variant="secondary"
  >
    {loading && <Spinner data-icon="inline-start" />}
    {hasResult ? 'Re-test branches' : 'Test branches'}
  </Button>
);

export { TestBranchesButton };
