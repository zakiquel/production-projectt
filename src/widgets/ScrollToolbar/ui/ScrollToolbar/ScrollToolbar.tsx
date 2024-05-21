import { memo } from 'react';

import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { VStack } from '@/shared/ui/Stack';

import cls from './ScrollToolbar.module.scss';

export const ScrollToolbar = memo(() => (
  <VStack justify="center" max align="center" className={cls.ScrollToolbar}>
    <ScrollToTopButton />
  </VStack>
));
