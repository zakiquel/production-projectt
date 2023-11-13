import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { CountrySelect } from 'entities/Country';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeUsername?: (value?:string) => void;
  onChangeFirstname?: (value?:string) => void;
  onChangeLastname?: (value?:string) => void;
  onChangeAge?: (value?:string) => void;
  onChangeCity?: (value?:string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { t } = useTranslation('profile');
  const {
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeUsername,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeCountry,
    onChangeCurrency,
  } = props;

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  const countryOptions = Object.entries(Country).map((val) => ({ value: val[0], content: val[1] }));

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        { data?.avatar
          && (
            <div className={cls.avatarWrapper}>
              <Avatar src={data?.avatar} />
            </div>
          )}
        <Input
          value={data?.username}
          placeholder={t('Ваш никнейм')}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
          onChange={onChangeFirstname}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
          onChange={onChangeLastname}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          placeholder={t('Ваш возраст')}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        <Input
          value={data?.city}
          placeholder={t('Ваш город')}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Ссылка на картинку')}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CountrySelect
          className={cls.input}
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
        <CurrencySelect
          className={cls.input}
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
