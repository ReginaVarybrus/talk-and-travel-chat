import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [chatData, setChatData] = useState({});
  const [subscriptionRooms, setSubscriptionRooms] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const { responseData } = useFetch(ULRs.userCountries);

  useEffect(() => {
    if (responseData) {
      setSubscriptionRooms(responseData);
    }
  }, [responseData]);

  return (
    <ChatRouteStyled>
      <SearchBar
        setChatData={setChatData}
        subscriptionRooms={subscriptionRooms}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setSelectedCompanion={setSelectedCompanion}
      />

      <Chat
        chatData={chatData}
        setChatData={setChatData}
        setSubscriptionRooms={setSubscriptionRooms}
        isSubscribed={isSubscribed}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        selectedCompanion={selectedCompanion}
        setSelectedCompanion={setSelectedCompanion}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
