import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { getUsername } from '../../model/selectors/getUsername/getUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';
import { getPassword } from '../../model/selectors/getPassword/getPassword';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const password = useSelector(getPassword);
  const { error, isLoading } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  const { className } = props;
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('Войдите в аккаунт')} />
      {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
      <Input
        autofocus
        type="text"
        value={username}
        className={cls.input}
        placeholder={t('Введите username')}
        onChange={onChangeUsername}
      />
      <Input
        type="text"
        value={password}
        className={cls.input}
        placeholder={t('Введите пароль')}
        onChange={onChangePassword}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        className={cls.loginBtn}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
    </div>
  );
});
