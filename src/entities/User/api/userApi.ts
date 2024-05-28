import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

import { rtkApi } from '@/shared/api/rtkApi';

interface SetJsonSettings {
  userId: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, SetJsonSettings>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          jsonSettings,
        },
      }),
    }),
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
    getAllUsers: build.query<User[], string>({
      query: () => ({
        url: `/users`,
        method: 'GET',
        headers: { Authorization: 'true' },
      }),
    }),
    createUser: build.query<User, User>({
      query: (user) => ({
        url: `/users`,
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
export const getAllUsers = userApi.endpoints.getAllUsers.initiate;
export const createUser = userApi.endpoints.createUser.initiate;
