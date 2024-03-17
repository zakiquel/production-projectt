import { Comment } from '../../model/types/comment';

import { RoutePath } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = (props: CommentCardProps) => {
  const {
    className,
    comment,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <VStack gap="8" max className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} className={cls.username} />
        </div>
        <Skeleton className={cls.text} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack gap="8" max className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
        {comment.user.avatar
          ? <Avatar size={30} src={comment.user.avatar} />
          : null}
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </VStack>
  );
};
