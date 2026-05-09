/**
 * Builds a form `defaultValues` object from an optional source.
 *
 * For every key in `fallbacks`, the returned object uses `source[key]` when
 * it is non-null/non-undefined, and the fallback value otherwise.
 *
 * @example
 * getDefaultValues(node, { actionKey: '', integrationAccountId: '' })
 * // → { actionKey: node.actionKey ?? '', integrationAccountId: node.integrationAccountId ?? '' }
 */
const getDefaultValues = <T extends Record<string, unknown>>(
  source: { [K in keyof T]?: T[K] | null } | null | undefined,
  fallbacks: T,
): T => {
  const result = { ...fallbacks };
  for (const key in fallbacks) {
    const val = source?.[key];
    if (val != null) {
      (result as Record<string, unknown>)[key] = val;
    }
  }
  return result;
};

export { getDefaultValues };
