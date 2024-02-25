import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  defaultValue: 'Выберите значение',
  onChange: (value: string) => {},
  value: undefined,
  items: [
    { value: '1', content: 'Значение 1' },
    { value: '2', content: 'Значение 2' },
    { value: '3', content: 'Значение 3(disabled)', disabled: true },
    { value: '4', content: 'Значение 4' },
  ],
};
