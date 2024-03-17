import { getProfileReadonly } from './getProfileReadonly';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('getProfileReadonly.test', () => {
  test('should return readonly value', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true,
      },
    };
    expect(getProfileReadonly(state as StateSchema)).toEqual(true);
  });
  test('should return readonly value', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: false,
      },
    };
    expect(getProfileReadonly(state as StateSchema)).toEqual(false);
  });
  test('should work with empty value', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
  });
});
