import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ArticlePageFilters } from './ArticlePageFilters';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'pages/ArticlesPage/ArticlePageFilters',
  component: ArticlePageFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlePageFilters>;

const Template: ComponentStory<typeof ArticlePageFilters> = (args) => <ArticlePageFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
