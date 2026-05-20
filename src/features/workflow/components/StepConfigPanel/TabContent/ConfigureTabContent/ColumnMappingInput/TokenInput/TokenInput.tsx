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

import { FieldPicker } from './FieldPicker/FieldPicker';
import {
  deserialize,
  serialize,
  withTokens,
} from '@/features/workflow/helpers';
import { TokenChip } from './TokenChip';

const TokenInput = ({
  nodeId,
  onChange,
  placeholder,
  value = '',
  variableMeta = {},
  workflowVersionId,
}: TokenInputProps) => {
  // Fetch upstream node sample data for the field picker.
  // availableFields is grouped by node — each group lists the fields that node produces.
  const { availableFields } = useWorkflowNodeSamples({
    nodeId,
    workflowVersionId,
  });

  // Create the Slate editor once and never recreate it (useMemo with empty deps).
  // We compose three plugins:
  //   withReact   — adds React rendering support
  //   withHistory — adds undo/redo (Ctrl-Z) support
  //   withTokens  — our custom plugin: marks token elements as inline/void and handles paste
  const editor = useMemo(
    () => withTokens(withHistory(withReact(createEditor()))),
    [],
  );

  // Deserialize the initial string value into Slate nodes once at mount.
  // After mount, external value changes are handled by the useEffect below
  // so we intentionally omit `value` and `variableMeta` from deps here.
  const initialValue = useMemo(
    () => deserialize(value, variableMeta),
    // Only used on mount — external sync handled by useEffect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [pickerOpen, setPickerOpen] = useState(false);

  // Tracks the last value we serialized to avoid re-initializing the editor
  // when an onChange we triggered comes back as a new value prop (infinite loop guard).
  const lastSerializedRef = useRef(value);

  // Saves the cursor position before the picker popover opens so we can restore
  // it when the user selects a field. Without this, the editor loses focus when
  // the popover opens and the token gets inserted at the start instead of the cursor.
  const savedSelectionRef = useRef<BaseRange | null>(null);

  // Sync editor content when value prop changes from outside (form reset, node switch).
  // We directly mutate editor.children and call editor.onChange() instead of
  // remounting the <Slate> component, which would lose undo history and cause a flash.
  useEffect(() => {
    if (value === lastSerializedRef.current) return;
    const newNodes = deserialize(value, variableMeta);
    editor.children = newNodes;
    editor.history = { redos: [], undos: [] }; // clear stale history for the new content
    editor.deselect();
    editor.onChange();
    lastSerializedRef.current = value;
  }, [editor, value, variableMeta]);

  // renderLeaf: renders plain text nodes.
  // The pl-[0.1px] trick gives empty text nodes a tiny width so Slate can place
  // the cursor next to a token chip even when there's no adjacent text.
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

  // renderElement: switches between the two element types.
  // token → renders a TokenChip (the non-editable pill with the field label)
  // paragraph → renders a plain div (the single-line container)
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

  // insertToken: called when the user picks a field from the popover.
  // Restores the saved cursor position (so the token lands where the user was typing),
  // then inserts a void token element and moves the cursor one offset past it
  // so the user can keep typing after the chip.
  const insertToken = (field: AvailableField) => {
    ReactEditor.focus(editor);

    if (savedSelectionRef.current) {
      editor.select(savedSelectionRef.current);
    } else {
      // No saved selection (e.g. user opened picker without clicking in editor first)
      // — fall back to the end of the document
      editor.select(editor.end([]));
    }

    const token: SlateTokenElement = {
      children: [{ text: '' }],
      fieldKey: field.fieldKey,
      fieldLabel: field.fieldLabel,
      fieldPath: field.fieldPath,
      joinSeparator: field.joinSeparator,
      nodeId: field.nodeId,
      nodeLabel: field.nodeLabel,
      nullFallback: field.nullFallback,
      previewValue: field.previewValue,
      type: 'token',
      valueKey: field.valueKey,
    };

    editor.insertNodes(token);
    editor.move({ unit: 'offset' }); // move cursor past the inserted chip
    setPickerOpen(false);
  };

  return (
    // PopoverAnchor wraps the whole input container so the picker popover
    // can be positioned relative to it (side="left" in PopoverContent).
    <Popover onOpenChange={setPickerOpen} open={pickerOpen}>
      <PopoverAnchor asChild>
        <div className="flex min-h-10 cursor-text items-start gap-1 rounded-xs border px-3 py-2">
          {/*
            <Slate> is the context provider. <Editable> is the actual DOM surface.
            onValueChange fires on every change; we serialize to string + meta and
            bubble up to the form's onChange.
          */}
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
                // Save cursor position before focus leaves the editor (e.g. user clicks "+" button).
                // Needed so insertToken can restore it and place the new chip at the right spot.
                savedSelectionRef.current = editor.selection;
              }}
              onKeyDown={(e) => {
                // Prevent Enter from creating a new paragraph — this is a single-line input
                if (e.key === 'Enter') e.preventDefault();
              }}
              placeholder={placeholder}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </Slate>
          {/* The "+" button opens the field picker popover */}
          <PopoverTrigger asChild>
            <Button
              className="shrink-0 focus-visible:ring-0"
              onClick={(e) => e.stopPropagation()} // prevent click from bubbling to the input container
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              <PlusIcon />
            </Button>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
      {/* Field picker panel — shows grouped fields from upstream workflow nodes */}
      <PopoverContent align="start" className="w-96 p-0" side="left">
        <FieldPicker groups={availableFields} onSelect={insertToken} />
      </PopoverContent>
    </Popover>
  );
};

export { TokenInput };
