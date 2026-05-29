'use client';

import { Input } from '@/components/base/input';

type AuthFieldProps = {
  label: string;
  error?: string;
} & React.ComponentProps<typeof Input>;

export function AuthField({ label, error, id, ...props }: AuthFieldProps) {
  const fieldId = id ?? label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-sm text-foreground">
        {label}
      </label>
      <Input
        id={fieldId}
        placeholder={label}
        aria-label={label}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
