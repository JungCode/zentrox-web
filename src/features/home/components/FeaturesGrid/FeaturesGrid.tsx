'use client';

import {
  ShieldCheck,
  Plugs,
  Cloud,
  Pulse,
  Eye,
  Gauge,
} from '@phosphor-icons/react';

export const FeaturesGrid = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Enterprise Guardrails',
      description:
        'SOC2 Type II, GDPR, and HIPAA compliant. Zentrox includes field-level encryption and full PII masking before data reaches AI models.',
      items: ['Role-Based Access Control', 'Immutable Audit Logs'],
    },
    {
      icon: Plugs,
      title: 'Low-Latency API Gateway',
      description:
        'Ultra-fast execution with sub-50ms overhead. Use our gRPC or REST APIs to trigger complex workflows from within your own applications.',
      items: ['10,000+ Req/Second', 'Type-Safe SDKs (Go, TS, Py)'],
    },
    {
      icon: Cloud,
      title: 'Hybrid-Cloud Mobility',
      description:
        'Deploy nodes on-premise for data sovereignty or use our global cluster. Native support for AWS PrivateLink and Azure VNet Integration.',
      items: ['Private Cloud Deployment', 'Edge Logic Execution'],
    },
    {
      icon: Pulse,
      title: 'Self-Healing Logic',
      description:
        'The engine automatically adjusts to API schema changes and network instability using intelligent retry strategies.',
      items: ['Auto-Retries', 'Schema Adaptation'],
    },
    {
      icon: Eye,
      title: 'Real-time Telemetry',
      description:
        'Native Prometheus and Datadog integrations. Export every execution metric to your existing observability stack.',
      items: ['Prometheus Export', 'Datadog Integration'],
    },
    {
      icon: Gauge,
      title: 'Performance Analytics',
      description:
        'Deep insights into workflow execution patterns, latency distributions, and AI decision confidence scores across your entire automation portfolio.',
      items: ['Latency Analysis', 'Confidence Scoring'],
    },
  ];

  return (
    <section className="bg-surface-container-low px-6 py-32" id="features">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 text-center">
          <span className="text-secondary text-xs font-bold tracking-[0.2em] uppercase">
            Advanced Architecture
          </span>
          <h2 className="text-primary mt-4 text-5xl font-bold">
            Engineered for High-Density Workloads
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest border-outline-variant/10 hover:border-secondary/30 group rounded-xl border p-8 shadow-sm transition-all"
              >
                <div className="bg-primary-container group-hover:bg-secondary mb-6 flex h-12 w-12 items-center justify-center rounded-lg text-white transition-colors">
                  <Icon className="size-6" weight="bold" />
                </div>

                <h3 className="text-primary mb-4 text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.items.map((it, i) => (
                    <li
                      key={i}
                      className="text-primary flex items-center gap-2 text-[11px] font-bold uppercase opacity-60"
                    >
                      <span className="bg-secondary h-1 w-1 rounded-full" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
