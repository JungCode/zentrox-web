import { ArticleIcon } from '@phosphor-icons/react';

import { Button } from '@/shared/components/ui/button';
import { AvailableField, AvailableFieldGroup } from '@/shared/types';

interface FieldItemProps {
  field: AvailableField;
  icon?: AvailableFieldGroup['icon'];
  onSelect: (field: AvailableField) => void;
}

const FieldItem = ({ field, icon: Icon, onSelect }: FieldItemProps) => {
  return (
    <div className="hover:bg-accent flex items-center gap-2 py-2 pr-3 pl-6">
      <Button
        className="h-auto flex-1 justify-start gap-2 overflow-hidden p-0 font-normal hover:bg-transparent"
        onClick={() => onSelect(field)}
        type="button"
        variant="ghost"
      >
        {Icon ? (
          <Icon className="text-primary shrink-0" size={16} />
        ) : (
          <ArticleIcon className="text-primary shrink-0" size={16} />
        )}
        <span className="min-w-0 shrink-0 text-sm font-medium">
          {field.fieldLabel}
        </span>

        <span className="text-muted-foreground min-w-0 truncate text-xs">
          {field.previewValue}
        </span>
      </Button>
    </div>
  );
};

export { FieldItem };
