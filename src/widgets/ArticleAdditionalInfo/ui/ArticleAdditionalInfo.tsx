import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { User } from '@/entities/User';
// eslint-disable-next-line zavalition-fsd/layer-imports
import { getCanEditArticle } from '@/pages/ArticleDetailsPage';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleAdditionalInfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
  (props: ArticleAdditionalInfoProps) => {
    const { className, author, createdAt, views, onEdit } = props;
    const { t } = useTranslation();
    const canEdit = useSelector(getCanEditArticle);

    return (
      <VStack gap="32" className={className}>
        <HStack gap="8">
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Text text={createdAt} />
        </HStack>
        {canEdit ? (
          <Button onClick={onEdit}>{t('Редактировать')}</Button>
        ) : null}
        <Text text={t('{{count}} просмотров', { count: views })} />
      </VStack>
    );
  },
);
