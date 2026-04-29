'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';

const items = [
  { active: true, icon: 'Home', title: 'Home' },
  { icon: 'Workflow', title: 'Workflows' },
  { icon: 'Images', title: 'Assets' },
  { icon: 'LayoutTemplate', title: 'Templates' },
  { icon: 'Store', title: 'Marketplace' },
  { icon: 'Terminal', title: 'Logs' },
  { icon: 'Settings', title: 'Settings' },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-red-500">
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="h-14 justify-start gap-4 text-base"
                isActive={item.active}
              >
                {/* <item.icon className="size-5" /> */}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
