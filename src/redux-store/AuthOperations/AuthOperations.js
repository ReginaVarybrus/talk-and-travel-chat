/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

import { token, axiosClient } from '@/services/api';
import { clearUser, setUsers } from '@/redux-store/slices/userSlice';
import ULRs from '@/constants/constants';


export const register = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch }) =>
  {
    try {
      console.log('Registration started');
      const response = await axiosClient.post(ULRs.register, userData);
      console.log('Response from Registration', response);
      dispatch(setUsers(response.data.userDto));
      token.set(response.data.token);
      console.log('after dispatch');
      swal(
        'Success!',
        'Letter with verification sent on your email',
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
  async (userData, { dispatch }) =>
  {
    try {
      console.log('Login started');
      const response = await axiosClient.post(ULRs.login, userData);
      console.log('Response from Login', response);
      dispatch(setUsers(response.data.userDto));
      token.set(response.data.token);
      console.log('after dispatch');
      return response.data;
    } catch (e) {
      if (e.response.status === 400 || e.response.status === 401) {
        throw new Error(swal('Error!', e.response.data.message, 'error'));
      }
      if (e.response.status === 404) {
        throw new Error(swal('Error!', 'Email is wrong', 'error'));
      }
      throw new Error(swal('Error!', 'login failed', 'error'));
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (arg, { dispatch }) =>
  {
    try {
      await axiosClient.post(ULRs.logout);
      token.unset();
      dispatch(clearUser());
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
