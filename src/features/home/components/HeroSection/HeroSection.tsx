import { ArrowRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { ROUTES } from '@/shared/constants';

export const HeroSection = () => {
  return (
    <section className="bg-surface relative px-6 py-16 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="border-outline-variant/20 bg-surface-container-low inline-flex items-center gap-2 rounded-lg border px-3 py-1">
              <span className="text-secondary text-[10px] font-bold tracking-widest uppercase">
                New Release
              </span>
              <span className="bg-secondary h-1 w-1 rounded-full" />
              <span className="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase">
                v2.4 Engine Now Live
              </span>
            </div>

            <h1 className="font-headline text-primary text-6xl leading-[1.05] font-bold tracking-tight lg:text-8xl">
              Engineering <br />{' '}
              <span className="text-secondary">Precision</span> AI.
            </h1>

            <p className="text-on-surface-variant max-w-xl text-xl leading-relaxed">
              Build robust, high-availability automation logic with our
              low-latency neural engine. Designed for teams that treat
              automation as core infrastructure.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="h-11 px-5 text-sm font-semibold tracking-normal normal-case"
                size="lg"
              >
                <Link href={ROUTES.auth.REGISTER}>
                  Get Started Free
                  <ArrowRightIcon className="size-4" weight="bold" />
                </Link>
              </Button>

              <Button
                asChild
                className="h-11 px-5 text-sm font-semibold tracking-normal normal-case"
                size="lg"
                variant="outline"
              >
                <a href="#">Technical Docs</a>
              </Button>
            </div>

            <div className="space-y-4 pt-8">
              <span className="text-on-surface-variant/60 text-[10px] font-bold tracking-[0.2em] uppercase">
                Trusted by Infrastructure Leaders
              </span>
              <div className="flex flex-wrap gap-x-10 gap-y-4 opacity-40 contrast-125 grayscale">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">
                    rocket_launch
                  </span>
                  <span className="text-xl font-bold tracking-tighter">
                    AEROCORE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">
                    memory
                  </span>
                  <span className="text-xl font-bold tracking-tighter">
                    SILICONX
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">
                    database
                  </span>
                  <span className="text-xl font-bold tracking-tighter">
                    DATAFLOW
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">
                    shield_with_heart
                  </span>
                  <span className="text-xl font-bold tracking-tighter">
                    SECURE.IO
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-primary-container overflow-hidden p-1 shadow-2xl">
              <div className="bg-surface-container-lowest border-outline-variant/10 flex min-h-[500px] flex-col gap-6 border p-6">
                <div className="border-outline-variant/10 flex items-center justify-between border-b pb-4">
                  <div className="flex gap-1.5">
                    <div className="bg-danger/40 h-2 w-2 rounded-full" />
                    <div className="bg-secondary/40 h-2 w-2 rounded-full" />
                    <div className="bg-primary-container/20 h-2 w-2 rounded-full" />
                  </div>
                  <span className="text-on-surface-variant/40 font-mono text-[10px] uppercase">
                    zentrox-orchestrator-v2.4.yaml
                  </span>
                </div>

                <div className="mx-auto w-full max-w-sm space-y-6 pt-0">
                  <div className="border-outline-variant/20 bg-surface-container-high flex items-center gap-4 rounded-lg border p-4 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                      <span className="material-symbols-outlined text-secondary text-xl">
                        hub
                      </span>
                    </div>
                    <div>
                      <div className="text-secondary text-[9px] font-bold tracking-wider uppercase">
                        WEBHOOK_LISTENER
                      </div>
                      <div className="text-on-surface text-sm font-semibold">
                        PostgreSQL Cluster Update
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 -mt-7 mb-0 flex justify-center">
                    <div className="from-primary-container/20 to-secondary h-12 w-px bg-gradient-to-b"></div>
                  </div>

                  <div className="bg-primary-container border-primary relative flex w-full items-center gap-4 rounded-lg border p-5 text-white shadow-2xl">
                    <div className="bg-secondary shadow-glow absolute -top-1.5 -right-1.5 h-3 w-3 animate-pulse rounded-full"></div>
                    <div className="bg-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                      <span
                        className="material-symbols-outlined text-xl text-white"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        psychology
                      </span>
                    </div>
                    <div>
                      <div className="text-secondary-fixed-dim text-[9px] font-bold tracking-wider uppercase">
                        AI_PROCESSOR
                      </div>
                      <div className="text-sm font-bold">
                        Heuristic Node Analysis
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 -mt-7 mb-0 flex justify-center">
                    <div className="from-primary-container/20 to-secondary h-12 w-px bg-gradient-to-b"></div>
                  </div>

                  <div className="border-outline-variant/20 bg-surface-container-high flex items-center gap-4 rounded-lg border p-4 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                      <span className="material-symbols-outlined text-secondary text-xl">
                        terminal
                      </span>
                    </div>
                    <div>
                      <div className="text-secondary text-[9px] font-bold tracking-wider uppercase">
                        ACTION_EXECUTE
                      </div>
                      <div className="text-on-surface text-sm font-semibold">
                        K8s Pod Rescheduling
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
