import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosClient } from '@/services/api';
import { logOut } from '@/redux-store/auth/authOperations';

export const useFetch = url =>
{
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() =>
  {
    if (!url) return;

    const fetchData = async () =>
    {
      try {
        const response = await axiosClient.get(url);
        setResponseData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Logging out...');
          dispatch(logOut());
        } else {
          console.error('Error fetching data:', error);
          setError(error);
        }
      }
    };

    fetchData();
  }, [url, dispatch]);

  return { responseData, error };
};
