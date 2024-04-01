import { createAsyncThunk } from '@reduxjs/toolkit';

import { token, axiosClient } from '@/services/api';
import ULRs from '../constants';

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
