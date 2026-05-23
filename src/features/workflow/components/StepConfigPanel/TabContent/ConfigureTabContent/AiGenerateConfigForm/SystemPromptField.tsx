'use client';

import { FormItem } from '@/shared/components/BaseForm';
import { Textarea } from '@/shared/components/ui/textarea';

interface SystemPromptFieldProps {
  onChange: (value: string) => void;
  value: string;
}

const SystemPromptField = ({ onChange, value }: SystemPromptFieldProps) => {
  return (
    <FormItem
      label="System prompt"
      legend="Tell Zentrox AI how to behave. You can reference upstream step variables in the inputs below."
      required
    >
      <Textarea
        className="min-h-32 resize-none"
        onChange={(e) => onChange(e.target.value)}
        placeholder="You are a helpful assistant. Describe the role and constraints the model should follow…"
        value={value}
      />
    </FormItem>
  );
};

export { SystemPromptField };
