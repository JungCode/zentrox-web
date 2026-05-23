'use client';

import { type Path, useFormContext, useWatch } from 'react-hook-form';

import type {
  AiGenerateInputField,
  AiGenerateKnowledgeFile,
  AiGenerateOutputField,
  StepConfigFormValues,
} from '@/features/workflow/types';
import { generateId } from '@/shared/utils';

const PATH = {
  inputs: 'configJson.inputs' as Path<StepConfigFormValues>,
  knowledgeFiles: 'configJson.knowledgeFiles' as Path<StepConfigFormValues>,
  outputs: 'configJson.outputs' as Path<StepConfigFormValues>,
  systemPrompt: 'configJson.systemPrompt' as Path<StepConfigFormValues>,
} as const;

const useAiGenerateConfigForm = () => {
  const { control, setValue } = useFormContext<StepConfigFormValues>();

  const systemPrompt = (useWatch({ control, name: PATH.systemPrompt }) ??
    '') as string;
  const knowledgeFiles = (useWatch({ control, name: PATH.knowledgeFiles }) ??
    []) as AiGenerateKnowledgeFile[];
  const inputs = (useWatch({ control, name: PATH.inputs }) ??
    []) as AiGenerateInputField[];
  const outputs = (useWatch({ control, name: PATH.outputs }) ??
    []) as AiGenerateOutputField[];

  const handleChangeSystemPrompt = (next: string) =>
    setValue(PATH.systemPrompt, next, { shouldDirty: true });

  const writeKnowledgeFiles = (next: AiGenerateKnowledgeFile[]) =>
    setValue(PATH.knowledgeFiles, next, { shouldDirty: true });

  const writeInputs = (next: AiGenerateInputField[]) =>
    setValue(PATH.inputs, next, { shouldDirty: true });

  const writeOutputs = (next: AiGenerateOutputField[]) =>
    setValue(PATH.outputs, next, { shouldDirty: true });

  const handleAddKnowledgeFile = (file: AiGenerateKnowledgeFile) =>
    writeKnowledgeFiles([...knowledgeFiles, file]);

  const handleRemoveKnowledgeFile = (id: string) =>
    writeKnowledgeFiles(knowledgeFiles.filter((f) => f.id !== id));

  const handleAddInput = () => {
    const next: AiGenerateInputField = {
      id: generateId(),
      name: '',
      value: '',
      variableMeta: {},
    };
    writeInputs([...inputs, next]);
  };

  const handleChangeInput = (id: string, patch: Partial<AiGenerateInputField>) =>
    writeInputs(inputs.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const handleRemoveInput = (id: string) =>
    writeInputs(inputs.filter((f) => f.id !== id));

  const handleAddOutput = (draft: Omit<AiGenerateOutputField, 'id'>) =>
    writeOutputs([...outputs, { ...draft, id: generateId() }]);

  const handleChangeOutput = (
    id: string,
    patch: Partial<AiGenerateOutputField>,
  ) => writeOutputs(outputs.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const handleRemoveOutput = (id: string) =>
    writeOutputs(outputs.filter((f) => f.id !== id));

  return {
    inputs,
    knowledgeFiles,
    onAddInput: handleAddInput,
    onAddKnowledgeFile: handleAddKnowledgeFile,
    onAddOutput: handleAddOutput,
    onChangeInput: handleChangeInput,
    onChangeOutput: handleChangeOutput,
    onChangeSystemPrompt: handleChangeSystemPrompt,
    onRemoveInput: handleRemoveInput,
    onRemoveKnowledgeFile: handleRemoveKnowledgeFile,
    onRemoveOutput: handleRemoveOutput,
    outputs,
    systemPrompt,
  };
};

export { useAiGenerateConfigForm };
