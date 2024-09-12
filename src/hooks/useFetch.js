import { useEffect, useState } from 'react';
import { axiosClient } from '@/services/api';

export const useFetch = (url, type) => {
  const [responseData, setResponseData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!url || hasFetched) return;

    const fetchData = async () => {
      try {
        const response = await axiosClient.get(url, type);
        setResponseData(response.data);
        setHasFetched(true);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching country rooms:', error);
      }
    };

    fetchData();
  }, [url, hasFetched]);

  return { responseData };
};
