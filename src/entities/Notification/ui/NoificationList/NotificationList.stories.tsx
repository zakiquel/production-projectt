import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withMock from 'storybook-addon-mock';

import { NotificationList } from './NotificationList';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'entities/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'notification title',
          description: 'notification description',
          userId: '1',
        },
        {
          id: '2',
          title: 'notification title',
          description: 'notification description',
          userId: '1',
        },
        {
          id: '3',
          title: 'notification title',
          description: 'notification description',
          userId: '1',
        },
      ],
    },
  ],
};
