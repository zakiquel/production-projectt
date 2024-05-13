import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  max?: boolean;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    max,
    theme = CardTheme.NORMAL,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.max]: max,
  };

  return (
    <div
      className={classNames(cls.Card, mods, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
