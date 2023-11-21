import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title',
  text: 'text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Title',
  text: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];
export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Title',
  text: 'text',
  size: TextSize.L,
};

export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Title',
  text: 'text',
  size: TextSize.M,
};
