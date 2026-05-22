'use client';

import { useState } from 'react';

import type {
  NodeQueryData,
  ZentroxAiConfigDraft,
  ZentroxAiInputField,
  ZentroxAiKnowledgeFile,
  ZentroxAiOutputField,
} from '@/features/workflow/types';
import { Separator } from '@/shared/components/ui/separator';
import { generateId } from '@/shared/utils';

import { InputsSection } from './InputsSection';
import { KnowledgeBaseSection } from './KnowledgeBaseSection';
import { OutputsSection } from './OutputsSection';
import { SystemPromptField } from './SystemPromptField';

const INITIAL_DRAFT: ZentroxAiConfigDraft = {
  inputs: [],
  knowledgeFiles: [],
  outputs: [],
  systemPrompt: '',
};

interface ZentroxAiConfigFormProps {
  node: NodeQueryData;
}

const ZentroxAiConfigForm = ({ node }: ZentroxAiConfigFormProps) => {
  const [draft, setDraft] = useState<ZentroxAiConfigDraft>(INITIAL_DRAFT);

  const handleSystemPromptChange = (systemPrompt: string) =>
    setDraft((prev) => ({ ...prev, systemPrompt }));

  const handleAddKnowledgeFile = (file: ZentroxAiKnowledgeFile) =>
    setDraft((prev) => ({
      ...prev,
      knowledgeFiles: [...prev.knowledgeFiles, file],
    }));

  const handleRemoveKnowledgeFile = (id: string) =>
    setDraft((prev) => ({
      ...prev,
      knowledgeFiles: prev.knowledgeFiles.filter((f) => f.id !== id),
    }));

  const handleAddInput = () => {
    const input: ZentroxAiInputField = {
      id: generateId(),
      name: '',
      value: '',
    };
    setDraft((prev) => ({ ...prev, inputs: [...prev.inputs, input] }));
  };

  const handleChangeInput = (id: string, patch: Partial<ZentroxAiInputField>) =>
    setDraft((prev) => ({
      ...prev,
      inputs: prev.inputs.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));

  const handleRemoveInput = (id: string) =>
    setDraft((prev) => ({
      ...prev,
      inputs: prev.inputs.filter((f) => f.id !== id),
    }));

  const handleAddOutput = (draft: Omit<ZentroxAiOutputField, 'id'>) => {
    const output: ZentroxAiOutputField = { ...draft, id: generateId() };
    setDraft((prev) => ({ ...prev, outputs: [...prev.outputs, output] }));
  };

  const handleChangeOutput = (
    id: string,
    patch: Partial<ZentroxAiOutputField>,
  ) =>
    setDraft((prev) => ({
      ...prev,
      outputs: prev.outputs.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));

  const handleRemoveOutput = (id: string) =>
    setDraft((prev) => ({
      ...prev,
      outputs: prev.outputs.filter((f) => f.id !== id),
    }));

  return (
    <div className="space-y-4">
      <SystemPromptField
        onChange={handleSystemPromptChange}
        value={draft.systemPrompt}
      />

      <KnowledgeBaseSection
        files={draft.knowledgeFiles}
        onAdd={handleAddKnowledgeFile}
        onRemove={handleRemoveKnowledgeFile}
      />

      <InputsSection
        inputs={draft.inputs}
        node={node}
        onAdd={handleAddInput}
        onChange={handleChangeInput}
        onRemove={handleRemoveInput}
      />

      <Separator />

      <OutputsSection
        onAdd={handleAddOutput}
        onChange={handleChangeOutput}
        onRemove={handleRemoveOutput}
        outputs={draft.outputs}
      />
    </div>
  );
};

export { ZentroxAiConfigForm };
