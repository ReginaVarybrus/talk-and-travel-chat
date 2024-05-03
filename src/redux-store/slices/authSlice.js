import { createSlice } from '@reduxjs/toolkit';
import
{
  register,
  logIn,
  logOut,
  sendDataCountryToBackend,
} from '@/redux-store/AuthOperations/AuthOperations';

const initialState = {
  token: null,
  isLoggedIn: false,
  isRefresh: false,
  error: null,
  flagCode: null,
};

const handlePending = (state) => ({
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
        token: action.payload.token,
        isLoggedIn: true,
        isRefresh: false,
      }))

      .addCase(logIn.pending, handlePending)
      .addCase(logIn.rejected, handleRejected)
      .addCase(logIn.fulfilled, (state, action) => ({
        ...state,
        token: action.payload.token,
        isLoggedIn: true,
        error: null,
        isRefresh: false,
      }))

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.rejected, handleRejected)
      .addCase(logOut.fulfilled, () => (state) => ({
        ...state, ...initialState
      }))

      .addCase(sendDataCountryToBackend.pending, handlePending)
      .addCase(sendDataCountryToBackend.rejected, handleRejected)
      .addCase(sendDataCountryToBackend.fulfilled, (state, action) => ({
        // ...state,
        // name: action.payload.name,
        flagCode: action.payload.flagCode,
      })),
});

export default authSlice.reducer;
