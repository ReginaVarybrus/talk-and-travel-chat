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

export const getUsersAvatar = createAsyncThunk('avatar/get', async (userId) =>
{
  try {
    const response = await axiosClient(URLs.usersAvatar(userId), {
      responseType: 'blob',
    });
    const blob = await response.data;
    const url = URL.createObjectURL(blob)
    // console.log(blob);

    return url;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateUsersAvatar = createAsyncThunk('avatar/update', async user =>
{
  try {
    const { data } = await axiosClient.post(URLs.getUsersAvatar, user);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});
