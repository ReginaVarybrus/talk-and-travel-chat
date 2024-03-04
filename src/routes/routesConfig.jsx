import { lazy } from 'react';
import PrivateRoute from '@/routes/PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';

const ROOT = import.meta.env.BASE_URL;

export const routesPath = {
  MAIN: ROOT,
  LOGIN: `/login`,
  REGISTER: `/register`,
  APP: `/app`,
  ROOMS_CHAT: `/app/rooms-chat/`,
  DMS_CHAT: `/app/dms-chat/`,
  ACCOUNT: `/app/account/`,
};

const importComponent = {
  MAIN: lazy(() => import('@/routes/MainRoute/MainRoute')),
  LOGIN: lazy(() => import('@/routes/LoginRoute/LoginRoute')),
  LAYOUT: lazy(() => import('@/components/Layout/Layout')),
  REGISTER: lazy(() => import('@/routes/RegisterRoute/RegisterRoute')),
  ROOMS_CHAT: lazy(() => import('@/routes/RoomsChatRoute/RoomsChatRoute')),
  DMS_CHAT: lazy(() => import('@/routes/DmsChatRoute/DmsChatRoute')),
  ACCOUNT: lazy(() => import('@/routes/AccountRoute/AccountRoute')),
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
        path: routesPath.ROOMS_CHAT,
        element: (
          <PrivateRoute
            component={importComponent.ROOMS_CHAT}
            redirectTo={routesPath.LOGIN}
          />
        ),
      },
      {
        path: routesPath.DMS_CHAT,
        element: (
          <PrivateRoute
            component={importComponent.DMS_CHAT}
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
