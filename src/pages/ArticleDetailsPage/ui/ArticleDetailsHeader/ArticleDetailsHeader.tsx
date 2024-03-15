import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import { getCanEditArticle } from '../../model/selectors/article';

import { RoutePath } from '@/shared/const/router';

interface ArticleDetailsHeaderProps {
  className?: string;
}

export const ArticleDetailsHeader = memo((props: ArticleDetailsHeaderProps) => {
  const { className } = props;
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetailsData);
  const { t } = useTranslation();

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <HStack justify="between" max className={classNames('', {}, [className])}>
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onBackToList}
      >
        {t('Назад к списку статей')}
      </Button>
      { canEdit
        && (
          <Button
            theme={ButtonTheme.OUTLINE}
            onClick={onEditArticle}
          >
            {t('Редактировать')}
          </Button>
        )}
    </HStack>
  );
});
