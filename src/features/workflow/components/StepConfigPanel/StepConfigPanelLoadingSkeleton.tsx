import { Skeleton } from '@/shared/components/ui/skeleton';

const StepConfigPanelLoadingSkeleton = () => (
  <>
    <div className="border-border/60 flex items-center gap-3 border-b px-4 py-3">
      <Skeleton className="h-8 w-8 rounded-md" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-36" />
      </div>
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>

    <div className="border-border/60 flex items-center gap-4 border-b px-4 py-3">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-14 rounded-full" />
    </div>

    <div className="space-y-4 p-4">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-16 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  </>
);

export { StepConfigPanelLoadingSkeleton };
