import { UserRole } from '../const/userConsts';

import { JsonSettings } from './jsonSettings';

import { FeatureFlags } from '@/shared/types/featureFlags';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
