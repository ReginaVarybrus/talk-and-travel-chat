import { useEffect, useState } from 'react';
import { axiosClient } from '@/services/api';

export const useFetch = url => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('send fetch request');
        const response = await axiosClient.get(url);
        setResponseData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching country rooms:', error);
      }
    };

    fetchData();
    return () => {};
  }, []);

  return { responseData };
};
