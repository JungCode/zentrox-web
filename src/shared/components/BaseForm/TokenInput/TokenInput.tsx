// src/shared/components/BaseForm/TokenInput/TokenInput.tsx
'use client';

import { PlusIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type BaseRange, createEditor, type Descendant } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  ReactEditor,
  type RenderElementProps,
  type RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react';

import { useWorkflowNodeSamples } from '@/features/workflow/hooks';
import { Button } from '@/shared/components/ui/button';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import type {
  AvailableField,
  SlateTokenElement,
  TokenInputProps,
} from '@/shared/types/baseform/token-input.types';

import { FieldPicker } from './FieldPicker';
import { deserialize, serialize, withTokens } from './slate-helpers';
import { TokenChip } from './TokenChip';

const TokenInput = ({
  nodeId,
  onChange,
  placeholder,
  value = '',
  variableMeta = {},
  workflowVersionId,
}: TokenInputProps) => {
  const { availableFields } = useWorkflowNodeSamples({
    nodeId,
    workflowVersionId,
  });

  const editor = useMemo(
    () => withTokens(withHistory(withReact(createEditor()))),
    [],
  );

  const initialValue = useMemo(
    () => deserialize(value, variableMeta),
    // Only used on mount — external sync handled by useEffect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [pickerOpen, setPickerOpen] = useState(false);
  const lastSerializedRef = useRef(value);
  const savedSelectionRef = useRef<BaseRange | null>(null);

  // Sync editor content when value prop changes from outside (form reset, node switch)
  useEffect(() => {
    if (value === lastSerializedRef.current) return;
    const newNodes = deserialize(value, variableMeta);
    editor.children = newNodes;
    editor.history = { redos: [], undos: [] };
    editor.deselect();
    editor.onChange();
    lastSerializedRef.current = value;
  }, [editor, value, variableMeta]);

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => (
      <span
        className={leaf.text === '' ? 'pl-[0.1px]' : undefined}
        {...attributes}
      >
        {children}
      </span>
    ),
    [],
  );

  const renderElement = useCallback((props: RenderElementProps) => {
    if (props.element.type === 'token') {
      return (
        <TokenChip
          attributes={props.attributes as Record<string, unknown>}
          element={props.element as SlateTokenElement}
        >
          {props.children}
        </TokenChip>
      );
    }
    return <div {...props.attributes}>{props.children}</div>;
  }, []);

  const insertToken = (field: AvailableField) => {
    ReactEditor.focus(editor);

    if (savedSelectionRef.current) {
      editor.select(savedSelectionRef.current);
    } else {
      editor.select(editor.end([]));
    }

    const token: SlateTokenElement = {
      children: [{ text: '' }],
      fieldKey: field.fieldKey,
      fieldLabel: field.fieldLabel,
      nodeId: field.nodeId,
      nodeLabel: field.nodeLabel,
      previewValue: field.previewValue,
      type: 'token',
    };

    editor.insertNodes(token);
    editor.move({ unit: 'offset' });
    setPickerOpen(false);
  };

  return (
    <Popover onOpenChange={setPickerOpen} open={pickerOpen}>
      <PopoverAnchor asChild>
        <div className="flex min-h-10 cursor-text items-start gap-1 rounded-xs border px-3 py-2">
          <Slate
            editor={editor}
            initialValue={initialValue as Descendant[]}
            onValueChange={(nodes) => {
              const { value: serialized, variableMeta: meta } =
                serialize(nodes);
              lastSerializedRef.current = serialized;
              onChange?.(serialized, meta);
            }}
          >
            <Editable
              className="token-input-text mt-1 min-w-0 flex-1 text-sm wrap-break-word outline-none"
              onBlur={() => {
                savedSelectionRef.current = editor.selection;
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
              placeholder={placeholder}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </Slate>
          <PopoverTrigger asChild>
            <Button
              className="shrink-0 focus-visible:ring-0"
              onClick={(e) => e.stopPropagation()}
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              <PlusIcon />
            </Button>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
      <PopoverContent align="start" className="w-96 p-0" side="left">
        <FieldPicker groups={availableFields} onSelect={insertToken} />
      </PopoverContent>
    </Popover>
  );
};

export { TokenInput };
