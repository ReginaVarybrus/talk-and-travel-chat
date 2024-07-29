import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [countryData, setCountryData] = useState({});
  const [subscriptionCountryRooms, setSubscriptionCountryRooms] = useState([]);
  const [currentCountryRoom, setCurrentCountryRoom] = useState(null);

  const onCountryRoomDataReceived = data => {
    setCountryData(data);
    console.log('COUNTRY DATA', data);
  };

  return (
    <ChatRouteStyled>
      <SearchBar
        countryData={countryData}
        setCurrentCountryRoom={setCurrentCountryRoom}
        onCountryRoomDataReceived={onCountryRoomDataReceived}
        subscriptionCountryRooms={subscriptionCountryRooms}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
      />
      <Chat
        countryData={countryData}
        currentCountryRoom={currentCountryRoom}
        setCountryData={setCountryData}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
