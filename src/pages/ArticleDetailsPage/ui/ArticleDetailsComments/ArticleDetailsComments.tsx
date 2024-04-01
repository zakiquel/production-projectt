import { memo, useCallback, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice';

import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Loader } from '@/shared/ui/Loader/Loader';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
  const {
    className,
    id,
  } = props;

  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const { t } = useTranslation();

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  return (
    <VStack gap="16" max className={classNames('', {}, [className])}>
      <Text
        size={TextSize.L}
        title={t('Комментарии')}
      />
      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
      />
    </VStack>
  );
});
