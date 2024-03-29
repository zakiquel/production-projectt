import { getLoginPassword } from './getLoginPassword';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('getLoginPassword.test', () => {
  test('should return password', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: 'user_password',
      },
    };
    expect(getLoginPassword(state as StateSchema)).toEqual('user_password');
  });
  test('should return empty string with empty value', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
});
