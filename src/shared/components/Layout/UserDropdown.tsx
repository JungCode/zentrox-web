'use client';

import { useMutation } from '@apollo/client/react';

import { LogoutDocument } from '@/shared/api/auth/auth.schemas';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { clearAuthTokens } from '@/shared/utils/storage';

import { ThemeToggle } from '../Theme';
import { Spinner } from '../ui/spinner';

const FALLBACK_AVATAR_SRC = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#e7e8e9"/><circle cx="32" cy="24" r="12" fill="#1a1f36"/><path d="M14 52c4-10 12-16 18-16s14 6 18 16" fill="#1a1f36"/></svg>',
)}`;

type UserDropdownProps = {
  avatarKey?: string | null;
  email: string;
  userName: string;
};

export const UserDropdown = ({
  avatarKey,
  email,
  userName,
}: UserDropdownProps) => {
  const [logout, { loading }] = useMutation(LogoutDocument, {
    onCompleted: () => {
      clearAuthTokens();
      window.location.href = '/login';
    },
  });

  const onLogout = (event: Event) => {
    event.preventDefault();
    logout();
  };
  return (
    <DropdownMenu>
      <span className="hidden min-w-0 text-right sm:block">
        <p className="text-primary truncate text-[10px] leading-tight font-bold tracking-tight uppercase">
          {userName}
        </p>
        <p className="text-secondary truncate text-[9px] leading-tight font-medium tracking-tighter uppercase">
          {email}
        </p>
      </span>

      <DropdownMenuTrigger asChild>
        <Button
          className="hover:bg-surface-container-low h-fit w-fit gap-3 rounded-full p-0"
          size="default"
          type="button"
          variant="ghost"
        >
          <Avatar size="default">
            <AvatarImage alt={userName} src={avatarKey ?? undefined} />
            <AvatarFallback className="overflow-hidden p-0">
              <img
                alt=""
                className="h-full w-full object-cover"
                src={FALLBACK_AVATAR_SRC}
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar size="default">
            <AvatarImage alt={userName} src={avatarKey ?? undefined} />
            <AvatarFallback className="overflow-hidden p-0">
              <img
                alt=""
                className="h-full w-full object-cover"
                src={FALLBACK_AVATAR_SRC}
              />
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="text-primary truncate text-sm font-semibold tracking-tight">
              {userName}
            </p>
            <p className="text-secondary truncate text-xs font-medium tracking-tight">
              {email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="px-2 py-2">
          <p className="text-on-surface-variant mb-2 text-[10px] font-bold tracking-[0.2em] uppercase">
            Theme
          </p>
          <div className="flex">
            <ThemeToggle />
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-danger focus:text-danger cursor-pointer"
          disabled={loading}
          onSelect={onLogout}
          variant="destructive"
        >
          {loading && <Spinner />}
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
