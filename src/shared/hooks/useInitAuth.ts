import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';

import { MeDocument } from '../api/auth/auth.schemas';
import { useAuthStore } from '../stores/authStore';

export const useInitAuth = () => {
  const setAuthInfo = useAuthStore((state) => state.setAuthInfo);
  const { data } = useQuery(MeDocument);

  useEffect(() => {
    if (data?.me) {
      setAuthInfo({
        avatarKey: data.me.avatarKey,
        email: data.me.email,
        id: data.me.id,
        userName: data.me.userName,
      });
    }
  }, [data]);
};
