'use client';

import {
  InputGroup,
  type InputGroupInputProps,
  type InputGroupProps,
} from '@heroui/react';
import { forwardRef } from 'react';

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export type BaseInputProps = InputGroupInputProps & {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  groupProps?: Omit<InputGroupProps, 'children'>;
};

export const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, startContent, endContent, groupProps, ...props }, ref) => {
    const defaultInputClassName =
      'w-full border-0 bg-transparent py-2.5 pe-3 ps-3 text-sm text-foreground shadow-none outline-none ring-0 transition placeholder:text-muted focus:ring-0';
    const defaultGroupClassName =
      'w-full rounded-lg border border-transparent bg-surface-secondary shadow-none outline-none transition focus-within:ring-2 focus-within:ring-foreground/15';
    const defaultAffixClassName =
      'border-0 bg-transparent px-3 text-muted [&_svg]:shrink-0';

    const mergedClassName =
      typeof className === 'function'
        ? (values: Parameters<typeof className>[0]) =>
            cx(defaultInputClassName, className(values))
        : cx(defaultInputClassName, className);

    const groupClassProp = groupProps?.className;
    const groupClassName =
      typeof groupClassProp === 'function'
        ? (values: Parameters<typeof groupClassProp>[0]) =>
            cx(defaultGroupClassName, groupClassProp(values))
        : cx(defaultGroupClassName, groupClassProp);

    return (
      <InputGroup {...groupProps} className={groupClassName}>
        {startContent ? (
          <InputGroup.Prefix className={defaultAffixClassName}>
            {startContent}
          </InputGroup.Prefix>
        ) : null}
        <InputGroup.Input ref={ref} {...props} className={mergedClassName} />
        {endContent ? (
          <InputGroup.Suffix className={defaultAffixClassName}>
            {endContent}
          </InputGroup.Suffix>
        ) : null}
      </InputGroup>
    );
  },
);

Input.displayName = 'Input';
