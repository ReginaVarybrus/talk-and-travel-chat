import { expect, description, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Підключаємо redux-mock-store
import authSlice, { register } from '../authSlice.js';

const mockStore = configureStore({});

description('initialState test', () => {
  it('should has empty fields', () => {
    const store = mockStore({
      token: null,
      userDto: {
        userName: '',
        userEmail: '',
        avatar: '',
      },
      name: '',
      flagCode: '',
      userId: '',
      countryRooms: [],

      isLoggedIn: false,
      isRefresh: true,
      error: null,
    });

    const { container } = render(
      <Provider store={store}>
        <authSlice />
      </Provider>
    );

    const state = store.getState();

    expect(state).toEqual(store);
  });

  it('should add data to fields', () => {
    const store = mockStore({
      token: null,
      userDto: {
        userName: '',
        userEmail: '',
        avatar: '',
      },
      name: '',
      flagCode: '',
      userId: '',
      countryRooms: [],

      isLoggedIn: false,
      isRefresh: true,
      error: null,
    });

    store.dispatch(
      register({
        userDto: {
          userName: 'Regina',
          userEmail: 'regina@gm.com',
          avatar: '',
        },
        token: 'ljflkff908987sfnkvn',
        isLoggedIn: true,
      })
    );

    const state = store.getState();

    expect(state).toEqual({
      userDto: {
        userName: 'Regina',
        userEmail: 'regina@gm.com',
        avatar: '',
      },
      token: 'ljflkff908987sfnkvn',
      isLoggedIn: true,
    });
  });
});
