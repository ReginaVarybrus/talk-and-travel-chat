import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import WebSocketProvider from '@/providers/WebSocketProvider';
import { ChatProvider } from '@/providers/ChatProvider';
import { RouterProvider } from 'react-router-dom';

import Loader from '@/components/Loader/Loader';
import { router } from '@/routes/routesConfig';
import { persistor, store } from '@/redux-store/store';
import { GlobalStyles } from './GlobalStyles';

const App = () => (
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles />
          <WebSocketProvider>
            <ChatProvider>
              <RouterProvider router={router} />
            </ChatProvider>
          </WebSocketProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

export default App;
