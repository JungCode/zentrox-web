import { create } from 'zustand';

import { AuthStore } from '@/shared/types';

export const useAuthStore = create<AuthStore>((set) => ({
  avatarKey: undefined,
  email: '',
  id: '',
  setAuthInfo: (authInfo) => set((state) => ({ ...state, ...authInfo })),
  userName: '',
}));
