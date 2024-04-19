import { UserRole } from '../const/userConsts';

import { FeatureFlags } from '@/shared/types/featureFlags';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
  features?: FeatureFlags;
}

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
