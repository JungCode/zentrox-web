'use client';

import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  RegisterDocument,
  type RegisterMutation,
  type RegisterMutationVariables,
} from '@/shared/api/auth/auth.schemas';

export const useRegister = () => {
  const router = useRouter();
  const [mutate, { data, error, loading }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, {
    onCompleted: () => {
      toast.success('Account created', {
        description: 'Sign in to access the command center.',
      });

      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message, {
        description: 'Please try again.',
      });
    },
  });

  const registerUser = async (input: RegisterMutationVariables['input']) => {
    try {
      const result = await mutate({
        variables: {
          input,
        },
      });

      return result.data?.register ?? null;
    } catch {
      return null;
    }
  };

  return {
    data,
    error,
    loading,
    registerUser,
  };
};
