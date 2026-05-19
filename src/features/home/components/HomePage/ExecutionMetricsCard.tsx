type ExecutionMetricsCardProps = {
  bars: number[];
  labels: string[];
};

export const ExecutionMetricsCard = ({
  bars,
  labels,
}: ExecutionMetricsCardProps) => {
  const highlightIndex = 4;

  return (
    <div className="bg-primary-container text-on-primary dark:text-on-primary-container border-primary/20 rounded border p-6 shadow-lg">
      <div className="space-y-4">
        <div>
          <p className="text-on-primary/60 dark:text-on-primary-container/70 text-xs font-semibold tracking-[0.3em] uppercase">
            Execution Metrics
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <p className="text-3xl font-semibold">14,204</p>
            <span className="text-success text-xs font-semibold">+12%</span>
          </div>
        </div>
        <div className="flex items-end gap-2 pt-4">
          {bars.map((bar, index) => (
            <div
              key={`bar-${index}`}
              className="bg-on-primary/10 dark:bg-on-primary-container/20 flex-1 rounded"
              style={{ height: `${bar + 20}px` }}
            >
              <div
                className={`h-full rounded ${
                  index === highlightIndex
                    ? 'bg-secondary'
                    : 'bg-on-primary/25 dark:bg-on-primary-container/35'
                }`}
              />
            </div>
          ))}
        </div>
        <div className="text-on-primary/50 dark:text-on-primary-container/60 mt-2 flex justify-between text-[10px] font-semibold tracking-[0.3em] uppercase">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
