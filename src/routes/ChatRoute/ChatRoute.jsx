import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [countryData, setCountryData] = useState({});
  const [subscriptionCountryRooms, setSubscriptionCountryRooms] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);

  return (
    <ChatRouteStyled>
      <SearchBar
        countryChatId={countryData?.id}
        setCountryData={setCountryData}
        subscriptionCountryRooms={subscriptionCountryRooms}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
      />
      <Chat
        countryName={countryData?.name}
        participantsAmount={countryData?.usersCount}
        countryChatId={countryData?.id}
        groupMessages={countryData.messages}
        country={countryData}
        setCountryData={setCountryData}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
