import type { HomeWorkflow } from '@/features/home/types';
import { Button } from '@/shared/components/ui/button';

type RecentWorkflowsCardProps = {
  workflows: HomeWorkflow[];
};

export const RecentWorkflowsCard = ({
  workflows,
}: RecentWorkflowsCardProps) => {
  return (
    <div className="bg-surface-container-lowest border-outline-variant/10 rounded border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-primary text-sm font-semibold">Recent Workflows</h3>
        <Button
          className="text-on-surface-variant hover:text-primary h-7 w-7 rounded-full"
          size="icon-sm"
          variant="ghost"
        >
          <span className="material-symbols-outlined text-base">tune</span>
        </Button>
      </div>
      <div className="divide-outline-variant/20 mt-4 divide-y">
        {workflows.map((workflow) => {
          const indicatorClassName =
            workflow.status === 'Active' ? 'bg-success' : 'bg-secondary';
          const statusClassName =
            workflow.status === 'Active'
              ? 'bg-success-container text-success'
              : 'bg-surface-container text-on-surface-variant';

          return (
            <div
              key={workflow.name}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${indicatorClassName}`}
                />
                <div>
                  <p className="text-primary text-sm font-semibold">
                    {workflow.name}
                  </p>
                  <p className="text-on-surface-variant text-xs">
                    {workflow.updated}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusClassName}`}
              >
                {workflow.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
