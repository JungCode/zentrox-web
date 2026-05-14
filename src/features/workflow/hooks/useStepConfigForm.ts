'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  CONFIGURE_GOOGLE_FORM_FALLBACKS,
  SETUP_FORM_FALLBACKS,
} from '@/features/workflow/constants/formFallback';
import { getDefaultValues } from '@/shared/utils';

import type { ConfigStep, StepConfigFormValues } from '../types';
import type { NodeQueryData } from '../types/graph';
import { useStepCompletion } from './useStepCompletion';
import { useUpdateWorkflowNode } from './useUpdateWorkflowNode';

interface UseStepConfigFormProps {
  node: NodeQueryData | undefined;
  workflowId: string;
}

const useStepConfigForm = ({ node, workflowId }: UseStepConfigFormProps) => {
  const { loading, updateNode } = useUpdateWorkflowNode({ node, workflowId });
  const [activeStep, setActiveStep] = useState<ConfigStep>('setup');

  const methods = useForm<StepConfigFormValues>({
    defaultValues: {
      ...getDefaultValues(node, SETUP_FORM_FALLBACKS),
      ...getDefaultValues(node, CONFIGURE_GOOGLE_FORM_FALLBACKS),
    },
    values: {
      ...getDefaultValues(node, SETUP_FORM_FALLBACKS),
      ...getDefaultValues(node, CONFIGURE_GOOGLE_FORM_FALLBACKS),
    },
  });

  const handleSetup = async (values: StepConfigFormValues) => {
    await updateNode({
      actionKey: values.actionKey,
      integrationAccountId: values.integrationAccountId,
    });
  };

  const handleConfigure = async (values: StepConfigFormValues) => {
    await updateNode({
      configJson: {
        ...(node?.configJson ?? {}),
        formId: values.configJson?.formId,
        formName: values.configJson?.formName,
      },
    });
  };

  const submitCurrentStep = async (values: StepConfigFormValues) => {
    switch (activeStep) {
      case 'setup':
        await handleSetup(values);
        break;
      case 'configure':
        await handleConfigure(values);
        break;
      default:
        break;
    }
  };

  const submit = methods.handleSubmit(async (values) => {
    await submitCurrentStep(values);

    switch (activeStep) {
      case 'setup':
        setActiveStep('configure');
        break;
      case 'configure':
        setActiveStep('test');
        break;
      default:
        break;
    }
  });

  const submitToStep = (targetStep: ConfigStep) =>
    methods.handleSubmit(async (values) => {
      await submitCurrentStep(values);
      setActiveStep(targetStep);
    });

  return {
    activeStep,
    loading,
    methods,
    setActiveStep,
    submit,
    submitToStep,
  };
};

export { useStepConfigForm };
