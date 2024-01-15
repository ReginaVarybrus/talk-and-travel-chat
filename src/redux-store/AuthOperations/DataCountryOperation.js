import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendDataCountryToBackend = createAsyncThunk(
  'auth/sendDataCountryToBackend',
  async (userId, data, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/country/${userId}`, data);

      return response.data;
      // console.log('send data', response);
    } catch (error) {
      return rejectWithValue(error.message || 'Something is wrong');
    }
  }
);
