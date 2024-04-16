import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { AvatarDropdown } from './AvatarDropdown';

import { UserRole } from '@/entities/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
  <AvatarDropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'admin',
        avatar: 'https://clck.ru/36nvwp',
        roles: [UserRole.USER, UserRole.ADMIN],
      },
    },
  }),
];
