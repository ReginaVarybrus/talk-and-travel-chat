// import URLs from '@/constants/constants';
// import axios from 'axios';

// const urlToOmit = [
//   URLs.login,
//   URLs.register,
//   URLs.passwordRecovery,
//   URLs.verifyEmail,
//   URLs.registerWithSocial,
//   URLs.loginWithSocial,
//   URLs.checkExistEmail,
// ];

// const axiosClient = axios.create({
//   baseURL: `${import.meta.env.VITE_APP_API_URL}/api/`,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosClient.interceptors.request.use(
//   config =>
//   {
//     let authData;
//     try {
//       authData = JSON.parse(localStorage.getItem('persist:auth'));
//     } catch (e) {
//       // console.error('Error parsing auth data from local storage', e);
//       authData = null;
//     }
//     const token = authData ? authData?.token?.replace(/"/g, '') : null;
//     const isAuthUrl = urlToOmit.includes(config.url);

//     if (!isAuthUrl) {
//       config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     }
//     delete config.headers.Authorization;
//     return config;
//   },
//   error => Promise.reject(error)
// );

// const token = {
//   set(tokenValue)
//   {
//     axiosClient.defaults.headers.common.Authorization = `Bearer ${tokenValue}`;
//   },
//   unset()
//   {
//     delete axiosClient.defaults.headers.common.Authorization;
//   },
// };

// export { axiosClient, token };

import URLs from '@/constants/constants';
import axios from 'axios';

const urlToOmit = [
  URLs.login,
  URLs.register,
  URLs.passwordRecovery,
  URLs.verifyEmail,
  URLs.registerWithSocial,
  URLs.loginWithSocial,
  URLs.checkExistEmail,
];

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config => {
    const authData = JSON.parse(localStorage.getItem('persist:auth')) || {};
    const token = authData?.token?.replace(/"/g, '');

    const isAuthUrl = urlToOmit.some(url => config.url.includes(url));
    if (!isAuthUrl && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
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
