import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    console.log('COUNTRY DATA:', countryData);
  }, [countryData]);

  return (
    <ChatRouteStyled>
      <SearchBar setCountryData={setCountryData} />
      <Chat countryData={countryData} />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
