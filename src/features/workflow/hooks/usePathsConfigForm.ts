'use client';

import { type Path, useFormContext, useWatch } from 'react-hook-form';

import { makeEmptyRule } from '@/features/workflow/helpers';
import type {
  PathsBranch,
  PathsConditionOperator,
  PathsConditionRule,
  StepConfigFormValues,
} from '@/features/workflow/types';
import type { TokenVariableMeta } from '@/shared/types/baseform/token-input.types';
import { generateId } from '@/shared/utils';

const PATH = {
  branches: 'configJson.branches' as Path<StepConfigFormValues>,
} as const;

/**
 * Form helpers for the Paths configure tab.
 *
 * Branch creation lives in `useAddPathsBranch` (server mutation — it also
 * spawns a placeholder child + edge). This hook covers everything else:
 * rename a branch, toggle its logic, add/edit/remove rules, and persist
 * the updated `configJson.branches` array into the form.
 */
const usePathsConfigForm = () => {
  const { control, setValue } = useFormContext<StepConfigFormValues>();

  const branches = (useWatch({ control, name: PATH.branches }) ??
    []) as PathsBranch[];

  const writeBranches = (next: PathsBranch[]) =>
    setValue(PATH.branches, next, { shouldDirty: true });

  const patchBranch = (branchId: string, patch: Partial<PathsBranch>) =>
    writeBranches(
      branches.map((b) => (b.id === branchId ? { ...b, ...patch } : b)),
    );

  const handleRenameBranch = (branchId: string, label: string) =>
    patchBranch(branchId, { label });

  const handleSetRuleLogic = (branchId: string, ruleLogic: 'AND' | 'OR') =>
    patchBranch(branchId, { ruleLogic });

  const handleAddRule = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    if (!branch) return;
    patchBranch(branchId, {
      rules: [...branch.rules, makeEmptyRule(generateId())],
    });
  };

  const handleRemoveRule = (branchId: string, ruleId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    if (!branch) return;
    patchBranch(branchId, {
      rules: branch.rules.filter((r) => r.id !== ruleId),
    });
  };

  const handleSetRuleOperator = (
    branchId: string,
    ruleId: string,
    operator: PathsConditionOperator,
  ) => updateRule(branchId, ruleId, (rule) => ({ ...rule, operator }));

  const handleSetRuleLeft = (
    branchId: string,
    ruleId: string,
    value: string,
    variableMeta: Record<string, TokenVariableMeta>,
  ) =>
    updateRule(branchId, ruleId, (rule) => ({
      ...rule,
      leftField: { value, variableMeta },
    }));

  const handleSetRuleRight = (
    branchId: string,
    ruleId: string,
    value: string,
    variableMeta: Record<string, TokenVariableMeta>,
  ) =>
    updateRule(branchId, ruleId, (rule) => ({
      ...rule,
      rightValue: { value, variableMeta },
    }));

  function updateRule(
    branchId: string,
    ruleId: string,
    apply: (rule: PathsConditionRule) => PathsConditionRule,
  ) {
    const branch = branches.find((b) => b.id === branchId);
    if (!branch) return;
    patchBranch(branchId, {
      rules: branch.rules.map((r) => (r.id === ruleId ? apply(r) : r)),
    });
  }

  return {
    branches,
    onAddRule: handleAddRule,
    onRemoveRule: handleRemoveRule,
    onRenameBranch: handleRenameBranch,
    onSetRuleLeft: handleSetRuleLeft,
    onSetRuleLogic: handleSetRuleLogic,
    onSetRuleOperator: handleSetRuleOperator,
    onSetRuleRight: handleSetRuleRight,
  };
};

export { usePathsConfigForm };
