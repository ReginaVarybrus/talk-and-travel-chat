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
  chatName,
  participantsAmount,
  chatId,
  messages,
  chatData,
  setChatData,
  setSubscriptionRooms,
  isSubscribed,
  isShowJoinBtn,
  setIsShowJoinBtn,
  isPrivateChat,
}) => {
  const userId = useSelector(getUser)?.id;
  const { subscribeToGroupMessages, subscribeToUserErrors } = useWebSocket();

  useEffect(() => {
    if (isSubscribed && chatId) {
      if (!isPrivateChat) {
        subscribeToGroupMessages(
          ULRs.subscriptionToGroupMessages(chatId),
          setChatData
        );
      }

      subscribeToUserErrors(ULRs.subscriptionToUserErrors(userId), setChatData);
    }
  }, [chatId, isSubscribed, isPrivateChat]);

  return (
    <ChatStyled>
      {!chatName && !isPrivateChat && <ChatFirstLoading />}

      <ChatHeader
        chatName={chatName}
        participantsAmount={participantsAmount}
        chatId={chatId}
        setChatData={setChatData}
        isSubscribed={isSubscribed}
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
        chatId={chatId}
        chatData={chatData}
        setChatData={setChatData}
        setSubscriptionRooms={setSubscriptionRooms}
        isShowJoinBtn={isShowJoinBtn && !isPrivateChat}
        setIsShowJoinBtn={setIsShowJoinBtn}
      />
    </ChatStyled>
  );
};
export default Chat;
