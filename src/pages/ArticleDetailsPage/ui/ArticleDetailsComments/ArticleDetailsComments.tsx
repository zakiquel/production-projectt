import { memo, useCallback, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice';

import { CommentList } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { AddCommentForm } from '@/features/addCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo(
  (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;

    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text));
      },
      [dispatch],
    );

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
    });

    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        {toggleFeatures({
          name: 'isAppRedesigned',
          on: () => <Text size="l" title={t('Комментарии')} />,
          off: () => (
            <TextDeprecated size={TextSize.L} title={t('Комментарии')} />
          ),
        })}
        {userData ? (
          <Suspense fallback={<Loader />}>
            <AddCommentForm onSendComment={onSendComment} />
          </Suspense>
        ) : (
          <Text
            text={t('Авторизуйтесь, чтобы отправлять комментарии')}
            align="center"
          />
        )}
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </VStack>
    );
  },
);
