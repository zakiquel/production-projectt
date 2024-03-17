import { getProfileForm } from './getProfileForm';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileForm.test', () => {
  test('should return form', () => {
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
        form: data,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test('should work with empty value', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
