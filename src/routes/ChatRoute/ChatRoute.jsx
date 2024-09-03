import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
// import { useChatType } from '@/providers/ChatTypeProvider.jsx';
// import { useFetch } from '@/hooks/useFetch.js';
// import ULRs from '@/redux-store/constants.js';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = ({ chatType }) => {
  const [chatData, setChatData] = useState({});
  const [subscriptionCountryRooms, setSubscriptionCountryRooms] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);

  // useEffect(() => {
  //   console.log('chatType after useEffect:', chatType);
  // }, [chatType]);
  // console.log(chatData);
  return (
    <ChatRouteStyled key={chatType}>
      <SearchBar
        chatId={chatData?.chatId}
        setChatData={setChatData}
        subscriptionRooms={subscriptionCountryRooms}
        setSubscriptionRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
      />

      <Chat
        // chatName={chatData?.chatName}
        // participantsAmount={chatData?.usersCount}
        // chatId={chatData?.chatId}
        // messages={chatData.messages}
        chatData={chatData}
        setChatData={setChatData}
        setSubscriptionRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        isPrivateChat={chatType === 'dms'}
        chatType={chatType}
        key={chatType}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
