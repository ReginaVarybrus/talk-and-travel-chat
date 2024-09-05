import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [chatData, setChatData] = useState({});
  const [subscriptionCountryRooms, setSubscriptionCountryRooms] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState(null);

  return (
    <ChatRouteStyled>
      <SearchBar
        chatId={chatData?.chatId}
        setChatData={setChatData}
        subscriptionRooms={subscriptionCountryRooms}
        setSubscriptionRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
        selectedCompanion={selectedCompanion}
        setSelectedCompanion={setSelectedCompanion}
      />

      <Chat
        chatData={chatData}
        setChatData={setChatData}
        setSubscriptionRooms={setSubscriptionCountryRooms}
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
