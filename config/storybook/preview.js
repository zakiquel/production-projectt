import { addDecorator } from '@storybook/react';

import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/shared/const/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  themes: {
    default: 'normal',
    list: [
      { name: 'normal', class: Theme.NORMAL, color: '#161617' },
      { name: 'dark', class: Theme.DARK, color: '#b5a3e7' },
      { name: 'custom', class: Theme.CUSTOM, color: '#48348c' },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.NORMAL));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
