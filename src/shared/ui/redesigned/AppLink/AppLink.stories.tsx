import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { AppLink } from './AppLink';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};
export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Text',
};
export const Red = Template.bind({});
Red.args = {
  children: 'Text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: 'Text',
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const RedDark = Template.bind({});
RedDark.args = {
  children: 'Text',
};
RedDark.decorators = [ThemeDecorator(Theme.DARK)];
