import ULRs from '@/redux-store/constants';
import axios from 'axios';

const urlToOmit = [ULRs.login, ULRs.register, ULRs.logout];

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config =>
  {
    const { token } = JSON.parse(localStorage.getItem('persist:auth'));
    const isAuthUrl = urlToOmit.includes[config.url];

    if (!isAuthUrl && token && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    }

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
