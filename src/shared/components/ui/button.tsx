import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/ui/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[0.25rem] border border-outline-variant/60 bg-clip-padding text-xs font-semibold whitespace-nowrap transition-all outline-none select-none cursor-pointer focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary/50 active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-lg': 'size-9',
        'icon-sm': 'size-7',
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        sm: "h-7 gap-1 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        default:
          'bg-primary text-primary-foreground border-primary/30 font-heading font-bold hover:bg-primary-container hover:border-primary-container dark:hover:bg-foreground dark:hover:border-foreground dark:hover:text-on-foreground',
        destructive:
          'bg-danger-container text-danger border-danger/40 hover:bg-danger-container/80 focus-visible:border-destructive focus-visible:ring-destructive/30 dark:bg-danger-container/30 dark:hover:bg-danger-container/50 dark:focus-visible:ring-destructive/40',
        ghost:
          'border-transparent bg-transparent text-secondary hover:text-primary aria-expanded:bg-surface-container-low aria-expanded:text-primary',
        link: 'border-transparent bg-transparent text-secondary underline-offset-4 hover:underline',
        outline:
          'border-outline-variant/60 bg-transparent text-primary hover:bg-surface-container-low hover:text-primary aria-expanded:bg-surface-container-low aria-expanded:text-primary',
        secondary:
          'bg-secondary text-secondary-foreground border-secondary/30 hover:bg-secondary/90 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
      },
    },
  },
);

function Button({
  asChild = false,
  className,
  size = 'default',
  variant = 'default',
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      data-size={size}
      data-slot="button"
      data-variant={variant}
      {...props}
    />
  );
}

export { Button, buttonVariants };
