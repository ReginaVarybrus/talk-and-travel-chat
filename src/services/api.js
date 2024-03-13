import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config => {
    const { token } = JSON.parse(localStorage.getItem('persist:auth'));

    if (token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const token = {
  set() {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    delete axiosClient.defaults.headers.common.Authorization;
  },
};

export { axiosClient, token };
