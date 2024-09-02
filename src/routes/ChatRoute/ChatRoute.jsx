import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { useChatType } from '@/providers/ChatTypeProvider.jsx';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants.js';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const chatType = useChatType();
  // const [selectedChat, setSelectedChat] = useState(null);
  // const [chatMessages, setChatMessages] = useState([]);
  // const [countryData, setCountryData] = useState({});
  // const [subscriptionCountryRooms, setSubscriptionCountryRooms] = useState([]);
  // const [isSubscribed, setIsSubscribed] = useState(false);
  // const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);

  // const isGroupChatSelected = chatType === 'rooms';
  // const isPrivateChatSelected = chatType === 'dms';
  const [chatData, setChatData] = useState({});
  const [subscriptionCountryRooms, setSubscriptionCountryRooms] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);

  // const handleSelectChat = (chat, type) => {
  //   setSelectedChat({
  //     ...chat,
  //     chatType: type,
  //   });
  //   setChatMessages([]);
  // };
  // const groupMessagesFetch = useFetch(
  //   isGroupChatSelected
  //     ? ULRs.getMainCountryChatByName(selectedChat?.name, '')
  //     : null
  // );

  // const privateMessagesFetch = useFetch(
  //   isPrivateChatSelected
  //     ? ULRs.getChatsMessages(
  //         selectedChat?.id,
  //         '?page=0&size=10&sort=creationDate,desc'
  //       )
  //     : null
  // );

  // useEffect(() => {
  //   if (selectedChat) {
  //     if (isGroupChatSelected && groupMessagesFetch.responseData) {
  //       setChatMessages(groupMessagesFetch.responseData.content);
  //     } else if (isPrivateChatSelected && privateMessagesFetch.responseData) {
  //       setChatMessages(privateMessagesFetch.responseData.content);
  //     }
  //   }
  // }, [
  //   selectedChat,
  //   isGroupChatSelected,
  //   isPrivateChatSelected,
  //   groupMessagesFetch.responseData,
  //   privateMessagesFetch.responseData,
  // ]);
  // // console.log('selectedChat', selectedChat);
  return (
    <ChatRouteStyled>
      <SearchBar
        chatId={chatData?.id}
        setChatData={setChatData}
        subscriptionRooms={subscriptionCountryRooms}
        setSubscriptionRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
      />

      <Chat
        chatName={chatData?.name}
        participantsAmount={chatData?.usersCount}
        chatId={chatData?.id}
        messages={chatData.messages}
        chatData={chatData}
        setChatData={setChatData}
        setSubscriptionRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        isPrivateChat={chatType === 'dms'}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
