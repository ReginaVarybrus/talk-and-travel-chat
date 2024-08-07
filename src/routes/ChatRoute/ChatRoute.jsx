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
        onCountryRoomDataReceived={onCountryRoomDataReceived}
        subscriptionCountryRooms={subscriptionCountryRooms}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
      />
      <Chat
        countryName={countryData?.country?.name}
        participantsAmount={countryData?.country?.participantsAmount}
        groupMessages={countryData?.country?.groupMessages}
        country={countryData?.country}
        isSubscribed={countryData?.isSubscribed}
        setCountryData={setCountryData}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
