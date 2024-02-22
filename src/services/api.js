import axios from 'axios';

axios.defaults.baseURL = 'https://talk-and-travel.pp.ua/api/authentication';

axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const sendRequest = async ({ method, endpoint, data }) => {
  try {
    const response = await axios.request({
      method,
      url: `/${endpoint}`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
