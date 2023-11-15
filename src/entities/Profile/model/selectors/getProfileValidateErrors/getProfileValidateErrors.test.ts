import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileErrors } from 'entities/Profile';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
  test('should return errors value', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileErrors.SERVER_ERROR,
          ValidateProfileErrors.INCORRECT_AGE,
        ],
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileErrors.SERVER_ERROR,
      ValidateProfileErrors.INCORRECT_AGE,
    ]);
  });
  test('should return errors value', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [],
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([]);
  });
  test('should work with empty value', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
