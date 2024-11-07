import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut } from './AuthOperations.js';

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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })

      .addCase(logIn.pending, handlePending)
      .addCase(logIn.rejected, handleRejected)
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      }),
});

export default authSlice.reducer;
