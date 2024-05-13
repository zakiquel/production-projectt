import { memo } from 'react';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';

interface FilterContainerProps {
  className?: string;
}

export const FilterContainer = memo((props: FilterContainerProps) => {
  const { className } = props;
  const {
    onChangeSearch,
    onChangeType,
    type,
    search,
    onChangeSort,
    sort,
    order,
    onChangeOrder,
  } = useArticleFilters();

  return (
    <ArticlesFilters
      onChangeSort={onChangeSort}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
      type={type}
      search={search}
      sort={sort}
      order={order}
      className={className}
    />
  );
});
