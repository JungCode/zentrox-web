'use client';

import { useMutation } from '@apollo/client/react';
import { useRef } from 'react';
import { toast } from 'sonner';

import {
  LoginDocument,
  type LoginMutation,
  type LoginMutationVariables,
} from '@/shared/api/auth/auth.schemas';
import { setAuthTokens } from '@/shared/lib/storage';

export const useLogin = () => {
  const rememberRef = useRef(false);

  const [mutate, { data, error, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LoginDocument, {
    onCompleted: (data) => {
      const tokens = data.login;

      if (!tokens) return;

      setAuthTokens(tokens.accessToken, tokens.refreshToken, {
        remember: rememberRef.current,
      });
      toast.success('Signed in', {
        description: 'Welcome back to Zentrox.',
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        description: 'Please try again.',
      });
    },
  });

  const login = async (email: string, password: string, remember: boolean) => {
    rememberRef.current = remember;
    try {
      const result = await mutate({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const tokens = result.data?.login;

      return tokens ?? null;
    } catch {
      return null;
    }
  };

  return {
    data,
    error,
    loading,
    login,
  };
};
