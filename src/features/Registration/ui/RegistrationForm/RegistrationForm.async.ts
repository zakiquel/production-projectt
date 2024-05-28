import { FC, lazy } from 'react';

import { RegistrationFormProps } from './RegistrationForm';

export const RegistrationFormAsync = lazy<FC<RegistrationFormProps>>(
  () => import('./RegistrationForm'),
);
