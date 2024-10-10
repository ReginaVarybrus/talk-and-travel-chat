import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

import { axiosClient } from '@/services/api';
import { setUsers } from '@/redux-store/slices/userSlice';
import ULRs from '@/constants/constants';

export const fetchCurrentUser = createAsyncThunk(
  'user/fetch',
  async (userId, { dispatch }) => {
    try {
      const response = await axiosClient.post(ULRs.currentUser, userId);
      dispatch(setUsers(response.data));
      console.log('fetchCurrentUser:', response.data);
      return response.data;
    } catch (e) {
      throw new Error(swal('Error!', 'login failed', 'error'));
    }
  }
);

export const updateUser = createAsyncThunk('user/update', async user => {
  try {
    const { data } = await axiosClient.put(ULRs.updateUser, user);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});
