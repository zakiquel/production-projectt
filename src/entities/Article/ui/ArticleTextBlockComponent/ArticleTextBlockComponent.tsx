import { memo } from 'react';

import { ArticleTextBlock } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title &&
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => <Text title={block.title} className={cls.title} />,
            off: () => (
              <TextDeprecated title={block.title} className={cls.title} />
            ),
          })}
        {block.paragraphs.map((paragraph) =>
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => (
              <Text
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            ),
            off: () => (
              <TextDeprecated
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            ),
          }),
        )}
      </div>
    );
  },
);
