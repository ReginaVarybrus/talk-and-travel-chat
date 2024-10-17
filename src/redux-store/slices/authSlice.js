import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut } from '../AuthOperations/AuthOperations.js';

const initialState = {
  token: null,
  isLoggedIn: false,
};

const handlePending = () => ({
  isLoggedIn: false,
});

const handleRejected = (state, action) => ({
  ...state,
  isLoggedIn: false,
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
        token: action.payload.token,
        isLoggedIn: true,
      }))

      .addCase(logIn.pending, handlePending)
      .addCase(logIn.rejected, handleRejected)
      .addCase(logIn.fulfilled, (state, action) =>
      {
        console.log('logIn fulfilled action:', action);  // Logs the action object
        return {
          ...state,
          token: action.payload.token,  // Access the payload token
          isLoggedIn: true,
        };
      })

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => ({
        ...state,
        ...initialState,
      })),
});

export default authSlice.reducer;
