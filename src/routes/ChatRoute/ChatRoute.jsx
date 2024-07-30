import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [countryData, setCountryData] = useState({});
  const [subscriptionCountryRooms, setSubscriptionCountryRooms] = useState([]);

  const onCountryRoomDataReceived = data => {
    setCountryData(data);
  };

  return (
    <ChatRouteStyled>
      <SearchBar
        countryData={countryData}
        onCountryRoomDataReceived={onCountryRoomDataReceived}
        subscriptionCountryRooms={subscriptionCountryRooms}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
      />
      <Chat
        countryData={countryData}
        setCountryData={setCountryData}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
