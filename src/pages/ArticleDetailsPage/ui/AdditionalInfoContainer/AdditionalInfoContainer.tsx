import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router';
import { VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

import cls from './AdditionalInfoContainer.module.scss';

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article?.id));
    }
  }, [article, navigate]);

  if (!article) {
    return (
      <Card padding="16" border="round">
        <VStack gap="24">
          <Skeleton width={220} height={45} className={cls.info} />
          <Skeleton width={120} height={45} className={cls.info} />
          <Skeleton width={120} height={45} className={cls.info} />
        </VStack>
      </Card>
    );
  }

  return (
    <Card className={cls.card} padding="24" border="round">
      <ArticleAdditionalInfo
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
        onEdit={onEditArticle}
      />
    </Card>
  );
});
