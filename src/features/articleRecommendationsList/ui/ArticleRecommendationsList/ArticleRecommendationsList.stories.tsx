import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const article: Article = {
  id: '1',
  img: 'https://clck.ru/36nvwp',
  createdAt: '03.03.2024',
  views: 1024,
  user: { id: '1', username: 'username' },
  blocks: [],
  type: [],
  title: 'Article title',
  subtitle: 'Article subtitle',
};

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    mockData: [
      {
        url: `${__API__}/articles?_limit=3`,
        method: 'GET',
        status: 200,
        response: [
          { ...article, id: '1' },
          { ...article, id: '2' },
          { ...article, id: '3' },
        ],
      },
    ],
  },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
