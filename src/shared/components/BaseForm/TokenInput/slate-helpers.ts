// src/shared/components/BaseForm/TokenInput/slate-helpers.ts
import { Descendant, Editor, Element } from 'slate';

import type {
  SlateParagraphElement,
  SlateTokenElement,
  VariableMeta,
} from '@/shared/types/baseform/token-input.types';

// Regex that finds every {{nodeId__tokenKey}} placeholder in the stored string value.
// The __ separator is intentional — fieldPath can contain dots (e.g. "answers.abc.value"),
// so we can't split on a dot. __ is unlikely to appear in either nodeId or fieldKey.
// Capture group 1 = nodeId, capture group 2 = tokenKey.
const VARIABLE_RE = /\{\{([^}]+?)__([^}]+)\}\}/g;

// serialize: Slate editor nodes → plain string + metadata map
//
// Walks the editor's node tree and converts it back into the storage format:
//   plain text: kept as-is
//   token nodes: replaced with "{{nodeId__fieldKey}}" and their metadata added to variableMeta
//
// Both outputs are needed by the form: the string is what gets saved to the config,
// and variableMeta lets us reconstruct the chips when the editor is re-initialized.
export const serialize = (
  nodes: Descendant[],
): { value: string; variableMeta: VariableMeta } => {
  const variableMeta: VariableMeta = {};
  const value = (nodes as SlateParagraphElement[])
    .map((paragraph) =>
      paragraph.children
        .map((child) => {
          // Plain text leaf — just return the string
          if ('text' in child) return child.text;

          // Token element — emit the placeholder string and record metadata
          const token = child as SlateTokenElement;
          const key = `${token.nodeId}__${token.fieldKey}`;
          variableMeta[key] = {
            fieldLabel: token.fieldLabel,
            fieldPath: token.fieldPath,
            joinSeparator: token.joinSeparator,
            nodeId: token.nodeId,
            nodeLabel: token.nodeLabel,
            nullFallback: token.nullFallback,
            valueKey: token.valueKey,
          };
          return `{{${key}}}`;
        })
        .join(''),
    )
    // Multiple paragraphs are collapsed into a single line (this input is single-line)
    .join('');
  return { value, variableMeta };
};

// deserialize: plain string + metadata map → Slate editor nodes
//
// The inverse of serialize. Scans the string for {{...}} placeholders and builds
// a list of Slate children — alternating text leaves and token void elements.
// If a placeholder's key is missing from variableMeta (e.g. deleted upstream node),
// it falls back to rendering the raw placeholder text so the user can see and remove it.
export const deserialize = (
  value: string,
  variableMeta: VariableMeta,
): SlateParagraphElement[] => {
  // Empty value: return a single paragraph with one empty text leaf.
  // Slate always needs at least one child, otherwise it throws.
  if (!value) {
    return [{ children: [{ text: '' }], type: 'paragraph' }];
  }

  const children: SlateParagraphElement['children'] = [];
  let lastIndex = 0;
  // Create a fresh RegExp each time so lastIndex doesn't bleed across calls
  const re = new RegExp(VARIABLE_RE.source, 'g');
  let match: RegExpExecArray | null;

  while ((match = re.exec(value)) !== null) {
    // Push any plain text that appears before this placeholder
    if (match.index > lastIndex) {
      children.push({ text: value.slice(lastIndex, match.index) });
    }

    const [, nodeId, tokenKey] = match;
    const meta = variableMeta[`${nodeId}__${tokenKey}`];

    if (meta) {
      // Known token — reconstruct the void chip element with all metadata
      children.push({
        children: [{ text: '' }], // required by Slate for void nodes
        fieldKey: tokenKey,
        fieldLabel: meta.fieldLabel,
        fieldPath: meta.fieldPath,
        joinSeparator: meta.joinSeparator,
        nodeId: meta.nodeId,
        nodeLabel: meta.nodeLabel,
        nullFallback: meta.nullFallback,
        type: 'token',
        valueKey: meta.valueKey,
      } satisfies SlateTokenElement);
    } else {
      // Unknown token (no matching metadata) — render the raw placeholder as text
      // so the user knows something is broken and can manually remove it
      children.push({ text: match[0] });
    }

    lastIndex = match.index + match[0].length;
  }

  // Push any trailing text after the last placeholder
  if (lastIndex < value.length) {
    children.push({ text: value.slice(lastIndex) });
  }
  // Slate requires at least one child in a paragraph
  if (children.length === 0) {
    children.push({ text: '' });
  }

  return [{ children, type: 'paragraph' }];
};

// withTokens: Slate editor plugin that configures token element behavior
//
// Slate editors are extended via "plugins" — plain functions that wrap the editor
// and override specific methods. This plugin does three things:
//   1. Marks token elements as "inline" so they flow with text (not block-level)
//   2. Marks token elements as "void" so the cursor can't enter them (they're chips)
//   3. Overrides paste to keep the editor single-line (strips block paragraphs
//      from pasted Slate fragments and collapses newlines from plain text)
export const withTokens = (editor: Editor): Editor => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => element.type === 'token' || isInline(element);

  editor.isVoid = (element) => element.type === 'token' || isVoid(element);

  // Override insertData (the paste handler) to enforce single-line behavior.
  // When pasting from another Slate editor (e.g. copy-pasting a token from elsewhere),
  // the clipboard carries an encoded Slate fragment that may contain block paragraphs.
  // We flatten those into their children so everything stays on one line.
  (editor as Editor & { insertData: (data: DataTransfer) => void }).insertData =
    (data: DataTransfer) => {
      const slateFragment = data.getData('application/x-slate-fragment');
      if (slateFragment) {
        const decoded = decodeURIComponent(window.atob(slateFragment));
        const fragment = JSON.parse(decoded) as Descendant[];
        // Flatten block paragraphs into inline nodes for single-line behavior
        const inlineNodes = fragment.flatMap((node) => {
          if (Element.isElement(node) && node.type === 'paragraph') {
            return node.children as Descendant[];
          }
          return [node];
        });
        editor.insertFragment(inlineNodes);
      } else {
        // Plain-text paste: replace newlines with spaces to stay single-line
        const text = data.getData('text/plain');
        if (text) {
          editor.insertText(text.replace(/[\r\n]+/g, ' '));
        }
      }
    };

  return editor;
};
