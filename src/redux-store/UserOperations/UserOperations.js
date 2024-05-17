import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

import { axiosClient } from '@/services/api';
import { setUsers } from '@/redux-store/slices/userSlice';

import ULRs from '@/redux-store/constants';

export const fetchCurrentUser = createAsyncThunk(
  'user/fetch',
  async (userId, { dispatch }) =>
  {
    try {
      const response = await axiosClient.post(ULRs.currentUser, userId);
      dispatch(setUsers(response.data));
      return response.data;
    } catch (e) {
      throw new Error(swal('Error!', 'login failed', 'error'));
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user, thunkAPI) =>
  {
    try {
      const { data } = await axiosClient.put(ULRs.updateUser, user);
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
