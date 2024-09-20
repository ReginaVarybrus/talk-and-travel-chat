import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CHAT_TYPES } from '@/constants/chatTypes';
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
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [userNameisTyping, setUserNameisTyping] = useState('');
  const userId = useSelector(getUser)?.id;
  const { id, name, messages, usersCount, chatType, country } = chatData;
  const isPrivateChat = chatType === CHAT_TYPES.PRIVATE;

  const {
    subscribeToMessages,
    subscribeToUserErrors,
    unsubscribeFromMessages,
  } = useWebSocket();

  const context = useOutletContext();
  const isChatVisible = context?.isChatVisible;
  const setIsChatVisible = context?.setIsChatVisible;

  useEffect(() => {
    if (isSubscribed && id) {
      subscribeToMessages(ULRs.subscriptionToMessages(id), setChatData);
      if (!isPrivateChat && selectedCompanion) {
        setSelectedCompanion(null);
      }

      subscribeToUserErrors(ULRs.subscriptionToUserErrors(userId), setChatData);

      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [id, isSubscribed, setChatData]);

  return (
    <ChatStyled $isChatVisible={isChatVisible}>
      {!name && <ChatFirstLoading />}
      <ChatHeader
        chatName={name}
        participantsAmount={usersCount}
        flagCode={country?.flagCode}
        selectedCompanion={selectedCompanion}
        isPrivateChat={isPrivateChat}
        isUserTyping={isUserTyping}
        userNameisTyping={userNameisTyping}
        chatId={id}
        setSubscriptionRooms={setSubscriptionRooms}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setIsChatVisible={setIsChatVisible}
      />
      <MessageBlock>
        {messages?.length ? (
          <MessageList
            messages={messages}
            setIsUserTyping={setIsUserTyping}
            setUserNameisTyping={setUserNameisTyping}
          />
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
        setSubscriptionRooms={setSubscriptionRooms}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        isUserTyping={isUserTyping}
        setIsUserTyping={setIsUserTyping}
      />
    </ChatStyled>
  );
};

Chat.propTypes = {
  chatData: PropTypes.shape({
    chatType: PropTypes.oneOf(['GROUP', 'PRIVATE']),
    country: PropTypes.shape({
      flagCode: PropTypes.string,
      name: PropTypes.string,
    }),
    creationDate: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    messages: PropTypes.array,
    name: PropTypes.string,
    usersCount: PropTypes.number,
  }),
  setChatData: PropTypes.func,
  setSubscriptionRooms: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isShowJoinBtn: PropTypes.bool,
  setIsShowJoinBtn: PropTypes.func,
  selectedCompanion: PropTypes.shape({
    id: PropTypes.number,
    userName: PropTypes.string,
    userEmail: PropTypes.string,
  }),
  setSelectedCompanion: PropTypes.func,
};

export default Chat;
