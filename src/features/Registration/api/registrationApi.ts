import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

interface RegistrationApiProps {
  username: string;
  password: string;
}

export const registrationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createAccount: build.mutation<User, RegistrationApiProps>({
      query: ({ username, password }) => ({
        url: `/users`,
        method: 'POST',
        body: {
          username,
          password,
        },
      }),
    }),
  }),
});
