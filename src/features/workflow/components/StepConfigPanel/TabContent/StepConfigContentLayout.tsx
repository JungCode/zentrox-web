import type { ReactNode } from 'react';

interface StepConfigContentLayoutProps {
  children: ReactNode;
  footer: ReactNode;
}

const StepConfigContentLayout = ({
  children,
  footer,
}: StepConfigContentLayoutProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
      <div className="border-border/60 border-t px-4 py-3">{footer}</div>
    </div>
  );
};

export { StepConfigContentLayout };
