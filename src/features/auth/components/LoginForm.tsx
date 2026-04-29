'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLogin } from '@/features/auth/hooks/useLogin';
import { loginSchema } from '@/features/constants/authValidation';
import type { LoginInput } from '@/shared/api/auth/schemas';
import { ComingSoonModal } from '@/shared/components/ComingSoonModal';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

type LoginFormValues = LoginInput;

export const LoginForm = () => {
  const { loading, login } = useLogin();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const onSubmit = async (values: LoginFormValues) => {
    await login(values.email, values.password, remember);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label className="mb-2 block" htmlFor="email">
          Email Address
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
          <ComingSoonModal
            message="Password recovery is on the roadmap."
            triggerClassName="text-[10px] font-semibold normal-case tracking-normal"
            triggerLabel="Forgot password?"
            triggerSize="sm"
            triggerVariant="ghost"
          >
            Forgot password?
          </ComingSoonModal>
        </div>
        <div className="relative">
          <Input
            aria-invalid={Boolean(errors.password)}
            autoComplete="current-password"
            id="password"
            placeholder="••••••••"
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
      <div className="flex items-center gap-2">
        <Checkbox
          checked={remember}
          id="remember"
          onCheckedChange={(checked) => setRemember(checked === true)}
        />
        <Label
          className="text-on-surface-variant text-xs font-normal tracking-normal normal-case"
          htmlFor="remember"
        >
          Remember this session for 30 days
        </Label>
      </div>
      <Button
        className="w-full"
        disabled={loading || isSubmitting}
        type="submit"
      >
        {loading || isSubmitting ? 'Authenticating...' : 'Authenticate Session'}
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
