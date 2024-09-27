import { useState, useEffect, useRef } from 'react';
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
import { axiosClient } from '@/services/api';

const Chat = ({
  chatData,
  setChatData,
  setSubscriptionRooms,
  isSubscribed,
  isShowJoinBtn,
  setIsShowJoinBtn,
  selectedCompanion,
  setSelectedCompanion,
  participantsAmount,
  setParticipantsAmount,
}) => {
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [userNameisTyping, setUserNameisTyping] = useState('');
  const userId = useSelector(getUser)?.id;
  const { id, name, chatType, country } = chatData;
  const isPrivateChat = chatType === CHAT_TYPES.PRIVATE;
  const [lastReadMessageId, setLastReadMessageId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  const messageBlockRef = useRef(null);

  const {
    subscribeToMessages,
    subscribeToUserErrors,
    unsubscribeFromMessages,
  } = useWebSocket();

  const context = useOutletContext();
  const isChatVisible = context?.isChatVisible;
  const setIsChatVisible = context?.setIsChatVisible;

  const fetchMessages = async (pageNumber = 0) => {
    try {
      const response = await axiosClient.get(`/chats/${id}/messages/read`, {
        params: {
          size: 20,
          page: pageNumber,
          sort: 'creationDate,desc',
        },
      });

      const { content, page: pageData } = response.data;

      setMessages(prevMessages => [...content, ...prevMessages]);
      setPage(pageData.number + 1);
      setHasMore(pageData.number + 1 < pageData.totalPages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (id) {
      setMessages([]);
      setPage(0);
      fetchMessages();
    }
  }, [id]);

  useEffect(() => {
    if (messagesEndRef.current && page === 1) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isSubscribed && id) {
      setMessages([]);
      setPage(0);
      subscribeToMessages(ULRs.subscriptionToMessages(id), setMessages);
      if (!isPrivateChat && selectedCompanion) {
        setSelectedCompanion(null);
      }

      subscribeToUserErrors(ULRs.subscriptionToUserErrors(userId), setChatData);

      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [id, isSubscribed, setChatData]);

  const markAsRead = async (chatId, lastReadMessageId) => {
    try {
      const response = await axiosClient.patch(
        `/chats/${chatId}/messages/last-read`,
        {
          lastReadMessageId,
        }
      );
      console.log('Last read message updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating last read message:', error);
    }
  };

  const handleScroll = e => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;

    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (atBottom) {
      const lastMessageId = messages[messages.length - 1]?.id;
      if (lastMessageId && lastMessageId !== lastReadMessageId) {
        markAsRead(id, lastMessageId);
        setLastReadMessageId(lastMessageId);
      }
    }

    const atTop = scrollTop === 0;
    if (atTop && hasMore) {
      const currentScrollHeight = e.target.scrollHeight;
      fetchMessages(page).then(() => {
        e.target.scrollTop = e.target.scrollHeight - currentScrollHeight;
      });
    }
    // const top = e.target.scrollTop === 0;

    // if (top && hasMore) {
    //   const currentScrollHeight = e.target.scrollHeight;
    //   fetchMessages(page).then(() => {
    //     e.target.scrollTop = e.target.scrollHeight - currentScrollHeight;
    //   });
    // }
  };

  return (
    <ChatStyled $isChatVisible={isChatVisible}>
      {!name && <ChatFirstLoading />}
      <ChatHeader
        chatName={name}
        participantsAmount={participantsAmount}
        setParticipantsAmount={setParticipantsAmount}
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
      <MessageBlock onScroll={handleScroll} ref={messageBlockRef}>
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
        <div ref={messagesEndRef} />
      </MessageBlock>
      <MessageBar
        chatId={id}
        chatData={chatData}
        setSubscriptionRooms={setSubscriptionRooms}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        isUserTyping={isUserTyping}
        setIsUserTyping={setIsUserTyping}
        setParticipantsAmount={setParticipantsAmount}
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
  participantsAmount: PropTypes.number,
  setParticipantsAmount: PropTypes.func,
};

export default Chat;
