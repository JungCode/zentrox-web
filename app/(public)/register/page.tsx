import type { Metadata } from 'next';
import Link from 'next/link';

import {
  AuthPageHeader,
  AuthProviderButtons,
  RegisterForm,
} from '@/features/auth/components';
import { ApolloWrapper } from '@/shared/components/ApolloWrapper';
import { Button } from '@/shared/components/ui/button';

export const metadata: Metadata = {
  description: 'Create your Zentrox command center account.',
  title: 'Register | Zentrox',
};

const RegisterPage = () => {
  return (
    <div className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 space-y-10 motion-safe:duration-200">
      <AuthPageHeader
        description="Stand up your operator profile and deploy automation nodes in minutes."
        title="Create Command Access"
      />
      <AuthProviderButtons
        githubMessage="GitHub sign-up is coming soon."
        googleMessage="Google sign-up is coming soon."
      />
      <ApolloWrapper>
        <RegisterForm />
      </ApolloWrapper>
      <div className="text-on-surface-variant text-center text-sm">
        Already have access?{' '}
        <Button
          asChild
          className="px-0 text-sm font-semibold tracking-normal normal-case"
          size="sm"
          variant="ghost"
        >
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
