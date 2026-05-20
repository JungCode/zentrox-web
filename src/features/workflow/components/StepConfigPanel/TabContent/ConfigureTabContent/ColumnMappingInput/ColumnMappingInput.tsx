import { Path, useFormContext, useWatch } from 'react-hook-form';

import { GoogleSheetColumnHeader } from '@/features/workflow/hooks';
import {
  GoogleSheetColumnMapping,
  NodeQueryData,
  StepConfigFormValues,
} from '@/features/workflow/types';

import { TokenInput } from './TokenInput';

export const ColumnMappingInput = ({
  header,
  index,
  node,
}: {
  header: GoogleSheetColumnHeader;
  index: number;
  node: NodeQueryData;
}) => {
  const { control, setValue } = useFormContext<StepConfigFormValues>();

  const mapping = useWatch({
    control,
    name: `configJson.columnMappings.${index}` as Path<StepConfigFormValues>,
  }) as GoogleSheetColumnMapping | undefined;

  return (
    <TokenInput
      nodeId={node.id}
      onChange={(val, meta) =>
        setValue(
          `configJson.columnMappings.${index}` as Path<StepConfigFormValues>,
          {
            columnIndex: header.index,
            columnName: header.name,
            value: val,
            variableMeta: meta,
          },
          { shouldDirty: true },
        )
      }
      placeholder="Enter text or insert data"
      value={mapping?.value ?? ''}
      variableMeta={mapping?.variableMeta}
      workflowVersionId={node.workflowVersionId}
    />
  );
};
