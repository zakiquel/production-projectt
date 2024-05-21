import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/Stack';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Text } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button/Button';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.NavbarRedesigned,
    off: () => cls.Navbar,
  });

  if (authData) {
    return toggleFeatures({
      name: 'isAppRedesigned',
      on: () => (
        <header className={classNames(mainClass, {}, [className])}>
          <HStack gap="16" className={cls.actions}>
            <NotificationButton />
            <AvatarDropdown />
          </HStack>
        </header>
      ),
      off: () => (
        <header className={classNames(mainClass, {}, [className])}>
          <Text className={cls.appName} title={t('My production App')} />
          <AppLink
            to={getRouteArticleCreate()}
            theme={AppLinkTheme.SECONDARY}
            className={cls.createBtn}
          >
            {t('Добавить статью')}
          </AppLink>
          <HStack gap="16" className={cls.actions}>
            <NotificationButton />
            <AvatarDropdown />
          </HStack>
        </header>
      ),
    });
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      {toggleFeatures({
        name: 'isAppRedesigned',
        on: () => (
          <Button className={cls.links} variant="clear" onClick={onShowModal}>
            {t('Войти')}
          </Button>
        ),
        off: () => (
          <ButtonDeprecated
            className={cls.links}
            theme={ButtonTheme.CLEAR_INVERTED}
            onClick={onShowModal}
          >
            {t('Войти')}
          </ButtonDeprecated>
        ),
      })}
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
