type AuthState = {
  avatarKey: string | undefined | null;
  email: string;
  id: string;
  userName: string;
};

type AuthActions = {
  setAuthInfo: (authInfo: Partial<AuthState>) => void;
};

export type AuthStore = AuthState & AuthActions;
