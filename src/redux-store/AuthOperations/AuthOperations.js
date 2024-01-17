import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';

axios.defaults.baseURL = 'https://talk-and-travel.pp.ua';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
  get() {
    return axios.defaults.headers.common.Authorization.split(' ')[1] || null;
  },
};

export const register = createAsyncThunk('auth/register', async userData => {
  try {
    const response = await axios.post(
      '/api/authentication/register',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    token.set(response.data.token);
    console.log(response);
    console.log('data', response.data);

    swal('Success!', 'Letter with verification sent on your email', 'success');

    return response.data;
  } catch (e) {
    console.log(e.response.data);
    if (
      e.response.status === 400 ||
      e.response.status === 401 ||
      e.response.status === 409
    ) {
      throw new Error(swal('Error!', e.response.data.message, 'error'));
    }
  }
});

export const logIn = createAsyncThunk('auth/login', async userData => {
  try {
    const response = await axios.post('/api/authentication/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    token.set(response.data.token);
    console.log(response);

    return response.data;
  } catch (e) {
    console.log(e.response.data);
    if (e.response.status === 400 || e.response.status === 401) {
      throw new Error(swal('Error!', e.response.data.message, 'error'));
    }
    if (e.response.status === 404) {
      throw new Error(swal('Error!', 'Email is wrong', 'error'));
    }
  }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/auth/logout');
    token.unset();
  } catch (e) {
    console.log(e.message);
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('No valid token');
    }

    try {
      token.set(persistedToken);
      const user = await axios.get(`auth/current`);

      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.put('/api/users', user);

      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// country data

export const sendDataCountryToBackend = createAsyncThunk(
  'auth/sendDataCountryToBackend',
  async ({ userId, countryDto }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/country/${userId}`, countryDto, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.get()}`
        },
      });
      // token.set(response.data.token);
      
      console.log('data country', response);
      return response.data;
    } catch (e) {
      if (e.response && e.response.data) {
        console.log('Error response data:', e.response.data);
        throw rejectWithValue(e.response.data.message);
      } else {
        console.error('Error response is missing or does not have data property:', e.response);
        throw rejectWithValue('Unknown error occurred');
      }

      // rejectWithValue(e.response.data.message);
      // console.log(e.response.data);


      // if (
      //   e.response.status === 400 ||
      //   e.response.status === 401 ||
      //   e.response.status === 409
      // ) {
      //   throw rejectWithValue(e.response.data.message);
      // }
      // throw e;
    }
  }
);
