import URLs from '@/constants/constants';
import axios from 'axios';

const urlToOmit = [
  URLs.login,
  URLs.register,
  URLs.passwordRecovery,
  URLs.verifyEmail,
];

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config => {
    let authData;
    try {
      // Get token from local storage and check if it had been retrieved.
      authData = JSON.parse(localStorage.getItem('persist:auth'));
    } catch (e) {
      console.error('Error parsing auth data from local storage', e);
      authData = null;
    }
    const token = authData ? authData?.token?.replace(/"/g, '') : null;
    const isAuthUrl = urlToOmit.includes(config.url);
    if (!isAuthUrl) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    delete config.headers.Authorization;
    return config;
  },
  error => Promise.reject(error)
);

const token = {
  set(tokenValue) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${tokenValue}`;
  },
  unset() {
    delete axiosClient.defaults.headers.common.Authorization;
  },
};

export { axiosClient, token };
