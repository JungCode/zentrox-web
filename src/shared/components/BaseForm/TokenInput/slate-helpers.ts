// src/shared/components/BaseForm/TokenInput/slate-helpers.ts
import { Descendant, Editor, Element } from 'slate';

import type {
  SlateParagraphElement,
  SlateTokenElement,
  VariableMeta,
} from '@/shared/types/baseform/token-input.types';

const VARIABLE_RE = /\{\{([^.]+)\.([^.]+)\.value\}\}/g;

export const serialize = (
  nodes: Descendant[],
): { value: string; variableMeta: VariableMeta } => {
  const variableMeta: VariableMeta = {};
  const value = (nodes as SlateParagraphElement[])
    .map((paragraph) =>
      paragraph.children
        .map((child) => {
          if ('text' in child) return child.text;
          const token = child as SlateTokenElement;
          const key = `${token.nodeId}.${token.fieldKey}`;
          variableMeta[key] = {
            fieldKey: token.fieldKey,
            fieldLabel: token.fieldLabel,
            nodeId: token.nodeId,
            nodeLabel: token.nodeLabel,
            previewValue: token.previewValue,
          };
          return `{{${key}.value}}`;
        })
        .join(''),
    )
    .join('');
  return { value, variableMeta };
};

export const deserialize = (
  value: string,
  variableMeta: VariableMeta,
): SlateParagraphElement[] => {
  if (!value) {
    return [{ children: [{ text: '' }], type: 'paragraph' }];
  }

  const children: SlateParagraphElement['children'] = [];
  let lastIndex = 0;
  const re = new RegExp(VARIABLE_RE.source, 'g');
  let match: RegExpExecArray | null;

  while ((match = re.exec(value)) !== null) {
    if (match.index > lastIndex) {
      children.push({ text: value.slice(lastIndex, match.index) });
    }
    const [, nodeId, fieldKey] = match;
    const meta = variableMeta[`${nodeId}.${fieldKey}`];
    if (meta) {
      children.push({
        children: [{ text: '' }],
        fieldKey: meta.fieldKey,
        fieldLabel: meta.fieldLabel,
        nodeId: meta.nodeId,
        nodeLabel: meta.nodeLabel,
        previewValue: meta.previewValue,
        type: 'token',
      } satisfies SlateTokenElement);
    } else {
      children.push({ text: match[0] });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    children.push({ text: value.slice(lastIndex) });
  }
  if (children.length === 0) {
    children.push({ text: '' });
  }

  return [{ children, type: 'paragraph' }];
};

export const withTokens = (editor: Editor): Editor => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => element.type === 'token' || isInline(element);

  editor.isVoid = (element) => element.type === 'token' || isVoid(element);

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
        const text = data.getData('text/plain');
        if (text) {
          editor.insertText(text.replace(/[\r\n]+/g, ' '));
        }
      }
    };

  return editor;
};
