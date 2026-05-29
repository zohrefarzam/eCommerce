'use client';

import { useEffect, useState } from 'react';
import { AuthField } from '@/app/auth/_components/auth-field';
import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import { useLocale } from '@/i18n';
import { useAuth } from '@/providers/auth-provider';

type EditProfileModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditProfileModal({
  isOpen,
  onOpenChange,
}: EditProfileModalProps) {
  const { messages } = useLocale();
  const { user, updateProfile } = useAuth();
  const accountLabels = messages.account;
  const authLabels = messages.auth;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  useEffect(() => {
    if (!isOpen || !user) return;
    setName(user.name);
    setEmail(user.email);
    setFormError(null);
    setFieldErrors({});
  }, [isOpen, user]);

  const handleSubmit = () => {
    const errors: typeof fieldErrors = {};
    if (!name.trim()) errors.name = authLabels.requiredField;
    if (!email.trim()) errors.email = authLabels.requiredField;
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const result = updateProfile({ name, email });
    if (!result.ok) {
      setFormError(
        result.error === 'exists'
          ? authLabels.emailExists
          : authLabels.requiredField,
      );
      return;
    }
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={accountLabels.editProfileTitle}
      placement="center"
      className="sm:!max-w-md"
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <AuthField
          label={authLabels.nameLabel}
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
          label={authLabels.emailLabel}
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

        {formError ? (
          <p className="text-sm text-red-600" role="alert">
            {formError}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl sm:min-w-28"
            onPress={() => onOpenChange(false)}
          >
            {accountLabels.cancel}
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="h-11 rounded-xl !bg-foreground !text-background font-semibold hover:!bg-foreground/90 sm:min-w-28"
          >
            {accountLabels.saveProfile}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
