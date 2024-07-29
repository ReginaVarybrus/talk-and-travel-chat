import { useState } from 'react';
// import WebSocketProvider from '@/providers/WebSocketProvider';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [countryData, setCountryData] = useState({});
  const [subscriptionCountryRooms, setSubscriptionCountryRooms] = useState([]);
  const [currentCountryRoom, setCurrentCountryRoom] = useState(null);

  const onDataReceived = data => {
    setCountryData(data);
  };

  return (
    <ChatRouteStyled>
      <SearchBar
        countryData={countryData}
        setCurrentCountryRoom={setCurrentCountryRoom}
        onDataReceived={onDataReceived}
        subscriptionCountryRooms={subscriptionCountryRooms}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
      />
      <Chat
        countryData={countryData}
        currentCountryRoom={currentCountryRoom}
        setCountryData={setCountryData}
        subscriptionCountryRooms={subscriptionCountryRooms}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
