import { memo } from 'react';

import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContainerProps {
  className?: string;
  id: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
  const { className, id } = props;

  return (
    <Card max className={className} padding="24" border="round">
      <ArticleDetails id={id} />
    </Card>
  );
});
