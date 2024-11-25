/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

import { token as authToken, axiosClient } from '@/services/api';
import { clearUser, setUsers } from '@/redux-store/slices/userSlice';
import URLs from '@/constants/constants';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(URLs.register, userData);

      swal(
        'Success!',
        'Please check your email for a confirmation link to complete the registration.',
        'success'
      );
      return response.data;
    } catch (e) {
      swal('Error!', e.response.data.message || 'Registration failed', 'error');
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosClient.post(URLs.login, userData);
      dispatch(setUsers(response.data.userDto));
      authToken.set(response.data.token);

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
      authToken.unset();
      dispatch(clearUser());
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationToken, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosClient.post(URLs.verifyEmail, {
        token: verificationToken,
      });
      const { token, userDto } = response.data;
      authToken.set(token);
      dispatch(setUsers(userDto));

      swal(
        'Success!',
        'Your email has been confirmed. Welcome to the app!',
        'success'
      );
      return response.data;
    } catch (error) {
      swal('Error!', 'Verification failed. Please try again.', 'error');
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logInWithGoogle = createAsyncThunk(
  'auth/logInWithGoogle',
  async (googleData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(URLs.loginWithSocial, {
        userEmail: googleData.email,
      });
      return response.data;
    } catch (err) {
      if (err.response?.status === 404) {
        await axiosClient.post(URLs.registerWithSocial, {
          userName: googleData.name,
          userEmail: googleData.email,
        });
        return axiosClient
          .post(URLs.loginWithSocial, {
            userEmail: googleData.email,
          })
          .then(res => res.data);
      }
      return rejectWithValue(err.response?.data.message || 'Login failed');
    }
  }
);

export const logInWithFacebook = createAsyncThunk(
  'auth/logInWithFacebook',
  async (facebookData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(URLs.loginWithSocial, {
        userEmail: facebookData.email,
      });
      return response.data;
    } catch (err) {
      if (err.response?.status === 404) {
        // Если пользователь не зарегистрирован, выполните регистрацию
        await axiosClient.post(URLs.registerWithSocial, {
          userName: facebookData.name,
          userEmail: facebookData.email,
        });
        // Повторите попытку авторизации после регистрации
        return axiosClient
          .post(URLs.loginWithSocial, {
            userEmail: facebookData.email,
          })
          .then(res => res.data);
      }
      return rejectWithValue(err.response?.data.message || 'Login failed');
    }
  }
);
