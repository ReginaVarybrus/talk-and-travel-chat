import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from '@/routes/PrivateRoute';

export const routesPath = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  APP: '/app',
  CHAT: '/app/chat/',
  ACCOUNT: '/app/account/',
};

const importComponent = {
  MAIN: lazy(() => import('@/routes/MainPage/MainPage')),
  LOGIN: lazy(() => import('@/routes/LoginPage/LoginPage')),
  LAYOUT: lazy(() => import('@/components/Layout/Layout')),
  REGISTER: lazy(() => import('@/routes/RegisterPage/RegisterPage')),
  CHAT: lazy(() => import('@/routes/ChatPage/ChatPage')),
  ACCOUNT: lazy(() => import('@/routes/AccountPage/AccountPage')),
  ERROR_COMPONENT: lazy(() => import('@/routes/Page404/Page404')),
};

export const router = createBrowserRouter([
  {
    path: routesPath.MAIN,
    Component: importComponent.MAIN,
    errorElement: importComponent.ERROR_COMPONENT,
  },
  {
    path: routesPath.LOGIN,
    Component: importComponent.LOGIN,
  },
  {
    path: routesPath.REGISTER,
    Component: importComponent.REGISTER,
  },
  {
    path: routesPath.APP,
    element: (
      <PrivateRoute
        component={importComponent.LAYOUT}
        redirectTo={routesPath.LOGIN}
      />
    ),
    children: [
      {
        path: routesPath.CHAT,
        element: (
          <PrivateRoute
            component={importComponent.CHAT}
            redirectTo={routesPath.LOGIN}
          />
        ),
      },
      {
        path: routesPath.ACCOUNT,
        element: (
          <PrivateRoute
            component={importComponent.ACCOUNT}
            redirectTo={routesPath.LOGIN}
          />
        ),
      },
    ],
  },
]);
