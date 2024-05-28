import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { RegistrationModal } from '@/features/Registration';
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
  const [isRegistrationModal, setIsRegistrationModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseLoginModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowLoginModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onCloseRegistrationModal = useCallback(() => {
    setIsRegistrationModal(false);
  }, []);

  const onShowRegistrationModal = useCallback(() => {
    setIsRegistrationModal(true);
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
          <HStack gap="16">
            <Button
              className={cls.links}
              variant="clear"
              onClick={onShowRegistrationModal}
            >
              {t('Регистрация')}
            </Button>
            <Button
              className={cls.links}
              variant="clear"
              onClick={onShowLoginModal}
            >
              {t('Войти')}
            </Button>
          </HStack>
        ),
        off: () => (
          <ButtonDeprecated
            className={cls.links}
            theme={ButtonTheme.CLEAR_INVERTED}
            onClick={onShowLoginModal}
          >
            {t('Войти')}
          </ButtonDeprecated>
        ),
      })}
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseLoginModal} />
      )}
      {isRegistrationModal && (
        <RegistrationModal
          isOpen={isRegistrationModal}
          onClose={onCloseRegistrationModal}
        />
      )}
    </header>
  );
});
