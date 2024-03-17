import { getLoginUsername } from './getLoginUsername';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('getLoginUsername.test', () => {
  test('should return username', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'username123',
      },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('username123');
  });
  test('should return username', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});
