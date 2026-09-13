import Link from 'next/link';

import { ROUTES } from '@/shared/constants';

export const CreateWorkflowCard = () => {
  return (
    <div className="bg-primary-container text-on-primary border-primary/20 relative min-h-[170px] overflow-hidden rounded border px-7 py-6 shadow-lg">
      <div className="bg-on-primary/10 absolute -top-10 -right-10 h-40 w-40 rounded-full" />
      <div className="relative z-10 space-y-4">
        <div className="bg-on-primary/10 inline-flex h-10 w-10 items-center justify-center rounded">
          <span className="material-symbols-outlined text-xl text-white">
            add
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Create Workflow</h2>
          <p className="text-on-primary-container mt-2 text-sm leading-relaxed">
            Design a new AI-driven automation from scratch.
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] text-white uppercase"
          href={ROUTES.app.WORKFLOW}
        >
          Start Building
          <span className="material-symbols-outlined text-base">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
};
