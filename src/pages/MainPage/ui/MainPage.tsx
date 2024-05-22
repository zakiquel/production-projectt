import { useTranslation } from 'react-i18next';

import { ArticleView } from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Page data-testid="MainPage">
      <VStack gap="24">
        <ArticleRecommendationsList
          label="Последние публикации"
          view={ArticleView.LIST}
        />
      </VStack>
    </Page>
  );
};

export default MainPage;
