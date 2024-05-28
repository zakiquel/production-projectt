import React, { memo, TextareaHTMLAttributes, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './TextArea.module.scss';

export type TextAreaVariant = 'normal' | 'code';

type HTMLTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
>;

interface TextAreaProps extends HTMLTextAreaProps {
  className?: string;
  variant?: TextAreaVariant;
  max?: boolean;
  onChange?: (value: string) => void;
}

export const TextArea = memo((props: TextAreaProps) => {
  const { className, placeholder, variant = 'normal', max, onChange } = props;

  const [localValue, setLocalValue] = useState<string | number>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <textarea
      className={classNames(cls.TextArea, { [cls.max]: max }, [
        className,
        cls[variant],
      ])}
      value={localValue}
      onChange={onChangeHandler}
      placeholder={placeholder}
    />
  );
});
