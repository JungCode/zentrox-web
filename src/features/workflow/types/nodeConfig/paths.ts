import type { TokenizedValue } from '@/shared/types/baseform/token-input.types';

// =============================================================================
// Paths utility node
// =============================================================================
// Configuration persisted on a Paths node's configJson.
//
// A Paths node fans the workflow out into N user-defined branches. At runtime
// the BE evaluator walks `branches` in order and the first whose `rules` all
// pass (per `ruleLogic`) is the one the workflow continues through. Each
// branch is identified by its `id`, which becomes the `sourceHandle` on the
// edge from this paths node to the branch's downstream nodes — that's the
// link the executor uses to know which child(ren) to route into.

type PathsConditionOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'ends_with'
  | 'greater_than'
  | 'greater_than_or_equal'
  | 'less_than'
  | 'less_than_or_equal'
  | 'is_empty'
  | 'is_not_empty'
  | 'in_list'
  | 'not_in_list';

interface PathsConditionRule {
  id: string;
  /** Tokenized template for the LHS. Same format as Sheet column mappings. */
  leftField: TokenizedValue;
  operator: PathsConditionOperator;
  /** Tokenized template for the RHS. Unused for unary operators. */
  rightValue: TokenizedValue;
}

interface PathsBranch {
  id: string;
  label: string;
  /** Combines this branch's rules. */
  ruleLogic: 'AND' | 'OR';
  rules: PathsConditionRule[];
}

/**
 * Full configuration object persisted for a Paths utility node — FE mirror
 * of the BE PathsNodeConfig.
 */
interface PathsNodeConfig {
  branches: PathsBranch[];
  matchMode: 'first_match';
}

export type {
  PathsBranch,
  PathsConditionOperator,
  PathsConditionRule,
  PathsNodeConfig,
};
