import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import AvatarImg from '../../assets/tests/avatar.jpg';

import { Avatar } from './Avatar';

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: AvatarImg,
  size: 150,
  alt: 'avatar',
};

export const Small = Template.bind({});
Small.args = {
  src: AvatarImg,
  size: 50,
  alt: 'avatar',
};
