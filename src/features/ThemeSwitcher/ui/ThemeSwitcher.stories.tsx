import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ThemeSwitcher } from './ThemeSwitcher';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => <ThemeSwitcher {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.DARK)];
