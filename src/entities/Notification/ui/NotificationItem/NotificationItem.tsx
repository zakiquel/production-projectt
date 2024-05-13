import { memo } from 'react';

import { Notification } from '../../model/types/notification';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import {
  Card as CardDeprecated,
  CardTheme,
} from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;

  const content = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <Card className={classNames(cls.NotificationItem, {}, [className])}>
        <Text title={item.title} text={item.description} />
      </Card>
    ),
    off: () => (
      <CardDeprecated
        className={classNames(cls.NotificationItem, {}, [className])}
        theme={CardTheme.OUTLINED}
      >
        <TextDeprecated title={item.title} text={item.description} />
      </CardDeprecated>
    ),
  });

  if (item.href) {
    return (
      <a className={cls.link} target="_blank" href={item.href} rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
});
