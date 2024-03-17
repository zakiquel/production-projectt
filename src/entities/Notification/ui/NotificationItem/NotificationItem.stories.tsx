import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Notification } from '../../model/types/notification';

import { NotificationItem } from './NotificationItem';

export default {
  title: 'entities/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

const notification: Notification = {
  id: '1',
  title: 'title',
  description: 'string',
};

export const Normal = Template.bind({});
Normal.args = {
  item: notification,
};
