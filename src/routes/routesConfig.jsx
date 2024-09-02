import { lazy } from 'react';
import PrivateRoute from '@/routes/PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';
import { ChatTypeProvider } from '@/providers/ChatTypeProvider';

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
        children: [
          {
            path: routesPath.ROOMS,
            element: (
              <ChatTypeProvider chatType="rooms">
                <PrivateRoute
                  component={importComponent.ROOMS}
                  redirectTo={routesPath.LOGIN}
                />
              </ChatTypeProvider>
            ),
          },
          {
            path: routesPath.DMS,
            element: (
              <ChatTypeProvider chatType="dms">
                <PrivateRoute
                  component={importComponent.DMS}
                  redirectTo={routesPath.LOGIN}
                />
              </ChatTypeProvider>
            ),
          },
        ],
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
