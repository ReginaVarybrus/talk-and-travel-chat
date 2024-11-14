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
  VERIFY_EMAIL: '/registration-confirmation',
};

const importComponent = {
  MAIN: lazy(() => import('@/routes/MainRoute/MainRoute')),
  LOGIN: lazy(() => import('@/routes/LoginRoute/LoginRoute')),
  REGISTER: lazy(() => import('@/routes/RegisterRoute/RegisterRoute')),
  VERIFY_EMAIL: lazy(
    () => import('@/routes/VerificationRoute/VerificationRoute')
  ),
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
    element: <importComponent.MAIN />,
    errorElement: <importComponent.ERROR_COMPONENT />,
  },
  {
    path: routesPath.VERIFY_EMAIL,
    element: <importComponent.VERIFY_EMAIL />,
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
    element: <importComponent.RESET_PASSWORD />,
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
        element: <importComponent.CHAT />,
        children: [
          {
            path: routesPath.ROOMS,
            element: <importComponent.ROOMS />,
          },
          {
            path: routesPath.DMS,
            element: <importComponent.DMS />,
          },
        ],
      },
      {
        path: routesPath.ACCOUNT,
        element: <importComponent.ACCOUNT />,
      },
    ],
  },
]);
