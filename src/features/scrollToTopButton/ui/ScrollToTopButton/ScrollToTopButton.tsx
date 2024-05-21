import { memo } from 'react';

import CircleIcon from '@/shared/assets/icons/circle-up.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

export const ScrollToTopButton = memo(() => {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    /* eslint-disable react/jsx-max-props-per-line */
    <Icon Svg={CircleIcon} clickable onClick={onClick} width={32} height={32} />
  );
});
