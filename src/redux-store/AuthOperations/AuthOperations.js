import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

import { token, axiosClient } from '@/services/api';

const ULRs = {
  register: 'authentication/register',
  login: 'authentication/login',
  logout: 'authentication/logout',
  currentUser: 'current',
  updateUser: 'users',
  country: 'countries',
};

export const register = createAsyncThunk('auth/register', async userData => {
  try {
    const response = await axiosClient.post(ULRs.register, userData);

    token.set(response.token);
    swal('Success!', 'Letter with verification sent on your email', 'success');
    return response.data;
  } catch (e) {
    swal('Error!', e.response.message, 'error');
  }
});

export const logIn = createAsyncThunk('auth/login', async userData => {
  try {
    const response = await axiosClient.post(ULRs.login, userData);
    token.set(response.token);
    return response.data;
  } catch (e) {
    if (e.response.status === 400 || e.response.status === 401) {
      throw new Error(swal('Error!', e.response.data.message, 'error'));
    }
    if (e.response.status === 404) {
      throw new Error(swal('Error!', 'Email is wrong', 'error'));
    }
  }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axiosClient.post(ULRs.logout);
    token.unset();
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('No valid token');
    }

    try {
      token.set(persistedToken);
      const user = axiosClient.get(ULRs.currentUser);

      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user, thunkAPI) => {
    try {
      const { data } = await axiosClient.put(ULRs.updateUser, user);
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// TODO sendDataCountryToBackend request shuold be update when we understand do we need thas request or no

export const sendDataCountryToBackend = createAsyncThunk(
  'auth/sendDataCountryToBackend',
  async ({ userId, countryDto }, { rejectWithValue }) => {
    debugger;
    try {
      const response = await axiosClient.post(
        `${ULRs.country}/${userId}`,
        countryDto
      );

      if (!response.data) {
        throw rejectWithValue('Response data is missing');
      }
    } catch (e) {
      if (e.response && e.response.data) {
        console.log('Error response data:', e.response.data);
        throw rejectWithValue(e.response.data.message);
      } else {
        console.error(
          'Error response is missing or does not have data property:',
          e.response
        );
        throw rejectWithValue('Unknown error occurred');
      }
    }
  }
);
