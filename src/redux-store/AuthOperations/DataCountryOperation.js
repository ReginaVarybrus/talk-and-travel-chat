import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://talk-and-travel.pp.ua';

export const sendDataCountryToBackend = createAsyncThunk(
  'auth/sendDataCountryToBackend',
  async ({ userId, countryDto }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/country/${userId}`, countryDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('data country', response);
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      if (
        e.response.status === 400 ||
        e.response.status === 401 ||
        e.response.status === 409
      ) {
        throw rejectWithValue(e.response.data.message);
      }
      throw e;
    }
  }
);
