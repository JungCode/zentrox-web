'use client';

import { FlaskIcon, RocketLaunchIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';

interface WorkflowHeaderProps {
  className?: string;
  /** Whether the publish action is loading */
  isPublishing?: boolean;
  onPublish: () => void;
  onTestRun: () => void;
  /** Workflow name shown in the centre of the bar */
  workflowName?: string;
}

/**
 * WorkflowHeader renders the slim action bar at the top of the workflow editor.
 *
 * Layout (mirrors Zapier's header):
 * - Left: Undo button
 * - Centre: Editable workflow name
 * - Right: "Test Run" (secondary/outline) + "Publish" (primary) buttons
 */
const WorkflowHeader = ({
  className,
  isPublishing = false,
  onPublish,
  onTestRun,
  workflowName = 'Untitled Workflow',
}: WorkflowHeaderProps) => {
  return (
    <header
      className={cn(
        'border-border/70 bg-surface-container-lowest flex h-12 shrink-0 items-center justify-between border-b px-4',
        className,
      )}
    >
      <div />

      {/* ── Centre: Workflow name ────────────────────────────────── */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <p className="text-on-surface font-headline text-sm font-bold">
          {workflowName}
        </p>
      </div>

      {/* ── Right: CTA buttons ──────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <Button onClick={onTestRun} size="sm" variant="outline">
          <FlaskIcon size={14} />
          Test Run
        </Button>
        <Button
          disabled={isPublishing}
          onClick={onPublish}
          size="sm"
          variant="default"
        >
          <RocketLaunchIcon size={14} />
          {isPublishing ? 'Publishing…' : 'Publish'}
        </Button>
      </div>
    </header>
  );
};

export { WorkflowHeader };
