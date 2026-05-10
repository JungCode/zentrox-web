'use client';

import { ArrowRightIcon } from '@phosphor-icons/react';

import { ProviderAppMetadataRecord } from '@/features/workflow/constants';
import {
  useIntegrationAccounts,
  useTestRunNode,
} from '@/features/workflow/hooks';
import type { NodeQueryData } from '@/features/workflow/types/graph';
import { ZentroxIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';

import { StepConfigContentLayout } from '../StepConfigContentLayout';

interface UntestedViewProps {
  node: NodeQueryData | undefined;
  workflowId: string;
}

const UntestedView = ({ node, workflowId }: UntestedViewProps) => {
  const { accounts } = useIntegrationAccounts();
  const { loading, testRun } = useTestRunNode({
    nodeId: node?.id ?? '',
    workflowId,
  });

  const providerAppMetadata = node?.providerApp
    ? ProviderAppMetadataRecord[node.providerApp]
    : undefined;

  const connectedAccount = accounts.find(
    (a) => a.id === node?.integrationAccountId,
  );

  const Icon = providerAppMetadata?.icon;

  return (
    <StepConfigContentLayout
      footer={
        <Button
          className="w-full"
          disabled={!node?.id || loading}
          onClick={() => testRun()}
          size="lg"
          variant="secondary"
        >
          {loading && <Spinner data-icon="inline-start" />}
          Test trigger
        </Button>
      }
    >
      <div className="space-y-4">
        {Icon && (
          <div className="flex items-center gap-2">
            <div className="bg-surface-container border-outline-variant/40 flex h-10 w-10 items-center justify-center rounded border">
              <Icon className="size-5" />
            </div>
            <ArrowRightIcon className="text-outline" size={16} />
            <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded">
              <ZentroxIcon />
            </div>
          </div>
        )}

        <div>
          <p className="text-on-surface text-sm font-semibold">
            Test your trigger
          </p>
          <p className="text-on-surface-variant mt-1 text-xs leading-relaxed">
            To confirm your trigger is set up correctly, we&apos;ll find recent
            form responses in your account:
          </p>
        </div>

        {connectedAccount?.accountIdentifier && (
          <div className="border-outline-variant/40 flex items-center gap-2 rounded-md border px-3 py-2">
            {Icon && <Icon className="text-outline size-4 shrink-0" />}
            <span className="text-on-surface-variant text-xs">
              {connectedAccount.accountIdentifier}
            </span>
          </div>
        )}
      </div>
    </StepConfigContentLayout>
  );
};

export { UntestedView };
