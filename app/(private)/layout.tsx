'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { AppSidebar } from '@/features/workflow/components/AppSidebar/AppSidebar';
import { ApolloWrapper } from '@/shared/components/ApolloWrapper';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import { TooltipProvider } from '@/shared/components/ui/tooltip';
import { getAccessToken } from '@/shared/utils/storage';

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.replace('/login');
    }
  }, []);

  return (
    <ApolloWrapper>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ApolloWrapper>
  );
};

export default PrivateLayout;
