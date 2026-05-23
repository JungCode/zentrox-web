'use client';

import { type Path, useFormContext, useWatch } from 'react-hook-form';

import type {
  StepConfigFormValues,
  ZentroxAiInputField,
  ZentroxAiKnowledgeFile,
  ZentroxAiOutputField,
} from '@/features/workflow/types';
import { generateId } from '@/shared/utils';

const PATH = {
  inputs: 'configJson.inputs' as Path<StepConfigFormValues>,
  knowledgeFiles: 'configJson.knowledgeFiles' as Path<StepConfigFormValues>,
  outputs: 'configJson.outputs' as Path<StepConfigFormValues>,
  systemPrompt: 'configJson.systemPrompt' as Path<StepConfigFormValues>,
} as const;

const useZentroxAiConfigForm = () => {
  const { control, setValue } = useFormContext<StepConfigFormValues>();

  const systemPrompt = (useWatch({ control, name: PATH.systemPrompt }) ??
    '') as string;
  const knowledgeFiles = (useWatch({ control, name: PATH.knowledgeFiles }) ??
    []) as ZentroxAiKnowledgeFile[];
  const inputs = (useWatch({ control, name: PATH.inputs }) ??
    []) as ZentroxAiInputField[];
  const outputs = (useWatch({ control, name: PATH.outputs }) ??
    []) as ZentroxAiOutputField[];

  const handleChangeSystemPrompt = (next: string) =>
    setValue(PATH.systemPrompt, next, { shouldDirty: true });

  const writeKnowledgeFiles = (next: ZentroxAiKnowledgeFile[]) =>
    setValue(PATH.knowledgeFiles, next, { shouldDirty: true });

  const writeInputs = (next: ZentroxAiInputField[]) =>
    setValue(PATH.inputs, next, { shouldDirty: true });

  const writeOutputs = (next: ZentroxAiOutputField[]) =>
    setValue(PATH.outputs, next, { shouldDirty: true });

  const handleAddKnowledgeFile = (file: ZentroxAiKnowledgeFile) =>
    writeKnowledgeFiles([...knowledgeFiles, file]);

  const handleRemoveKnowledgeFile = (id: string) =>
    writeKnowledgeFiles(knowledgeFiles.filter((f) => f.id !== id));

  const handleAddInput = () => {
    const next: ZentroxAiInputField = {
      id: generateId(),
      name: '',
      value: '',
      variableMeta: {},
    };
    writeInputs([...inputs, next]);
  };

  const handleChangeInput = (id: string, patch: Partial<ZentroxAiInputField>) =>
    writeInputs(inputs.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const handleRemoveInput = (id: string) =>
    writeInputs(inputs.filter((f) => f.id !== id));

  const handleAddOutput = (draft: Omit<ZentroxAiOutputField, 'id'>) =>
    writeOutputs([...outputs, { ...draft, id: generateId() }]);

  const handleChangeOutput = (
    id: string,
    patch: Partial<ZentroxAiOutputField>,
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

export { useZentroxAiConfigForm };
