'use client';

import { useAiGenerateConfigForm } from '@/features/workflow/hooks';
import type { NodeQueryData } from '@/features/workflow/types';
import { Separator } from '@/shared/components/ui/separator';

import { InputsSection } from './InputsSection';
import { KnowledgeBaseSection } from './KnowledgeBaseSection';
import { OutputsSection } from './OutputsSection';
import { SystemPromptField } from './SystemPromptField';

interface AiGenerateConfigFormProps {
  node: NodeQueryData;
}

const AiGenerateConfigForm = ({ node }: AiGenerateConfigFormProps) => {
  const {
    inputs,
    knowledgeFiles,
    onAddInput,
    onAddKnowledgeFile,
    onAddOutput,
    onChangeInput,
    onChangeOutput,
    onChangeSystemPrompt,
    onRemoveInput,
    onRemoveKnowledgeFile,
    onRemoveOutput,
    outputs,
    systemPrompt,
  } = useAiGenerateConfigForm();

  return (
    <div className="space-y-4">
      <SystemPromptField onChange={onChangeSystemPrompt} value={systemPrompt} />

      <KnowledgeBaseSection
        files={knowledgeFiles}
        onAdd={onAddKnowledgeFile}
        onRemove={onRemoveKnowledgeFile}
      />

      <InputsSection
        inputs={inputs}
        node={node}
        onAdd={onAddInput}
        onChange={onChangeInput}
        onRemove={onRemoveInput}
      />

      <Separator />

      <OutputsSection
        onAdd={onAddOutput}
        onChange={onChangeOutput}
        onRemove={onRemoveOutput}
        outputs={outputs}
      />
    </div>
  );
};

export { AiGenerateConfigForm };
