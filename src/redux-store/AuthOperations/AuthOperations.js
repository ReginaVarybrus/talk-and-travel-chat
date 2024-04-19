/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

import { token, axiosClient } from '@/services/api';
import { setUsers } from '@/redux-store/slices/userSlice';
import ULRs from '../constants';

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

export const logIn = createAsyncThunk(
  'auth/login',
  async (userData, { dispatch }) => {
    try {
      const response = await axiosClient.post(ULRs.login, userData);
      token.set(response.token);
      dispatch(setUsers(response.data));

      return response.data;
    } catch (e) {
      if (e.response.status === 400 || e.response.status === 401) {
        throw new Error(swal('Error!', e.response.data.message, 'error'));
      }
      if (e.response.status === 404) {
        throw new Error(swal('Error!', 'Email is wrong', 'error'));
      }
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axiosClient.post(ULRs.logout);
    token.unset();
  } catch (error) {
    throw new Error(error.message);
  }
});
