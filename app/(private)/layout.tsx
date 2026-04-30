'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { AppHeader, AppSidebar } from '@/shared/components';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import { useInitAuth } from '@/shared/hooks/useInitAuth';
import { getAccessToken } from '@/shared/utils/storage';

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useInitAuth();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.replace('/login');
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AppHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PrivateLayout;
