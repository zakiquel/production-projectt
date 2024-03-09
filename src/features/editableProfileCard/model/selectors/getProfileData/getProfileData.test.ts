import { StateSchema } from '@/app/providers/StoreProvider';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
  test('should return data', () => {
    const data = {
      username: 'admin',
      first: 'kirill',
      lastname: 'zavalition',
      age: 21,
      city: 'Tomsk',
      currency: Currency.EUR,
      country: Country.Russia,
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: {
          username: 'admin',
          first: 'kirill',
          lastname: 'zavalition',
          age: 21,
          city: 'Tomsk',
          currency: Currency.EUR,
          country: Country.Russia,
        },
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('should work with empty value', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
