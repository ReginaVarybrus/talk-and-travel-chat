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
  isPrivateChat,
}) => {
  const userId = useSelector(getUser)?.id;
  const { subscribeToGroupMessages, subscribeToUserErrors } = useWebSocket();
  console.log('chatData', chatData);
  const { id, name, messages, usersCount } = chatData;

  useEffect(() => {
    if (isSubscribed && id) {
      if (!isPrivateChat) {
        subscribeToGroupMessages(
          ULRs.subscriptionToGroupMessages(id),
          setChatData
        );
      }

      subscribeToUserErrors(ULRs.subscriptionToUserErrors(userId), setChatData);
    }
  }, [id, isSubscribed, isPrivateChat]);

  return (
    <ChatStyled>
      {!name && <ChatFirstLoading />}

      <ChatHeader
        chatName={name}
        participantsAmount={usersCount}
        chatId={id}
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
