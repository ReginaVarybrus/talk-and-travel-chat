import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentUser,
  updateUser,
} from '../UserOperations/UserOperations.js';
import initialState from '../initialState';

const handlePending = state => ({
  ...state,
  isRefresh: true,
});

const handleRejected = (state, action) => ({
  ...state,
  isRefresh: false,
  error: action.payload,
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.rejected, handleRejected)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => ({
        ...state,
        userDto: action.payload.userDto,
        isLoggedIn: true,
        isRefresh: false,
      }))

      .addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        userDto: { ...state.userDto, ...action.payload },
      })),
});

export default userSlice.reducer;
