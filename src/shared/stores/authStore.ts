import { create } from 'zustand';

type State = {
  avatarKey: string | undefined | null;
  email: string;
  id: string;
  userName: string;
};

type Actions = {
  setAuthInfo: (authInfo: Partial<State>) => void;
};

type Store = State & Actions;

export const useAuthStore = create<Store>((set) => ({
  avatarKey: undefined,
  email: '',
  id: '',
  setAuthInfo: (authInfo) => set((state) => ({ ...state, ...authInfo })),
  userName: '',
}));
