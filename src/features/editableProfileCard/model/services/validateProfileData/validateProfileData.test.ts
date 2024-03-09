import { Country } from '@/entities/Country';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { ValidateProfileErrors } from '../../consts/cardConsts';
import { validateProfileData } from './validateProfileData';

const profileData: Profile = {
  username: 'kirillzav',
  first: 'kirill',
  lastname: 'zavalishin',
  age: 21,
  country: Country.Russia,
  city: 'Tomsk',
  currency: Currency.USD,
};
describe('validateProfileData.test', () => {
  test('success validate', async () => {
    expect(validateProfileData(profileData)).toEqual([]);
  });

  test('incorrect age', async () => {
    // @ts-ignore
    expect(validateProfileData({ ...profileData, age: 'abc' }))
      .toEqual([ValidateProfileErrors.INCORRECT_AGE]);
  });

  test('incorrect user data', async () => {
    // @ts-ignore
    expect(validateProfileData({ ...profileData, first: '', lastname: '' }))
      .toEqual([ValidateProfileErrors.INCORRECT_USER_DATA]);
  });

  test('incorrect country', async () => {
    // @ts-ignore
    expect(validateProfileData({ ...profileData, country: 'Austria' }))
      .toEqual([ValidateProfileErrors.INCORRECT_COUNTRY]);
  });

  test('incorrect city', async () => {
    // @ts-ignore
    expect(validateProfileData({ ...profileData, city: '' }))
      .toEqual([ValidateProfileErrors.INCORRECT_CITY]);
  });

  test('no data', async () => {
    // @ts-ignore
    expect(validateProfileData()).toEqual([ValidateProfileErrors.SERVER_ERROR]);
  });

  test('incorrect all', async () => {
    expect(validateProfileData({
      // @ts-ignore
      username: '', first: '', lastname: '', age: '123', country: 'Astana', city: '',
    })).toEqual([
      ValidateProfileErrors.INCORRECT_USER_DATA,
      ValidateProfileErrors.INCORRECT_AGE,
      ValidateProfileErrors.INCORRECT_COUNTRY,
      ValidateProfileErrors.INCORRECT_CITY,
    ]);
  });
});
