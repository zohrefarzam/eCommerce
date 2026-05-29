'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/base/button';
import { useLocale } from '@/i18n';
import { sanitizeReturnUrl } from '@/lib/return-url';
import { useAuth } from '@/providers/auth-provider';
import { AuthField } from './auth-field';

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { messages } = useLocale();
  const labels = messages.auth;
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const returnUrl = sanitizeReturnUrl(searchParams.get('returnUrl'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof fieldErrors = {};
    if (!email.trim()) errors.email = labels.requiredField;
    if (!password) errors.password = labels.requiredField;
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const result = signIn(email, password);
    if (!result.ok) {
      setFormError(labels.invalidCredentials);
      return;
    }
    router.replace(returnUrl);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {labels.signInTitle}
        </h1>
        <p className="mt-3 text-sm text-muted">{labels.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          label={labels.emailLabel}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors((prev) => ({ ...prev, email: undefined }));
            setFormError(null);
          }}
          error={fieldErrors.email}
        />
        <AuthField
          label={labels.passwordLabel}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors((prev) => ({ ...prev, password: undefined }));
            setFormError(null);
          }}
          error={fieldErrors.password}
        />

        {formError ? (
          <p className="text-sm text-red-600" role="alert">
            {formError}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          className="mt-1 h-12 rounded-xl !bg-foreground !text-background font-semibold hover:!bg-foreground/90"
        >
          {labels.signInButton}
        </Button>
      </form>

      <p className="text-center text-sm text-muted">
        {labels.noAccount}{' '}
        <Link
          href={`/sign-up${returnUrl !== '/' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
          className="font-medium text-foreground underline underline-offset-4"
          prefetch={false}
        >
          {labels.signUp}
        </Link>
      </p>
    </div>
  );
}
