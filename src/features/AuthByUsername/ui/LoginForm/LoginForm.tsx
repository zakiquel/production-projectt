import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { VStack } from '@/shared/ui/Stack';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
  const { className, onSuccess } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const forceUpdate = useForceUpdate();
  const isLoading = useSelector(getLoginIsLoading);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate();
    }
  }, [dispatch, username, password, onSuccess, forceUpdate]);

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

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      {toggleFeatures({
        name: 'isAppRedesigned',
        on: () => (
          <VStack
            gap="8"
            className={classNames(cls.LoginForm, {}, [className])}
          >
            <Text title={t('Войдите в аккаунт')} />
            {error && (
              <Text
                text={t('Вы ввели неверный логин или пароль')}
                variant="error"
              />
            )}
            <Input
              autofocus
              type="text"
              value={username}
              className={cls.input}
              placeholder={t('Введите username')}
              onChange={onChangeUsername}
            />
            <Input
              type="password"
              value={password}
              className={cls.input}
              placeholder={t('Введите пароль')}
              onChange={onChangePassword}
            />
            <Button
              className={cls.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('Войти')}
            </Button>
          </VStack>
        ),
        off: () => (
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t('Войдите в аккаунт')} />
            {error && (
              <TextDeprecated
                text={t('Вы ввели неверный логин или пароль')}
                theme={TextTheme.ERROR}
              />
            )}
            <InputDeprecated
              autofocus
              type="text"
              value={username}
              className={cls.input}
              placeholder={t('Введите username')}
              onChange={onChangeUsername}
            />
            <InputDeprecated
              type="text"
              value={password}
              className={cls.input}
              placeholder={t('Введите пароль')}
              onChange={onChangePassword}
            />
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              className={cls.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        ),
      })}
    </DynamicModuleLoader>
  );
});

export default LoginForm;
