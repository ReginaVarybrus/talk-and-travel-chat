import { useState, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
        chatId={id}
        participantsAmount={usersCount}
        selectedCompanion={selectedCompanion}
        isPrivateChat={isPrivateChat}
        isUserTyping={isUserTyping}
        userNameisTyping={userNameisTyping}
        isSubscribed={isSubscribed}
        setSubscriptionRooms={setSubscriptionRooms}
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
        setChatData={setChatData}
        setSubscriptionRooms={setSubscriptionRooms}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        isUserTyping={isUserTyping}
        setIsUserTyping={setIsUserTyping}
        isUserTyping={isUserTyping}
        setIsUserTyping={setIsUserTyping}
      />
    </ChatStyled>
  );
};

Chat.propTypes = {
  countryName: PropTypes.string,
  participantsAmount: PropTypes.number,
  countryChatId: PropTypes.number,
  groupMessages: PropTypes.array,
  country: PropTypes.shape({
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
  setCountryData: PropTypes.func,
  setSubscriptionCountryRooms: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isShowJoinBtn: PropTypes.bool,
  setIsShowJoinBtn: PropTypes.func,
};

export default Chat;
