import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
// import Chat from '@/components/Chat/Chat';
import TestWebSocketChat from '@/components/TestWebSocketChat/TestWebSocketChat';

import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    console.log('COUNTRY DATA:', countryData);
  }, [countryData]);

  return (
    <ChatRouteStyled>
      <SearchBar setCountryData={setCountryData} />
      <TestWebSocketChat countryData={countryData} />
      {/* <Chat /> */}
    </ChatRouteStyled>
  );
};

export default ChatRoute;
