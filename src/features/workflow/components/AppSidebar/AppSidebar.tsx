'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/ui/utils';
import { PlusIcon, ZentroxIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';

import { navItems, supportItems } from '../../constants/navigation';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-sidebar-border/60 bg-sidebar text-sidebar-foreground border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary-container flex h-8 w-8 items-center justify-center rounded dark:bg-slate-800">
            <ZentroxIcon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sidebar-foreground text-xl font-bold tracking-tighter">
              Zentrox
            </h1>
            <p className="text-sidebar-foreground/75 font-heading text-[10px] tracking-[0.22em] uppercase">
              AI Logic Engine
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-1">
        <SidebarMenu className="gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/workflow' && pathname.startsWith(item.href));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="h-auto p-0"
                  isActive={isActive}
                >
                  <Link
                    className={cn(
                      'flex items-center gap-3 border-l-4 border-transparent px-3 py-2 text-sm font-medium tracking-tight transition-colors duration-150',
                      isActive
                        ? 'bg-sidebar-primary text-secondary border-secondary font-bold'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:text-sidebar-foreground',
                    )}
                    href={item.href}
                  >
                    <item.icon className="size-4 [&_path]:fill-current" />
                    <span className="font-heading">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border/80 mt-auto border-t px-4 py-4">
        <Button className="mb-4 h-8 w-full justify-center gap-2 rounded text-[10px] tracking-[0.2em] uppercase">
          <PlusIcon className="text-primary-foreground size-4 [&_path]:fill-current" />
          New Workflow
        </Button>

        <SidebarMenu className="gap-0.5">
          {supportItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="h-7 px-0 py-0" size="sm">
                <Link
                  className="text-sidebar-foreground/75 hover:text-sidebar-accent-foreground dark:text-sidebar-foreground flex h-7 items-center gap-2 rounded px-2 text-xs transition-colors"
                  href={item.href}
                >
                  <item.icon className="size-3.5 [&_path]:fill-current" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
