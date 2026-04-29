'use client';

import { useMutation } from '@apollo/client/react';

import {
  LoginDocument,
  type LoginMutation,
  type LoginMutationVariables,
} from '@/shared/api/auth/auth.schemas';
import { setAuthTokens } from '@/shared/lib/storage';

export const useLogin = () => {
  const [mutate, { data, error, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LoginDocument);

  const login = async (email: string, password: string, remember: boolean) => {
    const result = await mutate({
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    const tokens = result.data?.login;

    if (tokens) {
      setAuthTokens(tokens.accessToken, tokens.refreshToken, { remember });
    }

    return tokens ?? null;
  };

  return {
    data,
    error,
    loading,
    login,
  };
};
