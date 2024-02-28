import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  fetchCurrentUser,
  updateUser,
  sendDataCountryToBackend,
} from './AuthOperations';

const initialState = {
  token: null,
  userDto: {
    userName: '',
    userEmail: '',
    avatar: '',
  },
  name: '',
  flagCode: '',
  userId: '',
  countryRooms: [],

  isLoggedIn: false,
  isRefresh: true,
  error: null,
};

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
