import { useTranslation } from 'react-i18next';

import { Counter } from '@/entities/Counter';
import { toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/Card';
import { Page } from '@/widgets/Page';

const MainPage = () => {
  const { t } = useTranslation();

  const counter = toggleFeatures({
    name: 'isCounterEnabled',
    on: () => <Counter />,
    off: () => <Card>{t('FeatureFlags Enabled')}</Card>,
  });

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      {counter}
    </Page>
  );
};

export default MainPage;
