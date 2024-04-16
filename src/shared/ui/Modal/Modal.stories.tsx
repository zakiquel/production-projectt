import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Modal } from './Modal';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    'Lorem ipasdjaoihfo  ajfpdjfipadjfjipLorem ipasdjaoihfo  ajfpdjfipadjfjip',
};

export const Light = Template.bind({});
Light.args = {
  isOpen: true,
  children:
    'Lorem ipasdjaoihfo  ajfpdjfipadjfjipLorem ipasdjaoihfo  ajfpdjfipadjfjip',
};
Light.decorators = [ThemeDecorator(Theme.DARK)];
