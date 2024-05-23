import { memo, TextareaHTMLAttributes } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './TextArea.module.scss';

export type TextAreaVariant = 'normal' | 'code';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  variant?: TextAreaVariant;
  max?: boolean;
}

export const TextArea = memo((props: TextAreaProps) => {
  const { className, placeholder, variant = 'normal', max } = props;

  return (
    <textarea
      className={classNames(cls.TextArea, { [cls.max]: max }, [
        className,
        cls[variant],
      ])}
      placeholder={placeholder}
    />
  );
});
