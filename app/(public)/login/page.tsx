import type { Metadata } from 'next';
import Link from 'next/link';

import {
  AuthPageHeader,
  AuthProviderButtons,
  LoginForm,
} from '@/features/auth/components';
import { ApolloWrapper } from '@/shared/components/ApolloWrapper';
import { Button } from '@/shared/components/ui/button';

export const metadata: Metadata = {
  description: 'Access the Zentrox command center.',
  title: 'Login | Zentrox',
};

const LoginPage = () => {
  return (
    <div className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 space-y-10 motion-safe:duration-200">
      <AuthPageHeader
        description="Deploy and manage your automation workflows in minutes."
        title="Access Command Center"
      />
      <AuthProviderButtons
        githubMessage="GitHub sign-in is coming soon."
        googleMessage="Google sign-in is coming soon."
      />
      <ApolloWrapper>
        <LoginForm />
      </ApolloWrapper>
      <div className="text-on-surface-variant text-center text-sm">
        New to the platform?{' '}
        <Button
          asChild
          className="px-0 text-sm font-semibold tracking-normal normal-case"
          size="sm"
          variant="ghost"
        >
          <Link href="/register">Create an account</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
