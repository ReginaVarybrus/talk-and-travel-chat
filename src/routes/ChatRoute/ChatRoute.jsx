import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
// import Chat from '@/components/Chat/Chat';
import TestWebSocketChat from '@/components/TestWebSocketChat/TestWebSocketChat';

import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [countryName, setCountryName] = useState('');

  const handleCountrySelect = name => {
    setCountryName(name);
  };

  return (
    <ChatRouteStyled>
      <SearchBar onSelect={handleCountrySelect} />
      <TestWebSocketChat countryName={countryName} />
      {/* <Chat /> */}
    </ChatRouteStyled>
  );
};

export default ChatRoute;
