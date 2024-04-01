import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ThemeDecorator } from '../../config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../const/theme';

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

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
  title: 'Title',
  text: 'text',
};
PrimaryLight.decorators = [ThemeDecorator(Theme.DARK)];
export const OnlyTitleLight = Template.bind({});
OnlyTitleLight.args = {
  title: 'Title',
};
OnlyTitleLight.decorators = [ThemeDecorator(Theme.DARK)];
export const OnlyTextLight = Template.bind({});
OnlyTextLight.args = {
  text: 'text',
};
OnlyTextLight.decorators = [ThemeDecorator(Theme.DARK)];

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

export const SizeS = Template.bind({});
SizeS.args = {
  title: 'Title',
  text: 'text',
  size: TextSize.S,
};
