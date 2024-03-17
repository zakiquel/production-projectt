import { ValidateProfileErrors } from '../consts/cardConsts';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';

import { profileActions, profileReducer } from './profileSlice';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

const data = {
  first: 'kirill',
  lastname: 'zavalishin',
  age: 21,
  currency: Currency.EUR,
  country: Country.Russia,
  city: 'Tomsk',
  username: 'zakiquel',
  avatar: 'https://avatar.com/avatar.jpg',
};
describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: true };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.setReadonly(false),
    )).toEqual({ readonly: false });
  });
  test('test cancelEdit', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
      form: { first: 'alex' },
      data,
      validateErrors: [ValidateProfileErrors.SERVER_ERROR],
    };
    expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit))
      .toEqual({
        readonly: true,
        form: data,
        data,
        validateErrors: undefined,
      });
  });
  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: 'alesha' } };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.updateProfile({ username: 'alesha_zxc' }),
    )).toEqual({
      form: { username: 'alesha_zxc' },
    });
  });
  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileErrors.SERVER_ERROR],
    };
    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.pending,
    )).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });
  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      validateErrors: [ValidateProfileErrors.SERVER_ERROR],
      data,
      form: { ...data, username: 'alesha_zxc' },
      readonly: false,
    };
    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.fulfilled(data, ''),
    )).toEqual({
      isLoading: false,
      validateErrors: undefined,
      data,
      form: data,
      readonly: true,
    });
  });
});
