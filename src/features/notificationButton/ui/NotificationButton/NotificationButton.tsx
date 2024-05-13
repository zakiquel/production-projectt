import React, { memo, useCallback, useState } from 'react';

import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups/ui/Popover/Popover';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />,
    off: () => (
      <ButtonDeprecated theme={ButtonTheme.CLEAR} onClick={onOpenDrawer}>
        <IconDeprecated Svg={NotificationIconDeprecated} inverted />
      </ButtonDeprecated>
    ),
  });
  const isDeviceMobile = useDevice();

  return (
    <div>
      {isDeviceMobile ? (
        <>
          {trigger}
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        </>
      ) : (
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => (
            <Popover
              className={classNames('', {}, [className])}
              direction="bottom left"
              trigger={trigger}
            >
              <NotificationList className={cls.notifications} />
            </Popover>
          ),
          off: () => (
            <PopoverDeprecated
              className={classNames('', {}, [className])}
              direction="bottom left"
              trigger={trigger}
            >
              <NotificationList className={cls.notifications} />
            </PopoverDeprecated>
          ),
        })
      )}
    </div>
  );
});
