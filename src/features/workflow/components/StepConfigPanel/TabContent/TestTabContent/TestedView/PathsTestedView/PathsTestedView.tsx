'use client';

import { useTestRunPathsNode } from '@/features/workflow/hooks';
import type { NodeQueryData, PathsNodeConfig } from '@/features/workflow/types';

import { TestTabContentLayout } from '../../TestTabContentLayout';
import { BranchList } from './BranchList';
import { MatchSummary } from './MatchSummary';
import { TestBranchesButton } from './TestBranchesButton';

interface PathsTestedViewProps {
  node: NodeQueryData;
  workflowId: string;
}

/**
 * Test tab for a Paths node.
 *
 * Reads as a high-level outline of the screen:
 *   - MatchSummary       — headline result (shown only after a test run)
 *   - BranchList         — per-branch pass/fail rows
 *   - TestBranchesButton — footer action
 *
 * State lives in `useTestRunPathsNode`; this component is just glue.
 */
const PathsTestedView = ({ node, workflowId }: PathsTestedViewProps) => {
  const { lastResult, loading, testRun } = useTestRunPathsNode({
    nodeId: node.id,
    workflowId,
  });

  const config = (node.configJson ?? {}) as Partial<PathsNodeConfig>;
  const branches = config.branches ?? [];

  const matchedBranchLabel =
    lastResult?.branches.find((b) => b.branchId === lastResult.matchedBranchId)
      ?.branchLabel ?? null;

  return (
    <TestTabContentLayout
      footer={
        <TestBranchesButton
          hasBranches={branches.length > 0}
          hasResult={!!lastResult}
          loading={loading}
          onClick={() => testRun()}
        />
      }
    >
      <div className="space-y-4">
        {lastResult && <MatchSummary matchedBranchLabel={matchedBranchLabel} />}
        <BranchList branches={branches} result={lastResult} />
      </div>
    </TestTabContentLayout>
  );
};

export { PathsTestedView };
