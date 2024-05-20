import { Comment } from '../../model/types/comment';

import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = (props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack
        data-testid="CommentCard.Loading"
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
      >
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

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <Card padding="24" border="round" max>
        <VStack
          data-testid="CommentCard.Content"
          gap="8"
          max
          className={classNames(cls.CommentCardRedesigned, {}, [className])}
        >
          <AppLink to={getRouteProfile(comment.user.id)}>
            <HStack gap="8">
              {comment.user.avatar ? (
                <Avatar size={30} src={comment.user.avatar} />
              ) : null}
              <Text title={comment.user.username} bold />
            </HStack>
          </AppLink>
          <Text text={comment.text} />
        </VStack>
      </Card>
    ),
    off: () => (
      <VStack
        data-testid="CommentCard.Content"
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [className])}
      >
        <AppLinkDeprecated
          to={getRouteProfile(comment.user.id)}
          className={cls.header}
        >
          {comment.user.avatar ? (
            <AvatarDeprecated size={30} src={comment.user.avatar} />
          ) : null}
          <Text className={cls.username} title={comment.user.username} />
        </AppLinkDeprecated>
        <TextDeprecated className={cls.text} text={comment.text} />
      </VStack>
    ),
  });
};
