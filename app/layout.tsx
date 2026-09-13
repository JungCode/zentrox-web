import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { cn } from '@/lib/ui/utils';
import { ApolloWrapper, ThemeProvider } from '@/shared/components';
import { Toaster } from '@/shared/components/ui/sonner';
import { TooltipProvider } from '@/shared/components/ui/tooltip';

export const metadata: Metadata = {
  description:
    'Zentrox - High-Density AI Automation Platform. Build robust, high-availability automation logic with our low-latency neural engine.',
  title: 'Zentrox - AI Automation Platform',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html
      className={cn('h-full', 'antialiased')}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <ApolloWrapper>{children}</ApolloWrapper>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
};

export default RootLayout;
