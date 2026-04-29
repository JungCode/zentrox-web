import { Label as LabelPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/shared/utils/tailwind';

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'text-primary flex items-center gap-2 font-sans text-[10px] leading-none font-semibold tracking-[0.2em] uppercase select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
