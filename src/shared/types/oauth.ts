export type OAuthProvider = 'google'; // 'github' | 'slack' ...

export type OAuthStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseOAuthConnectOptions {
  onError?: (reason: string) => void;
  onSuccess?: () => void;
  provider: OAuthProvider;
}

export interface UseOAuthConnectReturn {
  connect: () => Promise<void>;
  reset: () => void;
  status: OAuthStatus;
}
