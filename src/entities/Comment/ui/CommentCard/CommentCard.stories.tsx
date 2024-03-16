import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CommentCard } from './CommentCard';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    id: '1',
    user: {
      id: '1',
      username: 'zakiquel',
      avatar: 'https://clck.ru/36jJ25',
    },
    text: 'Some interesting comment',
  },
};

export const Light = Template.bind({});
Light.args = {
  comment: {
    id: '1',
    user: {
      id: '1',
      username: 'zakiquel',
      avatar: 'https://clck.ru/36jJ25',
    },
    text: 'Some interesting comment',
  },
};
Light.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
