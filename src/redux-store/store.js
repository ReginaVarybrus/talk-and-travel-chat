import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './slices/authSlice';
import { userSlice } from './slices/userSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'userDto', 'countryDto'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['userDto'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    user: persistReducer(userPersistConfig, userSlice.reducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
