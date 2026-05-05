'use client';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Connect Sources',
      description:
        'Map your GraphQL, REST, or DB endpoints. Zentrox handles auth and rate limiting automatically.',
    },
    {
      number: '02',
      title: 'Define Logic',
      description:
        'Design logic trees visually. Mix standard operators with generative AI decision nodes.',
    },
    {
      number: '03',
      title: 'Dry Run Test',
      description:
        'Execute logic in sandbox environments. Compare AI predictions against historical production logs.',
    },
    {
      number: '04',
      title: 'Ship to Prod',
      description:
        'Blue/green deployments for every automation script. Rollback instantly if anomalies are detected.',
    },
  ];

  return (
    <section
      className="border-outline-variant/10 bg-surface-container-lowest border-y py-24"
      id="how-it-works"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-xl">
            <span className="text-secondary mb-4 block text-xs font-bold tracking-[0.2em] uppercase">
              The Implementation
            </span>
            <h2 className="text-primary text-5xl leading-tight font-bold">
              From Deployment to Autonomy.
            </h2>
          </div>
          <p className="text-on-surface-variant border-secondary max-w-xs border-l-2 pl-6 text-sm leading-relaxed">
            Integration takes minutes. The AI models refine themselves over
            hours. Production stability is forever.
          </p>
        </div>

        <div className="relative grid gap-12 md:grid-cols-4">
          <div className="bg-outline-variant/30 absolute top-10 right-0 left-0 -z-10 hidden h-px md:block"></div>

          {steps.map((step, i) => (
            <div key={i} className="group">
              <div
                className={`font-headline mb-8 flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-bold transition-transform group-hover:-translate-y-2 ${i === steps.length - 1 ? 'bg-secondary shadow-secondary/20 text-white shadow-xl' : 'bg-surface-container text-primary border-outline-variant border text-xl font-bold'}`}
              >
                {step.number}
              </div>
              <h4 className="text-primary mb-3 text-xl font-bold">
                {step.title}
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
