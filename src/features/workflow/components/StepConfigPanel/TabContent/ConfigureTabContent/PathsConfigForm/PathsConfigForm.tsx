'use client';

import { GitBranchIcon, PlusIcon } from '@phosphor-icons/react';

import {
  useAddPathsBranch,
  usePathsConfigForm,
} from '@/features/workflow/hooks';
import type { NodeQueryData } from '@/features/workflow/types';
import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';

import { BranchCard } from './BranchCard';

interface PathsConfigFormProps {
  node: NodeQueryData;
  workflowId: string;
}

/**
 * Configure tab for a Paths utility node.
 *
 * Surfaces the user's branches as a vertical list of cards: each card edits
 * its branch label, AND/OR logic, and rule rows. "Add branch" delegates to
 * the server mutation so a placeholder child + edge are created at the same
 * time — keeping the canvas tree consistent with the form state.
 */
const PathsConfigForm = ({ node, workflowId }: PathsConfigFormProps) => {
  const {
    branches,
    onAddRule,
    onRemoveRule,
    onRenameBranch,
    onSetRuleLeft,
    onSetRuleLogic,
    onSetRuleOperator,
    onSetRuleRight,
  } = usePathsConfigForm();

  const { addBranch, loading: addingBranch } = useAddPathsBranch({
    pathsNodeId: node.id,
    workflowId,
  });

  return (
    <div className="space-y-4">
      <div className="bg-surface-container/40 border-outline-variant/30 flex items-start gap-3 rounded-md border p-3">
        <GitBranchIcon
          className="text-on-surface-variant mt-0.5 shrink-0"
          size={16}
        />
        <p className="text-on-surface-variant text-xs leading-relaxed">
          The workflow follows the <strong>first</strong> branch whose
          conditions all match. A branch with no rules is treated as a catch-all
          and will always match.
        </p>
      </div>

      {branches.length === 0 ? (
        <PathsEmptyState />
      ) : (
        <div className="space-y-3">
          {branches.map((branch, index) => (
            <BranchCard
              branch={branch}
              index={index}
              key={branch.id}
              node={node}
              onAddRule={onAddRule}
              onRemoveRule={onRemoveRule}
              onRenameBranch={onRenameBranch}
              onSetRuleLeft={onSetRuleLeft}
              onSetRuleLogic={onSetRuleLogic}
              onSetRuleOperator={onSetRuleOperator}
              onSetRuleRight={onSetRuleRight}
            />
          ))}
        </div>
      )}

      <Button
        className="w-full"
        disabled={addingBranch}
        onClick={() => addBranch()}
        variant="outline"
      >
        {addingBranch ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <PlusIcon size={14} />
        )}
        Add branch
      </Button>
    </div>
  );
};

const PathsEmptyState = () => (
  <div className="border-outline-variant/40 flex flex-col items-center gap-2 rounded-md border border-dashed py-8 text-center">
    <GitBranchIcon className="text-outline" size={24} />
    <p className="text-on-surface text-sm font-medium">No branches yet</p>
    <p className="text-on-surface-variant text-xs">
      Add your first branch to start routing the workflow.
    </p>
  </div>
);

export { PathsConfigForm };
