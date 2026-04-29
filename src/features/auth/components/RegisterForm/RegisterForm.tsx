'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { registerSchema } from '@/features/auth/constants';
import { useRegister } from '@/features/auth/hooks';
import type { RegisterInput } from '@/shared/api/auth/schemas';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

type RegisterFormValues = RegisterInput & { confirmPassword: string };

export const RegisterForm = () => {
  const { loading, registerUser } = useRegister();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
      userName: '',
    },
    resolver: zodResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (values: RegisterFormValues) => {
    const { confirmPassword, ...input } = values;
    await registerUser(input);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label className="mb-2 block" htmlFor="userName">
          User name
        </Label>
        <Input
          aria-invalid={Boolean(errors.userName)}
          autoComplete="username"
          id="userName"
          placeholder="operator.zen"
          {...register('userName')}
        />
        {errors.userName && (
          <p className="text-danger mt-2 text-xs">{errors.userName.message}</p>
        )}
      </div>
      <div>
        <Label className="mb-2 block" htmlFor="email">
          Email address
        </Label>
        <Input
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          id="email"
          placeholder="name@company.com"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-danger mt-2 text-xs">{errors.email.message}</p>
        )}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>
        <div className="relative">
          <Input
            aria-invalid={Boolean(errors.password)}
            autoComplete="new-password"
            id="password"
            placeholder="********"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          />
          <button
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="text-outline hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition"
            onClick={() => setShowPassword((value) => !value)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
        {errors.password && (
          <p className="text-danger mt-2 text-xs">{errors.password.message}</p>
        )}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label htmlFor="confirmPassword">Re-enter password</Label>
        </div>
        <div className="relative">
          <Input
            aria-invalid={Boolean(errors.confirmPassword)}
            autoComplete="new-password"
            id="confirmPassword"
            placeholder="********"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
          />
          <button
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            className="text-outline hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition"
            onClick={() => setShowConfirmPassword((value) => !value)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-danger mt-2 text-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button
        className="w-full"
        disabled={loading || isSubmitting}
        type="submit"
      >
        {loading || isSubmitting ? 'Creating account...' : 'Create account'}
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M10 17l5-5-5-5" />
        </svg>
      </Button>
    </form>
  );
};
