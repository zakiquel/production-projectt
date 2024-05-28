import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { registration } from '../../model/services/registration';

import { User, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './RegistrationForm.module.scss';

export interface RegistrationFormProps {
  className?: string;
  onSuccess: () => void;
}

const RegistrationForm = ({ className, onSuccess }: RegistrationFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const forceUpdate = useForceUpdate();

  const [identicalPass, setIdenticalPass] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLoginClick = useCallback(async () => {
    if (password !== passwordConfirm) {
      setIdenticalPass(false);
      return;
    }
    setIdenticalPass(true);
    setIsLoading(true);
    const result = await dispatch(registration({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      setIsLoading(false);
      onSuccess();
      dispatch(userActions.setAuthData(result.payload as User));
    }
    forceUpdate();
  }, [dispatch, forceUpdate, onSuccess, password, passwordConfirm, username]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onLoginClick();
      }
    },
    [onLoginClick],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  if (isLoading) {
    return (
      <VStack gap="8" className={cls.loader}>
        <Loader />
      </VStack>
    );
  }

  return (
    <VStack
      gap="8"
      className={classNames(cls.RegistrationForm, {}, [className])}
    >
      <Text title={t('Регистрация')} />
      {!identicalPass && (
        <Text text={t('Пароли не совпадают')} variant="error" />
      )}
      <Input
        autofocus
        type="text"
        value={username}
        className={cls.input}
        placeholder={t('Введите username')}
        onChange={setUsername}
      />
      <Input
        type="password"
        value={password}
        className={cls.input}
        placeholder={t('Введите пароль')}
        onChange={setPassword}
      />
      <Input
        type="password"
        value={passwordConfirm}
        className={cls.input}
        placeholder={t('Подтвердите пароль')}
        onChange={setPasswordConfirm}
      />
      <Button className={cls.loginBtn} onClick={onLoginClick}>
        {t('Зарегистрироваться')}
      </Button>
    </VStack>
  );
};

export default memo(RegistrationForm);
