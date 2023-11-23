import { Story, StoryContext } from '@storybook/react';
import {
  BrowserRouter, MemoryRouter, Route, Routes,
} from 'react-router-dom';

export function RouterDecorator(StoryComponent: Story, { parameters: { router } }: StoryContext) {
  if (!router) {
    return (
      <BrowserRouter>
        <StoryComponent />
      </BrowserRouter>
    );
  }
  const { path, route } = router;

  return (
    <MemoryRouter initialEntries={[encodeURI(route)]}>
      <Routes>
        <Route path={path} element={<StoryComponent />} />
      </Routes>
    </MemoryRouter>
  );
}
