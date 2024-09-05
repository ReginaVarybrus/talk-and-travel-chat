import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import ULRs from '@/redux-store/constants';
import logo from '@/images/logo.svg';
import ChatHeader from '@/components/ChatHeader/ChatHeader';
import MessageList from '@/components/MessageList/MessageList';
import MessageBar from '@/components/MessageBar/MessageBar';
import ChatFirstLoading from '@/components/ChatFirstLoading/ChatFirstLoading';
import {
  ChatStyled,
  MessageBlock,
  NoMassegesNotification,
  Logo,
} from './ChatStyled';

const Chat = ({
  chatData,
  setChatData,
  setSubscriptionRooms,
  isSubscribed,
  isShowJoinBtn,
  setIsShowJoinBtn,
  selectedCompanion,
  setSelectedCompanion,
}) => {
  const userId = useSelector(getUser)?.id;
  const { id, name, messages, usersCount, chatType } = chatData;
  const isPrivateChat = chatType === 'PRIVATE';

  const {
    subscribeToMessages,
    subscribeToUserErrors,
    unsubscribeFromMessages,
  } = useWebSocket();

  useEffect(() => {
    if (isSubscribed && id) {
      subscribeToMessages(ULRs.subscriptionToMessages(id), setChatData);
      if (!isPrivateChat && selectedCompanion) {
        setSelectedCompanion(null);
      }
      if (userId) {
        subscribeToUserErrors(
          ULRs.subscriptionToUserErrors(userId),
          setChatData
        );
      }
      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [id, isSubscribed, setChatData]);

  return (
    <ChatStyled>
      {!name && <ChatFirstLoading />}

      <ChatHeader
        chatName={name}
        participantsAmount={usersCount}
        selectedCompanion={selectedCompanion}
        isPrivateChat={isPrivateChat}
      />
      <MessageBlock>
        {messages?.length ? (
          <MessageList messages={messages} />
        ) : (
          <NoMassegesNotification>
            <Logo src={logo} alt="logo" width="200" height="160" />
            <p>There are no discussions yet. Be the first to start.</p>
          </NoMassegesNotification>
        )}
      </MessageBlock>
      <MessageBar
        chatId={id}
        chatData={chatData}
        setChatData={setChatData}
        setSubscriptionRooms={setSubscriptionRooms}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
      />
    </ChatStyled>
  );
};
export default Chat;
