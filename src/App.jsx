import React, { Suspense } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { persistor, store } from './redux-store/store';
import { GlobalStyles } from './GlobalStyles';

import Loader from '@/components/Loader/Loader';
import { router } from '@/routes/routesConfig';

function App() {
  return (
    <React.StrictMode>
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalStyles />
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </Suspense>
    </React.StrictMode>
  );
}

export default App;
