import ULRs from '@/constants/constants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getToken } from '@/redux-store/selectors.js';


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
    const token = useSelector(getToken);
    console.log(token, 'token set in api', token);

    const isAuthUrl = urlToOmit.includes(config.url);

    if (!isAuthUrl && token) {
      console.log('we are adding', token);

      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    console.log('we are not adding', token);

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
