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
import { axiosClient } from '@/services/api';
import MessageBar from '@/components/MessageBar/MessageBar';
import ChatFirstLoading from '@/components/ChatFirstLoading/ChatFirstLoading';
import {
  ChatStyled,
  MessageBlock,
  NoMassegesNotification,
  Logo,
  NewMessagesNotification,
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
  participantsAmount,
  setParticipantsAmount,
}) => {
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [userNameisTyping, setUserNameisTyping] = useState('');
  const userId = useSelector(getUser)?.id;
  const { id, name, chatType, country } = chatData;
  const isPrivateChat = chatType === CHAT_TYPES.PRIVATE;
  const [lastReadMessageId, setLastReadMessageId] = useState(null);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [showNewMessagesIndicator, setShowNewMessagesIndicator] =
    useState(false);

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [unreadPage, setUnreadPage] = useState(0);

  const [hasMore, setHasMore] = useState(true);
  const [hasMoreUnread, setHasMoreUnread] = useState(true);
  const [isNewMessage, setIsNewMessage] = useState(false);

  const previousChatIdRef = useRef(null);
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

  const markAsRead = async (chatId, readMessageId) => {
    try {
      await axiosClient.patch(`/chats/${chatId}/messages/last-read`, {
        lastReadMessageId: readMessageId,
      });
      // console.log('Last read message id:', readMessageId);
      // console.log('Last read message chatid:', chatId);
    } catch (error) {
      console.error('Error updating last read message:', error);
    }
  };
  const isFetching = useRef(false);
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
      return content;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  const fetchUnreadMessages = async (pageNumber = 0) => {
    try {
      const response = await axiosClient.get(`/chats/${id}/messages/unread`, {
        params: {
          size: 1000,
          page: pageNumber,
          sort: 'creationDate,desc',
        },
      });
      const unreadMessagesPage = response.data.content;

      if (unreadMessagesPage.length > 0) {
        setUnreadMessages(prevMessages => [
          ...prevMessages,
          ...unreadMessagesPage,
        ]);
        setHasUnreadMessages(true);
        setShowNewMessagesIndicator(true);
      }
      const { totalPages } = response.data.page;
      setHasMoreUnread(pageNumber + 1 < totalPages);
      return unreadMessagesPage;
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    }
  };

  const fetchChatMessages = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const readMessages = await fetchMessages();
      const fetchedUnreadMessages = await fetchUnreadMessages();

      const allMessages = [...fetchedUnreadMessages, ...readMessages].sort(
        (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
      );
      setMessages(allMessages);

      if (allMessages.length > 0) {
        const lastMessageId = allMessages[allMessages.length - 1]?.id;
        if (lastMessageId) {
          setLastReadMessageId(lastMessageId);
        }
      }
      if (fetchedUnreadMessages.length > 0) {
        setUnreadMessages(fetchedUnreadMessages);
        setShowNewMessagesIndicator(true);
      }

      // isFetching.current = false;
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      isFetching.current = false;
    }
  };
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  useEffect(() => {
    let didUnmount = false;

    if (id) {
      const currentChatId = previousChatIdRef.current;

      setHasScrolledToEnd(false);
      setMessages([]);
      setUnreadMessages([]);
      setPage(0);
      setUnreadPage(0);
      setHasUnreadMessages(false);
      setShowNewMessagesIndicator(false);

      if (
        currentChatId &&
        lastReadMessageId &&
        currentChatId !== id &&
        !didUnmount
      ) {
        markAsRead(currentChatId, lastReadMessageId);
      }
      fetchChatMessages();

      previousChatIdRef.current = id;
    }
    return () => {
      didUnmount = true;
      if (previousChatIdRef.current && lastReadMessageId && !didUnmount) {
        markAsRead(previousChatIdRef.current, lastReadMessageId);
      }
    };
  }, [id]);

  useEffect(() => {
    if (messagesEndRef.current && page === 1 && !hasScrolledToEnd) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setHasScrolledToEnd(true);
    }
  }, [messages, page, hasScrolledToEnd]);

  useEffect(() => {
    if (isSubscribed && id) {
      subscribeToMessages(ULRs.subscriptionToMessages(id), newMessage => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
        // setShowNewMessagesIndicator(true);
        setIsNewMessage(true);
      });

      if (!isPrivateChat && selectedCompanion) {
        setSelectedCompanion(null);
      }

      subscribeToUserErrors(ULRs.subscriptionToUserErrors(userId), setChatData);

      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [id, isSubscribed, setChatData]);

  // useEffect(() => {
  //   if (hasUnreadMessages) {
  //     setMessages(prevMessages => [...prevMessages, ...unreadMessages]);
  //     setHasUnreadMessages(false);
  //     setShowNewMessagesIndicator(false);
  //   }
  // }, [hasUnreadMessages, unreadMessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isNewMessage) {
      scrollToBottom();
      setIsNewMessage(false); // Сбрасываем флаг после прокрутки
    }
  }, [messages, isNewMessage]);

  const handleScroll = e => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;

    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
    const atTop = scrollTop === 0;

    // if (atBottom && hasMoreUnread && !isFetching.current) {
    //   fetchUnreadMessages(unreadPage).then(newUnreadMessages => {
    //     setMessages(prevMessages => [...prevMessages, ...newUnreadMessages]);
    //     setUnreadPage(prevPage => prevPage + 1);
    //   });
    // }
    // console.log('unreadMessages', unreadMessages.length);

    if (atBottom && unreadMessages.length > 0) {
      setUnreadMessages([]);
      setShowNewMessagesIndicator(false);
    }
    if (atTop && hasMore && !isFetching.current) {
      const currentScrollHeight = e.target.scrollHeight;
      fetchMessages(page).then(() => {
        e.target.scrollTop = e.target.scrollHeight - currentScrollHeight;
      });
    }
    if (atBottom) {
      setShowNewMessagesIndicator(false);
    }
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
      {showNewMessagesIndicator && (
        <NewMessagesNotification>
          <span>{unreadMessages.length} new messages</span>
        </NewMessagesNotification>
      )}
      <MessageBar
        chatId={id}
        chatData={chatData}
        setSubscriptionRooms={setSubscriptionRooms}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        isUserTyping={isUserTyping}
        setIsUserTyping={setIsUserTyping}
        setParticipantsAmount={setParticipantsAmount}
        scrollToBottom={scrollToBottom}
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
