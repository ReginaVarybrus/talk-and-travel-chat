import { describe, expect } from 'vitest';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/redux-store/store';
import { router } from '@/routes/routesConfig';

import SideBar from '../SideBar';

const renderComponent = children => {
  return render(
    <Provider store={store}>
      <RouterProvider router={router}>{children}</RouterProvider>
    </Provider>
  );
};

describe('SideBar component test', () => {
  it('render SideBar component', () => {
    const { sideBar } = renderComponent(<SideBar />);

    expect(sideBar).toMatchSnapshot();
  });
});
