import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  sendDataCountryToBackend,
} from '../AuthOperations/AuthOperations.js';
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(register.fulfilled, (state, action) => ({
        ...state,
        userDto: action.payload.userDto,
        token: action.payload.token,
        isLoggedIn: true,
      }))

      .addCase(logIn.pending, handlePending)
      .addCase(logIn.rejected, handleRejected)
      .addCase(logIn.fulfilled, (state, action) => ({
        ...state,
        userDto: action.payload.userDto,
        token: action.payload.token,
        isLoggedIn: true,
        error: null,
      }))

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => ({
        ...state,
        userDto: { userName: null, userEmail: null },
        token: null,
        isLoggedIn: false,
        isRefresh: false,
      }))

      .addCase(sendDataCountryToBackend.pending, handlePending)
      .addCase(sendDataCountryToBackend.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(sendDataCountryToBackend.fulfilled, (state, action) => ({
        ...state,
        name: action.payload.name,
        flagCode: action.payload.flagCode,
        isLoggedIn: true,
      })),
});

export default authSlice.reducer;
