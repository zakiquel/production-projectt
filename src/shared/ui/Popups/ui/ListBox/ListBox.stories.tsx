import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ padding: 100 }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  defaultValue: 'Значение',
  onChange: (value: string) => {},
  value: undefined,
  items: [
    { value: '1', content: 'Значение 1' },
    { value: '2', content: 'Значение 2' },
    { value: '3', content: 'Значение 3(disabled)', disabled: true },
    { value: '4', content: 'Значение 4' },
  ],
};

export const TopRight = Template.bind({});
TopRight.args = {
  direction: 'top right',
  defaultValue: 'Значение',
  onChange: (value: string) => {},
  value: undefined,
  items: [
    { value: '1', content: 'Значение 1' },
    { value: '2', content: 'Значение 2' },
    { value: '3', content: 'Значение 3(disabled)', disabled: true },
    { value: '4', content: 'Значение 4' },
  ],
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: 'top left',
  defaultValue: 'Значение',
  onChange: (value: string) => {},
  value: undefined,
  items: [
    { value: '1', content: 'Значение 1' },
    { value: '2', content: 'Значение 2' },
    { value: '3', content: 'Значение 3(disabled)', disabled: true },
    { value: '4', content: 'Значение 4' },
  ],
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: 'bottom left',
  defaultValue: 'Значение',
  onChange: (value: string) => {},
  value: undefined,
  items: [
    { value: '1', content: 'Значение 1' },
    { value: '2', content: 'Значение 2' },
    { value: '3', content: 'Значение 3(disabled)', disabled: true },
    { value: '4', content: 'Значение 4' },
  ],
};
