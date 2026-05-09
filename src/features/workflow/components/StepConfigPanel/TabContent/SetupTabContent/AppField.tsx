'use client';

import type { ProviderAppMetadataType } from '@/features/workflow/types';
import type { NodeQueryData } from '@/features/workflow/types/graph';
import { Button } from '@/shared/components/ui/button';

interface AppFieldProps {
  node: NodeQueryData | undefined;
  onChangeClick: () => void;
  providerAppMetadata: ProviderAppMetadataType | undefined;
}

const AppField = ({
  node,
  onChangeClick,
  providerAppMetadata,
}: AppFieldProps) => {
  return (
    <div className="border-border flex items-center gap-2.5 rounded-xs border px-3 py-2.5">
      {node ? (
        <>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-sm">
            {providerAppMetadata && <providerAppMetadata.icon />}
          </span>
          <span className="text-on-surface text-sm font-medium">
            {providerAppMetadata?.name}
          </span>
        </>
      ) : (
        <span className="text-outline text-sm">No app selected</span>
      )}
      <Button
        className="text-secondary ml-auto"
        onClick={onChangeClick}
        size="sm"
        type="button"
        variant="link"
      >
        Change
      </Button>
    </div>
  );
};

export { AppField };
