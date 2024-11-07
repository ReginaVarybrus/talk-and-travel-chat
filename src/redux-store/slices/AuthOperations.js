/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

import { token, axiosClient } from '@/services/api';
import { clearUser, setUsers } from '@/redux-store/slices/userSlice';
import URLs from '@/constants/constants';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch }) => {
    try {
      const response = await axiosClient.post(URLs.register, userData);
      dispatch(setUsers(response.data.userDto));
      token.set(response.data.token);
      swal(
        'Success!',
        // 'Letter with verification sent on your email',
        'Welcome to our service, let`s start!',
        'success'
      );
      return response.data;
    } catch (e) {
      swal('Error!', e.response.message, 'error');
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosClient.post(URLs.login, userData);
      dispatch(setUsers(response.data.userDto));
      token.set(response.data.token);
      console.log(response.data);
      return response.data;
    } catch (e) {
      if (e.response.status === 400 || e.response.status === 401) {
        swal('Error!', 'Email or password invalid', 'error');
      } else if (e.response.status === 404) {
        swal('Error!', 'Email is wrong', 'error');
      } else {
        swal('Error!', 'Login failed', 'error');
      }
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { dispatch }) => {
    try {
      await axiosClient.post(URLs.logout);
      token.unset();
      dispatch(clearUser());
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
