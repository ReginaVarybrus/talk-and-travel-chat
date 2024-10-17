import { useEffect, useState } from 'react';
import { axiosClient } from '@/services/api';

export const useFetch = url =>
{
  const [responseData, setResponseData] = useState(null);

  useEffect(() =>
  {
    if (!url) return;

    const fetchData = async () =>
    {
      try {
        const response = await axiosClient.get(url);
        setResponseData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching country rooms:', error);
      }
    };

    fetchData();
  }, [url]);

  return { responseData };
};
