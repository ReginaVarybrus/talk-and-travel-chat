import ULRs from '@/constants/constants';
import axios from 'axios';

const urlToOmit = [ULRs.login, ULRs.register];

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config =>
  {
    const authData = JSON.parse(localStorage.getItem('persist:auth'));
    const token = authData ? authData?.token?.replace(/"/g, '') : null;
    const isAuthUrl = urlToOmit.includes(config.url);

    if (!isAuthUrl && token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    delete config.headers.Authorization;
    return config;
  },
  error => Promise.reject(error)
);

const token = {
  set(tokenValue)
  {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${tokenValue}`;
  },
  unset()
  {
    delete axiosClient.defaults.headers.common.Authorization;
  },
};

export { axiosClient, token };
