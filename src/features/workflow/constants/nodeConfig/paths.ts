import type {
  PathsConditionOperator,
  PathsNodeConfig,
} from '../../types/nodeConfig/paths';

const BRANCH_HANDLE_PREFIX = 'branch_';

/** Operators that ignore "rightValue". Mirrors the BE constant. */
const UNARY_PATHS_OPERATORS: ReadonlySet<PathsConditionOperator> = new Set([
  'is_empty',
  'is_not_empty',
]);

/** Display order for the operator dropdown — grouped by family. */
const PATHS_OPERATOR_OPTIONS: {
  group: string;
  label: string;
  value: PathsConditionOperator;
}[] = [
  { group: 'Text', label: 'Equals', value: 'equals' },
  { group: 'Text', label: 'Does not equal', value: 'not_equals' },
  { group: 'Text', label: 'Contains', value: 'contains' },
  { group: 'Text', label: 'Does not contain', value: 'not_contains' },
  { group: 'Text', label: 'Starts with', value: 'starts_with' },
  { group: 'Text', label: 'Ends with', value: 'ends_with' },
  { group: 'Number', label: '>', value: 'greater_than' },
  { group: 'Number', label: '≥', value: 'greater_than_or_equal' },
  { group: 'Number', label: '<', value: 'less_than' },
  { group: 'Number', label: '≤', value: 'less_than_or_equal' },
  { group: 'Existence', label: 'Is empty', value: 'is_empty' },
  { group: 'Existence', label: 'Is not empty', value: 'is_not_empty' },
  { group: 'Lists', label: 'In list (comma-separated)', value: 'in_list' },
  {
    group: 'Lists',
    label: 'Not in list (comma-separated)',
    value: 'not_in_list',
  },
];

const DEFAULT_PATHS_CONFIG: PathsNodeConfig = {
  branches: [],
  matchMode: 'first_match',
};

export {
  BRANCH_HANDLE_PREFIX,
  DEFAULT_PATHS_CONFIG,
  PATHS_OPERATOR_OPTIONS,
  UNARY_PATHS_OPERATORS,
};
