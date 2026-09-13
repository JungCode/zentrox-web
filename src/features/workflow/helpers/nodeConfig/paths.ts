import type {
  PathsBranch,
  PathsConditionRule,
} from '../../types/nodeConfig/paths';

/** Path A, Path B, …, Path Z, then numeric fallback for >26 branches. */
const defaultBranchLabel = (ordinal: number): string =>
  ordinal <= 26
    ? `Path ${String.fromCharCode(64 + ordinal)}`
    : `Path ${ordinal}`;

const emptyTokenizedValue = () => ({ value: '', variableMeta: {} });

/**
 * Build a blank rule pre-filled with the safest defaults — `equals` operator,
 * empty LHS/RHS. Caller supplies the id (use `generateId()`).
 */
const makeEmptyRule = (id: string): PathsConditionRule => ({
  id,
  leftField: emptyTokenizedValue(),
  operator: 'equals',
  rightValue: emptyTokenizedValue(),
});

/**
 * Build a blank branch ready to be appended to a node's configJson. `ordinal`
 * is 1-based — pass `existingBranches.length + 1` so the auto label sequences
 * naturally (Path A, Path B, …).
 */
const makeEmptyBranch = (id: string, ordinal: number): PathsBranch => ({
  id,
  label: defaultBranchLabel(ordinal),
  ruleLogic: 'AND',
  rules: [],
});

export { defaultBranchLabel, makeEmptyBranch, makeEmptyRule };
