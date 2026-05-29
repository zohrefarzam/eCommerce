'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/base/button';
import { useLocale } from '@/i18n';
import { sanitizeReturnUrl } from '@/lib/return-url';
import { useAuth } from '@/providers/auth-provider';
import { AuthField } from './auth-field';

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { messages } = useLocale();
  const labels = messages.auth;
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const returnUrl = sanitizeReturnUrl(searchParams.get('returnUrl'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof fieldErrors = {};
    if (!name.trim()) errors.name = labels.requiredField;
    if (!email.trim()) errors.email = labels.requiredField;
    if (!password) errors.password = labels.requiredField;
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const result = signUp({ name, email, password });
    if (!result.ok) {
      setFormError(labels.emailExists);
      return;
    }
    router.replace(returnUrl);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {labels.signUpTitle}
        </h1>
        <p className="mt-3 text-sm text-muted">{labels.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          label={labels.nameLabel}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setFieldErrors((prev) => ({ ...prev, name: undefined }));
            setFormError(null);
          }}
          error={fieldErrors.name}
        />
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
          autoComplete="new-password"
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
          {labels.signUpButton}
        </Button>
      </form>

      <p className="text-center text-sm text-muted">
        {labels.alreadyHaveAccount}{' '}
        <Link
          href={`/login${returnUrl !== '/' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
          className="font-medium text-foreground underline underline-offset-4"
          prefetch={false}
        >
          {labels.logIn}
        </Link>
      </p>
    </div>
  );
}
