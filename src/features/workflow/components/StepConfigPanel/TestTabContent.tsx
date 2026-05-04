'use client';

import { CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';

import type { NodeQueryData } from '../../types/graph';

const TestTabContent = ({ node }: { node: NodeQueryData | undefined }) => {
  const [tested, setTested] = useState(false);

  return (
    <div className="space-y-4">
      <p className="text-on-surface-variant text-xs leading-relaxed">
        Testing this step ensures it runs smoothly. If you skip testing, you can
        publish, but it may lead to errors.
      </p>

      {tested ? (
        <div className="bg-success-container border-success/30 flex items-start gap-3 rounded-md border p-3">
          <CheckCircleIcon
            className="text-success mt-0.5 shrink-0"
            size={16}
            weight="fill"
          />
          <div>
            <p className="text-on-surface text-sm font-semibold">Test passed</p>
            <p className="text-on-surface-variant mt-0.5 text-xs">
              {node?.label ?? 'Step'} returned sample data successfully.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-surface-container border-outline-variant/40 rounded-md border border-dashed p-4 text-center">
          <WarningCircleIcon className="text-outline mx-auto mb-2" size={24} />
          <p className="text-on-surface-variant text-xs">No test data yet</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          className="flex-1"
          onClick={() => setTested(true)}
          size="lg"
          variant="secondary"
        >
          Test step
        </Button>
        {tested && (
          <Button className="flex-1" size="lg" variant="outline">
            Skip tests
          </Button>
        )}
      </div>
    </div>
  );
};

export { TestTabContent };
