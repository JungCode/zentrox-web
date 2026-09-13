import type { TokenizedValue } from '@/shared/types/baseform/token-input.types';

const TOKEN_RE = /{{([^}]+?)__([^}]+)}}/g;

/**
 * Replace every `{{nodeId__fieldKey}}` token in a TokenizedValue with its
 * human-readable label from variableMeta (format: "NodeLabel: FieldLabel").
 *
 * Falls back to the trimmed fieldKey when metadata is missing. Returns '∅'
 * for an empty value. Intended for display contexts where the resolved runtime
 * value is not yet available — e.g. the test tab before a node has been run.
 */
const formatTokenizedValue = (tokenized: TokenizedValue): string => {
  if (!tokenized.value) return '∅';
  const resolved = tokenized.value.replace(
    TOKEN_RE,
    (_match, nodeId: string, tokenKey: string) => {
      const key = `${nodeId}__${tokenKey}`;
      const trimmedKey = `${nodeId}__${tokenKey.trim()}`;
      const meta =
        tokenized.variableMeta[key] ?? tokenized.variableMeta[trimmedKey];
      if (meta) return `${meta.nodeLabel}: ${meta.fieldLabel.trim()}`;
      return tokenKey.trim() || '?';
    },
  );
  return resolved || '∅';
};

export { formatTokenizedValue };
