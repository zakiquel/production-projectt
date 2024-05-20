import { useTranslation } from 'react-i18next';

import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = (props: CommentListProps) => {
  const { className, comments, isLoading } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isLoading={isLoading}
            />
          ))
        : toggleFeatures({
            name: 'isAppRedesigned',
            on: () => <Text text={t('Не удалось загрузить комментарии')} />,
            off: () => (
              <TextDeprecated text={t('Не удалось загрузить комментарии')} />
            ),
          })}
    </VStack>
  );
};
