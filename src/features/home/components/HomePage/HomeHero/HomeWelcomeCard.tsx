type HomeWelcomeCardProps = {
  displayName: string;
};

export const HomeWelcomeCard = ({ displayName }: HomeWelcomeCardProps) => {
  return (
    <div className="bg-surface-container-lowest border-outline-variant/10 relative min-h-[170px] overflow-hidden rounded border px-8 py-7 shadow-sm">
      <span className="material-symbols-outlined text-outline-variant/20 absolute top-6 right-10 text-7xl">
        bolt
      </span>
      <h1 className="text-primary text-3xl leading-tight font-semibold">
        Welcome back, {displayName}
      </h1>
      <p className="text-on-surface-variant mt-3 max-w-xl text-sm leading-relaxed">
        Your automation nodes are running smoothly. You have 3 pending tasks for
        the Supply Chain workflow.
      </p>
    </div>
  );
};
