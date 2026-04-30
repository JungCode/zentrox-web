import { ComingSoonModal } from '@/shared/components';

type AuthProviderButtonsProps = {
  githubMessage: string;
  googleMessage: string;
};

export const AuthProviderButtons = ({
  githubMessage,
  googleMessage,
}: AuthProviderButtonsProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <ComingSoonModal
          message={googleMessage}
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
          message={githubMessage}
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
    </div>
  );
};
