import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { axiosClient } from '@/services/api';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { CHAT_TYPES } from '@/constants/chatTypes';
import { MESSAGE_TYPES } from '@/constants/messageTypes';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import ULRs from '@/redux-store/constants';
import logo from '@/images/logo.svg';
import ChatHeader from '@/components/ChatHeader/ChatHeader';
import MessageList from '@/components/MessageList/MessageList';
import MessageBar from '@/components/MessageBar/MessageBar';
import ChatFirstLoading from '@/components/ChatFirstLoading/ChatFirstLoading';
import Loader from '@/components/Loader/Loader';
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
  setIsSubscribed,
  isShowJoinBtn,
  setIsShowJoinBtn,
  selectedCompanion,
  setSelectedCompanion,
  participantsAmount,
  setParticipantsAmount,
}) => {
  const userId = useSelector(getUser)?.id;
  const { id, name, chatType, country } = chatData;
  const isPrivateChat = chatType === CHAT_TYPES.PRIVATE;
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [userNameisTyping, setUserNameisTyping] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [unreadPage, setUnreadPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreUnread, setHasMoreUnread] = useState(true);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [lastReadMessageId, setLastReadMessageId] = useState(null);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [showNewMessagesIndicator, setShowNewMessagesIndicator] =
    useState(false);

  const previousChatIdRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageBlockRef = useRef(null);
  const isFetching = useRef(false);

  const {
    subscribeToMessages,
    subscribeToUserErrors,
    unsubscribeFromMessages,
  } = useWebSocket();

  const context = useOutletContext();
  const isChatVisible = context?.isChatVisible;
  const setIsChatVisible = context?.setIsChatVisible;

  const markAsRead = async chatId => {
    try {
      if (messages.length > 0) {
        const lastMessageId = messages[messages.length - 1]?.id;
        if (lastMessageId) {
          await axiosClient.patch(`/chats/${chatId}/messages/last-read`, {
            lastReadMessageId: lastMessageId,
          });
        }
      }
    } catch (error) {
      console.error('Error updating last read message:', error);
    }
  };

  const fetchPublicMessages = async (pageNumber = 0) => {
    setIsFetchingMore(true);
    try {
      const response = await axiosClient.get(`/chats/${id}/messages`, {
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
    } finally {
      setIsFetchingMore(false);
    }
  };

  const fetchMessages = async (pageNumber = 0) => {
    setIsFetchingMore(true);
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
    } finally {
      setIsFetchingMore(false);
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
        setMessages(prevMessages => [...unreadMessagesPage, ...prevMessages]);
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
      if (!isShowJoinBtn) {
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
      } else {
        await fetchPublicMessages();
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      isFetching.current = false;
    }
  };

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
        markAsRead(currentChatId);
      }
      fetchChatMessages();

      previousChatIdRef.current = id;
    }
    return () => {
      didUnmount = true;
      if (previousChatIdRef.current && lastReadMessageId && !didUnmount) {
        markAsRead(previousChatIdRef.current);
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

        if (newMessage.type === MESSAGE_TYPES.TEXT) {
          setShowNewMessagesIndicator(true);
        }
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

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (
      isNewMessage &&
      messages[messages.length - 1].type === MESSAGE_TYPES.TEXT
    ) {
      scrollToBottom();
      setIsNewMessage(false);
    }
  }, [isNewMessage, messages]);

  const handleScroll = e => {
    const { scrollHeight, clientHeight, scrollTop } = e.target;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
    const atTop = scrollTop === 0;

    if (atBottom && unreadMessages.length > 0) {
      setUnreadMessages([]);
      setShowNewMessagesIndicator(false);
    }

    if (!isShowJoinBtn) {
      if (atTop && hasMore && !isFetching.current) {
        const currentScrollHeight = e.target.scrollHeight;
        fetchMessages(page).then(() => {
          e.target.scrollTop = e.target.scrollHeight - currentScrollHeight;
        });
      }
    } else if (atTop && hasMore && !isFetching.current) {
      const currentScrollHeight = e.target.scrollHeight;
      fetchPublicMessages(page).then(() => {
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
        {isFetchingMore && <Loader size={50} />}
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
          <button
            type="button"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
          >
            <IoIosArrowDown />
          </button>
          <span>
            {unreadMessages.length > 0 && unreadMessages.length} new messages
          </span>
          <div className="divider" />

          <button
            type="button"
            onClick={() => setShowNewMessagesIndicator(false)}
            aria-label="Close notification"
          >
            <IoClose />
          </button>
        </NewMessagesNotification>
      )}
      <MessageBar
        chatId={id}
        chatData={chatData}
        setSubscriptionRooms={setSubscriptionRooms}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setIsSubscribed={setIsSubscribed}
        isUserTyping={isUserTyping}
        setIsUserTyping={setIsUserTyping}
        setParticipantsAmount={setParticipantsAmount}
        scrollToBottom={scrollToBottom}
        setShowNewMessagesIndicator={setShowNewMessagesIndicator}
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
