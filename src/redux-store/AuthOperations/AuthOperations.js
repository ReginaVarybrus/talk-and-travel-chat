import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

import { sendRequest, token } from '@/services/api';

export const register = createAsyncThunk('auth/register', async userData => {
  try {
    const response = await sendRequest({
      method: 'post',
      endpoint: 'authentication/register',
      data: userData,
    });

    token.set(response.token);

    swal('Success!', 'Letter with verification sent on your email', 'success');

    return response;
  } catch (e) {
    console.log(e.response);
    if (
      e.response.status === 400 ||
      e.response.status === 401 ||
      e.response.status === 409
    ) {
      throw new Error(swal('Error!', e.response.message, 'error'));
    }
  }
});

export const logIn = createAsyncThunk('auth/login', async userData => {
  try {
    const response = await sendRequest({
      method: 'post',
      endpoint: 'authentication/login',
      data: userData,
    });

    token.set(response.token);
    console.log('login', response);

    return response;
  } catch (e) {
    console.log(e.response.data);
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
    await sendRequest({
      method: 'post',
      endpoint: 'authentication/logout',
    });

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
      const user = await sendRequest({
        method: 'get',
        endpoint: 'current',
      });

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
      const { data } = await sendRequest({
        method: 'put',
        endpoint: 'users',
        data: user,
      });

      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// TODO sendDataCountryToBackend request shuold be update when we understand do we need thas request or no

export const sendDataCountryToBackend = createAsyncThunk(
  'auth/sendDataCountryToBackend',
  async ({ userId, countryDto, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/countries/${userId}`,
        countryDto,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw rejectWithValue('Response data is missing');
      }

      console.log('token', token);
      console.log('data country', response);
      return response.data;
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
