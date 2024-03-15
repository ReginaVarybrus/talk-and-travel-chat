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
  error => Promise.reject(error)
);

const token = {
  set() {
    localStorage.setItem('authToken', token);

    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    localStorage.removeItem('authToken');
    delete axiosClient.defaults.headers.common.Authorization;
  },
};

export { axiosClient, token };
