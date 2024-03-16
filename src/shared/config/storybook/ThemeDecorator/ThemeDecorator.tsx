import { Story } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line zavalition-fsd/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <StoryComponent />
    </div>
  </ThemeProvider>
);
