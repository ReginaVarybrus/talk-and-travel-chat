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
    let authData;
    console.log(config.headers.Authorization);
    try {
      // Get token from local storage and check if it
      authData = JSON.parse(localStorage.getItem('persist:auth'));
    } catch (e) {
      console.error('Error parsing auth data from local storage', e);
      authData = null;
    }
    console.log('authData is:', authData);
    const token = authData ? authData?.token?.replace(/"/g, '') : null;
    const isAuthUrl = urlToOmit.includes(config.url);

    console.log(
      isAuthUrl ? 'This is an auth URL, omitting token.' : 'Not an auth URL, proceeding with token if available.',
      token ? `Token is being added: ${token}` : `No token available, skipping Authorization header. ${token}`,
    );

    if (!isAuthUrl) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('we are adding token to ', config.url);
      return config;
    }
    delete config.headers.Authorization;
    console.log('we should not add token, because',
      config.url, 'is list of urls to ommit, it is: ', isAuthUrl,
      'headers to be used as: ', config.headers.Authorization
    );
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
