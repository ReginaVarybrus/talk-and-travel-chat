import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  verifyEmail,
  logInWithFacebook,
  logInWithGoogle,
} from './authOperations.js';

const initialState = {
  token: null,
  isLoggedIn: false,
  error: null,
};

const handlePending = state => {
  state.isLoggedIn = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoggedIn = false;
  state.error = action.payload;
};

const handleFulfilledLogin = (state, action) => {
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.error = null;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    forceLogOut: state => {
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(register.fulfilled, state => {
        state.error = null;
      })

      .addCase(logIn.pending, handlePending)
      .addCase(logIn.rejected, handleRejected)
      .addCase(logIn.fulfilled, handleFulfilledLogin)

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })

      .addCase(verifyEmail.pending, handlePending)
      .addCase(verifyEmail.rejected, handleRejected)
      .addCase(verifyEmail.fulfilled, handleFulfilledLogin)

      .addCase(logInWithFacebook.pending, handlePending)
      .addCase(logInWithFacebook.rejected, handleRejected)
      .addCase(logInWithFacebook.fulfilled, handleFulfilledLogin)

      .addCase(logInWithGoogle.pending, handlePending)
      .addCase(logInWithGoogle.rejected, handleRejected)
      .addCase(logInWithGoogle.fulfilled, handleFulfilledLogin),
});

export const { forceLogOut } = authSlice.actions;
export default authSlice.reducer;
