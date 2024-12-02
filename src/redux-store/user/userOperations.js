import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '@/services/api';
import URLs from '@/constants/constants';

export const updateUser = createAsyncThunk('user/update', async user =>
{
  try {
    const { data } = await axiosClient.put(URLs.updateUser, user);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateUsersAvatar = createAsyncThunk(
  'user/avatar',
  async avatar =>
  {
    try {
      const formData = new FormData();
      formData.append('image', avatar);
      const response = await axiosClient.post(URLs.usersAvatarUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('from avatar update', response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const fetchUsersOnlineStatuses = createAsyncThunk(
  'onlineUsers/fetchStatuses',
  async () =>
  {
    try {
      const response = await axiosClient.get(URLs.getUsersOnlineStatusPath);
      console.log('Original response data:', response.data);
      return Object.entries(response.data).map(([userId, userData]) => ({
        userId: Number(userId),
        status: {
          isOnline: userData.isOnline,
          lastSeenOn: userData.lastSeenOn,
        },
      }));
    } catch (e) {
      console.error('Error fetching user statuses:', e);
      throw e;
    }
  }
);
