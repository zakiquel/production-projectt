import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { UIDesignSwitcher } from '@/features/UIDesignSwitcher';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

const SettingsPage = memo(() => {
  const { t } = useTranslation();
  return (
    <Page>
      <VStack gap="16">
        <Text title={t('Настройки пользователя')} />
        <UIDesignSwitcher />
      </VStack>
    </Page>
  );
});

export default SettingsPage;
