import { lazy } from 'react';
import PrivateRoute from '@/routes/PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';
import RestrictedRoute from './RestrictedRoute';

const ROOT = import.meta.env.BASE_URL;

export const routesPath = {
  MAIN: ROOT,
  LOGIN: `/login`,
  REGISTER: `/register`,
  APP: `/app`,
  CHAT: `/app/chat/`,
  ROOMS: `/app/chat/rooms-chat/`,
  DMS: `/app/chat/dms-chat/`,
  ACCOUNT: `/app/account/`,
  RESET_PASSWORD: '/password-recovery',
};

const importComponent = {
  MAIN: lazy(() => import('@/routes/MainRoute/MainRoute')),
  LOGIN: lazy(() => import('@/routes/LoginRoute/LoginRoute')),
  REGISTER: lazy(() => import('@/routes/RegisterRoute/RegisterRoute')),
  LAYOUT: lazy(() => import('@/components/Layout/Layout')),
  CHAT: lazy(() => import('@/routes/ChatRoute/ChatRoute')),
  ROOMS: lazy(() => import('@/components/RoomsList/RoomsList')),
  DMS: lazy(() => import('@/components/DMsList/DMsList')),
  ACCOUNT: lazy(() => import('@/routes/AccountRoute/AccountRoute')),
  ERROR_COMPONENT: lazy(() => import('@/routes/Page404/Page404')),
  RESET_PASSWORD: lazy(
    () => import('@/routes/ResetPasswordRoute/ResetPasswordRoute')
  ),
};

export const router = createBrowserRouter([
  {
    path: routesPath.MAIN,
    Component: importComponent.MAIN,
    errorElement: importComponent.ERROR_COMPONENT,
  },
  {
    path: routesPath.LOGIN,
    element: (
      <RestrictedRoute
        component={importComponent.LOGIN}
        redirectTo={routesPath.ROOMS}
      />
    ),
  },
  {
    path: routesPath.REGISTER,
    element: (
      <RestrictedRoute
        component={importComponent.REGISTER}
        redirectTo={routesPath.ROOMS}
      />
    ),
  },
  {
    path: routesPath.RESET_PASSWORD,
    Component: importComponent.RESET_PASSWORD,
  },
  {
    path: routesPath.APP,
    element: (
      <PrivateRoute
        component={importComponent.LAYOUT}
        redirectTo={routesPath.MAIN}
      />
    ),
    children: [
      {
        path: routesPath.CHAT,
        Component: importComponent.CHAT,
        children: [
          {
            path: routesPath.ROOMS,
            Component: importComponent.ROOMS,
          },
          {
            path: routesPath.DMS,
            Component: importComponent.DMS,
          },
        ],
      },
      {
        path: routesPath.ACCOUNT,
        Component: importComponent.ACCOUNT,
      },
    ],
  },
]);
