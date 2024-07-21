import { useState } from 'react';
// import WebSocketProvider from '@/providers/WebSocketProvider';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [countryData, setCountryData] = useState({});
  const [currentCountryRoom, setCurrentCountryRoom] = useState(null);

  const onDataReceived = data => {
    console.log('Recieved COUNTRY DATA:', data.body);
    setCountryData(data.body);
  };

  return (
    <ChatRouteStyled>
      <SearchBar
        setCurrentCountryRoom={setCurrentCountryRoom}
        onDataReceived={onDataReceived}
      />
      <Chat countryData={countryData} currentCountryRoom={currentCountryRoom} />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
