import type { ReactNode } from 'react';

import { ZentroxIcon } from '@/shared/assets/icons';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <section className="bg-primary-container text-on-primary relative hidden w-7/12 flex-col justify-between overflow-hidden px-16 py-16 lg:flex">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, var(--outline-variant) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="bg-secondary/40 absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-[120px]" />
        <div className="mb-12 flex items-center gap-3">
          <div className="text-on-secondary flex h-9 w-9 items-center justify-center rounded">
            <ZentroxIcon />
          </div>
          <span className="text-on-primary text-2xl font-semibold tracking-tight">
            Zentrox
          </span>
        </div>
        <div className="relative z-10">
          <div className="max-w-xl space-y-8">
            <h1 className="text-on-primary text-5xl leading-[1.1] font-bold tracking-tight">
              The logic layer for
              <br />
              <span className="text-secondary">Autonomous enterprise.</span>
            </h1>
            <p className="text-on-primary-container text-lg">
              Zentrox orchestrates cross-functional workflows with high-density
              AI nodes. Precision automation is no longer a luxury—it is your
              competitive architecture.
            </p>
          </div>
        </div>
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex gap-8">
            <div>
              <p className="text-on-primary-container text-[10px] font-semibold tracking-[0.2em] uppercase">
                Architecture
              </p>
              <p className="text-on-primary font-mono text-xs">v4.0.2-stable</p>
            </div>
            <div>
              <p className="text-on-primary-container text-[10px] font-semibold tracking-[0.2em] uppercase">
                Latency
              </p>
              <p className="text-on-primary font-mono text-xs">14ms average</p>
            </div>
          </div>
          <div className="bg-primary/40 flex items-center gap-2 rounded px-3 py-2">
            <span className="bg-secondary h-2 w-2 rounded-full shadow-[0_0_10px_var(--accent-glow)]" />
            <span className="text-on-primary text-[10px] tracking-[0.28em] uppercase">
              All systems operational
            </span>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-lowest flex w-full flex-1 flex-col justify-center px-8 py-16 sm:px-16 lg:w-5/12 lg:px-20">
        <div className="mx-auto w-full max-w-md">{children}</div>
        <div className="border-surface-container text-on-surface-variant mt-12 border-t pt-6 text-[10px] tracking-[0.28em] uppercase lg:hidden">
          <div className="flex items-center justify-between">
            <span>System Status: Operational</span>
            <span className="text-outline">Privacy</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PublicLayout;
