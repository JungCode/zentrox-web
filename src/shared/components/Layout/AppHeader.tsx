'use client';

import { BellIcon, QuestionIcon } from '@phosphor-icons/react';
import { useShallow } from 'zustand/shallow';

import { cn } from '@/lib/ui/utils';
import { Button } from '@/shared/components/ui/button';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import { useAuthStore } from '@/shared/stores/authStore';

import { UserDropdown } from './UserDropdown';

type AppHeaderProps = {
  className?: string;
};

export const AppHeader = ({ className }: AppHeaderProps) => {
  const { avatarKey, email, userName } = useAuthStore(
    useShallow((state) => ({
      avatarKey: state.avatarKey,
      email: state.email,
      userName: state.userName,
    })),
  );

  return (
    <header
      className={cn(
        'border-border/70 bg-surface-container-lowest sticky top-0 z-40 flex h-14 items-center justify-between border-b px-6',
        className,
      )}
    >
      <SidebarTrigger />

      <div className="flex items-center gap-5">
        <div className="text-on-surface-variant flex items-center">
          <Button
            aria-label="Notifications"
            className="text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface size-8 rounded-full"
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <BellIcon className="size-4" weight="bold" />
          </Button>
          <Button
            aria-label="Help"
            className="text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface size-8 rounded-full"
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <QuestionIcon className="size-4" weight="bold" />
          </Button>
        </div>
        <div className="bg-border/70 h-8 w-px" />

        <UserDropdown avatarKey={avatarKey} email={email} userName={userName} />
      </div>
    </header>
  );
};
