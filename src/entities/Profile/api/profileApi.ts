import { Profile } from '..';

import { rtkApi } from '@/shared/api/rtkApi';

const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProfiles: build.query<Profile[], string>({
      query: () => ({
        url: `/profile`,
        method: 'GET',
      }),
    }),
    createProfile: build.mutation<Profile, Profile>({
      query: (profile) => ({
        url: `/profile`,
        method: 'POST',
        body: profile,
      }),
    }),
  }),
});
export const getAllProfiles = profileApi.endpoints.getAllProfiles.initiate;
export const createProfile = profileApi.endpoints.createProfile.initiate;
