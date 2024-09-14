import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';

import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [countryData, setCountryData] = useState({});
  const [subscriptionCountryRooms, setSubscriptionCountryRooms] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const userId = useSelector(getUser)?.id;
  const { responseData: dataUserCountries } = useFetch(
    ULRs.userCountries(userId, '')
  );

  useEffect(() => {
    if (dataUserCountries) {
      setSubscriptionCountryRooms(dataUserCountries);
    }
  }, [dataUserCountries]);

  return (
    <ChatRouteStyled>
      <SearchBar
        setCountryData={setCountryData}
        subscriptionCountryRooms={subscriptionCountryRooms}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
        isChatVisible={isChatVisible}
        setIsChatVisible={setIsChatVisible}
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
        isChatVisible={isChatVisible}
        setIsChatVisible={setIsChatVisible}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
