import { Profile } from '../..';
import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { toggleFeatures } from '@/shared/lib/features';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeLastname?: (value?: string) => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { isLoading, error, ...other } = props;

  if (isLoading) {
    return toggleFeatures({
      name: 'isAppRedesigned',
      on: () => <ProfileCardRedesignedSkeleton />,
      off: () => <ProfileCardDeprecatedLoader />,
    });
  }

  if (error) {
    return toggleFeatures({
      name: 'isAppRedesigned',
      on: () => <ProfileCardRedesignedError />,
      off: () => <ProfileCardDeprecatedError />,
    });
  }

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <ProfileCardRedesigned {...props} />,
    off: () => <ProfileCardDeprecated {...props} />,
  });
};
