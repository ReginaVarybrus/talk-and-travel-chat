import { description, expect, it, vi, mock } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { persistor, store } from '@/redux-store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { router } from '@/routes/routesConfig';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { logIn } from '@/redux-store/AuthOperations/AuthOperations';

import LoginForm from '../LoginForm';

const useFormikMock = vi.fn(() => ({
  initialValues: { userEmail: '', password: '' },
  validationSchema: {},
  validateOnChange: false,
  onSubmit: vi.fn(),
}));
const mockDispatch = vi.fn();
const mockResetForm = vi.fn();

const useNavigateMock = vi.fn();
const logInMock = vi.fn();

vi.mock('formik', () => ({
  useFormik: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  ...require('react-router-dom'),
  navigate: vi.fn(),
}));

vi.mock('@/redux-store/AuthOperations/AuthOperations', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    logIn: vi.fn(),
  };
});

describe('LoginForm component test', () => {
  it('should render the LoginForm component', () => {
    useFormik.mockReturnValue({
      ...useFormikMock(),
      onSubmit: useFormikMock().onSubmit,
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <RouterProvider router={router}>
          <LoginForm />
        </RouterProvider>
      </Provider>
    );

    const userEmailInput = getByTestId('userEmail');
    fireEvent.change(userEmailInput, { target: { value: 'test@example.com' } });

    const passwordInput = getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.submit(getByTestId('loginForm'));

    expect(useFormikMock().onSubmit).toHaveBeenCalledWith(
      { userEmail: 'test@example.com', password: 'password123' },
      { resetForm: mockResetForm }
    );

    expect(navigate).toHaveBeenCalledWith(routesPath.CHAT);
  });

  it('displays error for invalid email', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RouterProvider router={router}>
          <LoginForm />
        </RouterProvider>
      </Provider>
    );
    const emailInput = getByTestId('userEmail');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const error = screen.getByText('Invalid email address');
    expect(error).toBeInTheDocument();
  });
});
