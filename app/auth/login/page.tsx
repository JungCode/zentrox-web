import type { Metadata } from 'next';

import { LoginForm } from '@/features/auth';
import { ApolloWrapper } from '@/shared/api/apollo/provider';
import { ComingSoonModal } from '@/shared/components/ComingSoonModal';
import { Button } from '@/shared/components/ui/button';

export const metadata: Metadata = {
  description: 'Access the Zentrox command center.',
  title: 'Login | Zentrox',
};

const LoginPage = () => {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <section className="bg-primary-container text-on-primary relative hidden w-7/12 flex-col justify-between overflow-hidden px-16 py-16 lg:flex">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, var(--outline-variant) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="bg-secondary/40 absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-[120px]" />
        <div className="mb-12 flex items-center gap-3">
          <div className="bg-secondary text-on-secondary flex h-9 w-9 items-center justify-center rounded">
            <span
              className="material-symbols-outlined text-sm text-white"
              data-icon="auto_settings"
            >
              auto_mode
            </span>
          </div>
          <span className="text-on-primary text-2xl font-semibold tracking-tight">
            Zentrox
          </span>
        </div>
        <div className="relative z-10">
          <div className="max-w-xl space-y-8">
            <h1 className="text-on-primary text-5xl leading-[1.1] font-bold tracking-tight">
              The logic layer for
              <br />
              <span className="text-secondary">autonomous enterprise.</span>
            </h1>
            <p className="text-on-primary-container text-lg">
              Zentrox orchestrates cross-functional workflows with high-density
              AI nodes. Precision automation is no longer a luxury—it is your
              competitive architecture.
            </p>
          </div>
        </div>
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex gap-8">
            <div>
              <p className="text-on-primary-container text-[10px] font-semibold tracking-[0.2em] uppercase">
                Architecture
              </p>
              <p className="text-on-primary font-mono text-xs">v4.0.2-stable</p>
            </div>
            <div>
              <p className="text-on-primary-container text-[10px] font-semibold tracking-[0.2em] uppercase">
                Latency
              </p>
              <p className="text-on-primary font-mono text-xs">14ms average</p>
            </div>
          </div>
          <div className="bg-primary/40 flex items-center gap-2 rounded px-3 py-2">
            <span className="bg-secondary h-2 w-2 rounded-full shadow-[0_0_10px_var(--accent-glow)]" />
            <span className="text-on-primary text-[10px] tracking-[0.28em] uppercase">
              All systems operational
            </span>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-lowest flex w-full flex-1 flex-col justify-center px-8 py-16 sm:px-16 lg:w-5/12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10 space-y-3">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="bg-primary text-on-primary flex h-8 w-8 items-center justify-center rounded">
                <span
                  className="material-symbols-outlined text-[14px] text-white"
                  data-icon="auto_settings"
                >
                  auto_mode
                </span>
              </div>
              <span className="text-primary text-lg font-semibold tracking-tight">
                Zentrox
              </span>
            </div>
            <h2 className="text-primary text-3xl font-semibold tracking-tight">
              Access Command Center
            </h2>
            <p className="text-on-surface-variant text-sm">
              Deploy and manage your automation workflows in minutes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ComingSoonModal
              message="Google sign-in is coming soon."
              triggerClassName="w-full justify-center gap-3 border border-outline-variant/60 bg-transparent px-4 py-2.5 text-xs font-semibold normal-case tracking-normal text-primary hover:bg-surface-container-low"
              triggerLabel="Google"
              triggerSize="default"
              triggerVariant="ghost"
            >
              <span className="flex items-center gap-3">
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M23.49 12.27c0-.84-.07-1.68-.22-2.5H12v4.73h6.47a5.54 5.54 0 0 1-2.4 3.64v3.01h3.89c2.28-2.1 3.53-5.2 3.53-8.88z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 24c3.24 0 5.96-1.07 7.95-2.85l-3.89-3.01c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.1-6.71-4.92H1.28v3.08A12 12 0 0 0 12 24z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.29 14.37a7.2 7.2 0 0 1-.37-2.37c0-.82.13-1.63.37-2.37V6.55H1.28A12 12 0 0 0 0 12c0 1.94.46 3.78 1.28 5.45l4.01-3.08z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.14 15.24 0 12 0 7.3 0 3.26 2.69 1.28 6.55l4.01 3.08C6.23 6.87 8.88 4.77 12 4.77z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </span>
            </ComingSoonModal>
            <ComingSoonModal
              message="GitHub sign-in is coming soon."
              triggerClassName="w-full justify-center gap-3 border border-outline-variant/60 bg-transparent px-4 py-2.5 text-xs font-semibold normal-case tracking-normal text-primary hover:bg-surface-container-low"
              triggerLabel="GitHub"
              triggerSize="default"
              triggerVariant="ghost"
            >
              <span className="flex items-center gap-3">
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M12 .5C5.65.5.5 5.7.5 12.16c0 5.1 3.3 9.42 7.87 10.95.58.11.8-.25.8-.56 0-.28-.01-1.02-.02-2-3.2.71-3.87-1.55-3.87-1.55-.53-1.37-1.3-1.73-1.3-1.73-1.06-.74.08-.72.08-.72 1.17.08 1.79 1.23 1.79 1.23 1.04 1.82 2.73 1.3 3.4 1 .1-.77.4-1.3.72-1.6-2.56-.3-5.25-1.3-5.25-5.75 0-1.27.45-2.31 1.18-3.13-.12-.3-.51-1.52.11-3.17 0 0 .97-.31 3.18 1.2a10.8 10.8 0 0 1 2.9-.4c.98 0 1.96.13 2.9.4 2.2-1.51 3.17-1.2 3.17-1.2.62 1.65.23 2.87.11 3.17.74.82 1.18 1.86 1.18 3.13 0 4.46-2.7 5.45-5.28 5.75.42.37.78 1.1.78 2.22 0 1.6-.02 2.9-.02 3.3 0 .31.21.68.81.56A11.7 11.7 0 0 0 23.5 12.16C23.5 5.7 18.35.5 12 .5z"
                    fill="currentColor"
                  />
                </svg>
                GitHub
              </span>
            </ComingSoonModal>
          </div>
          <div className="relative my-8 flex items-center">
            <span className="bg-outline-variant/60 h-px flex-1" />
            <span className="text-outline mx-4 text-[10px] font-semibold tracking-[0.28em] uppercase">
              Or credentials
            </span>
            <span className="bg-outline-variant/60 h-px flex-1" />
          </div>
          <ApolloWrapper>
            <LoginForm />
          </ApolloWrapper>
          <div className="text-on-surface-variant mt-10 text-center text-sm">
            New to the platform?{' '}
            <Button
              className="px-0 text-sm font-semibold tracking-normal normal-case"
              size="sm"
              variant="ghost"
            >
              Create an account
            </Button>
          </div>
        </div>
        <div className="border-surface-container text-on-surface-variant mt-12 border-t pt-6 text-[10px] tracking-[0.28em] uppercase lg:hidden">
          <div className="flex items-center justify-between">
            <span>System Status: Operational</span>
            <span className="text-outline">Privacy</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
