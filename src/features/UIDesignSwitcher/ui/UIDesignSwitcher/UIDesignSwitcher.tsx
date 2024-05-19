import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { getFeatureFlag, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const UIDesignSwitcher = memo(() => {
  const { t } = useTranslation();
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const items = [
    {
      content: t('Новый'),
      value: 'new',
    },
    {
      content: t('Старый'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlags({
          userId: authData.id,
          newFeatures: {
            isAppRedesigned: value === 'new',
          },
        }),
      ).unwrap;
      setIsLoading(false);
    }
  };

  return (
    <HStack gap="8">
      <Text text={t('Вариант интерфейса')} />
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          onChange={onChange}
          items={items}
          value={isAppRedesigned ? 'new' : 'old'}
        />
      )}
    </HStack>
  );
});
