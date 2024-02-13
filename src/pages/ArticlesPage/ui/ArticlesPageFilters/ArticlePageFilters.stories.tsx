import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticlePageFilters } from './ArticlePageFilters';

export default {
  title: 'pages/Article/ArticlePageFilters',
  component: ArticlePageFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlePageFilters>;

const Template: ComponentStory<typeof ArticlePageFilters> = (args) => <ArticlePageFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
