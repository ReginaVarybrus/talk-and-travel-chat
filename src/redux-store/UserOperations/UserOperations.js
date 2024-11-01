import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

import { axiosClient } from '@/services/api';
import { setUsers } from '@/redux-store/slices/userSlice';
import URLs from '@/constants/constants';

export const fetchCurrentUser = createAsyncThunk(
  'user/fetch',
  async (userId, { dispatch }) =>
  {
    try {
      const response = await axiosClient.post(URLs.currentUser, userId);
      dispatch(setUsers(response.data));
      console.log('fetchCurrentUser:', response.data);
      return response.data;
    } catch (e) {
      throw new Error(swal('Error!', 'login failed', 'error'));
    }
  }
);

export const updateUser = createAsyncThunk('user/update', async user =>
{
  try {
    const { data } = await axiosClient.put(URLs.updateUser, user);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateUsersAvatar = createAsyncThunk('user/avatar', async () =>
{
  try {
    const response = await axiosClient(URLs.usersAvatarUrl);
    console.log('from avatar update', response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});
