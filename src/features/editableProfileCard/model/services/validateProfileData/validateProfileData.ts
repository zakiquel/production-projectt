import { ValidateProfileErrors } from '../../consts/cardConsts';

import { Country } from '@/entities/Country';
import { Profile } from '@/entities/Profile';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileErrors.SERVER_ERROR];
  }
  const {
    username,
    first,
    lastname,
    age,
    country,
    city,
  } = profile;
  const errors: ValidateProfileErrors[] = [];

  if (!first || !lastname || !username) {
    errors.push(ValidateProfileErrors.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileErrors.INCORRECT_AGE);
  }

  if (!country || Number.isInteger(country) || !(Object.values(Country).includes(country))) {
    errors.push(ValidateProfileErrors.INCORRECT_COUNTRY);
  }

  if (!city || Number.isInteger(city)) {
    errors.push(ValidateProfileErrors.INCORRECT_CITY);
  }

  return errors;
};
