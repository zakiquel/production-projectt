import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ArticleDetailsHeader } from './ArticleDetailsHeader';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsHeader',
  component: ArticleDetailsHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsHeader>;

const Template: ComponentStory<typeof ArticleDetailsHeader> = (args) => (
  <ArticleDetailsHeader {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
