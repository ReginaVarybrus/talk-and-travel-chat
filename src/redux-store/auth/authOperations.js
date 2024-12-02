/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { token as authToken, axiosClient } from '@/services/api';
import { clearUser, setUsers } from '@/redux-store/user/userSlice';
import URLs from '@/constants/constants';

export const checkEmailExists = createAsyncThunk(
  'auth/checkEmailExists',
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `${URLs.checkExistEmail}?email=${userEmail}`
      );
      return response.data;
    } catch (error) {
      console.error('Error checking email:', error.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to check email'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(URLs.register, userData);
      Swal.fire({
        title: 'Success!',
        text: 'Please check your email for a confirmation link to complete the registration.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });

      return response.data;
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed registration. Please try again.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
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
      Swal.fire({
        text: 'Success login.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      return response.data;
    } catch (e) {
      if (e.response.status === 400 || e.response.status === 401) {
        Swal.fire({
          text: 'Email or password invalid',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (e.response.status === 404) {
        Swal.fire({
          text: 'Email is wrong.',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          text: 'Login failed. Please try again.',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
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

      Swal.fire({
        text: 'Your email has been confirmed. Welcome to the app!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        text: 'Verification failed. Please try again.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logInWithGoogle = createAsyncThunk(
  'auth/logInWithGoogle',
  async (googleData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosClient.post(URLs.loginWithSocial, {
        userEmail: googleData.email,
      });
      dispatch(setUsers(response.data.userDto));
      Swal.fire({
        text: 'Success login.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      return response.data;
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 404) {
        await axiosClient.post(URLs.registerWithSocial, {
          userName: googleData.name,
          userEmail: googleData.email,
        });
        const response = await axiosClient.post(URLs.loginWithSocial, {
          userEmail: googleData.email,
        });
        Swal.fire({
          text: 'Success registration.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(setUsers(response.data.userDto));
        return response.data;
      }
      return rejectWithValue(err.response?.data.message || 'Login failed');
    }
  }
);

export const logInWithFacebook = createAsyncThunk(
  'auth/logInWithFacebook',
  async (facebookData, { rejectWithValue }) => {
    console.log('Facebook Data:', facebookData);
    try {
      const response = await axiosClient.post(URLs.loginWithSocial, {
        userEmail: facebookData.email,
      });
      console.log('Login response:', response.data);
      return response.data;
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.status === 404) {
        console.log('User not found, registering...');
        await axiosClient.post(URLs.registerWithSocial, {
          userName: facebookData.name,
          userEmail: facebookData.email,
        });
        const retryResponse = await axiosClient.post(URLs.loginWithSocial, {
          userEmail: facebookData.email,
        });
        console.log('Retry login response:', retryResponse.data);
        return retryResponse.data;
      }
      return rejectWithValue(err.response?.data.message || 'Login failed');
    }
  }
);
