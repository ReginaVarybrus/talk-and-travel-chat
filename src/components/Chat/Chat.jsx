import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import debounce from 'lodash/debounce';
import { axiosClient } from '@/services/api';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';
import URLs from '@/constants/constants';
import { CHAT_TYPES } from '@/constants/chatTypes';
import { MESSAGE_TYPES } from '@/constants/messageTypes';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
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
  isShowJoinBtn,
  setIsShowJoinBtn,
  selectedCompanion,
  setSelectedCompanion,
  participantsAmount,
  setParticipantsAmount,
  listOfOnlineUsersStatuses,
  isChatVisible,
  setIsChatVisible,
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
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [showNewMessagesIndicator, setShowNewMessagesIndicator] =
    useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  const messagesEndRef = useRef(null);
  const messageBlockRef = useRef(null);
  const isFetching = useRef(false);
  const unreadMessageRef = useRef(null);
  const isFetchingRead = useRef(false);
  const isFetchingUnread = useRef(false);

  const {
    subscribeToMessages,
    subscribeToUserErrors,
    unsubscribeFromMessages,
  } = useWebSocket();

  const markAsRead = async messageId => {
    try {
      await axiosClient.patch(URLs.lastReadMessage(id), {
        lastReadMessageId: messageId,
      });
    } catch (error) {
      console.error('Error updating last read message:', error);
    }
  };

  const fetchPublicMessages = async (pageNumber = 0) => {
    setIsFetchingMore(true);
    try {
      const response = await axiosClient.get(URLs.getMessages(id), {
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
      console.error('Error fetching messages:', error.message);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const fetchReadMessages = async (pageNumber = 0) => {
    if (isFetchingRead.current) return;
    isFetchingRead.current = true;
    setIsFetchingMore(true);
    try {
      const response = await axiosClient.get(URLs.getReadMessages(id), {
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
      isFetchingRead.current = false;
    }
  };

  const fetchUnreadMessages = async (pageNumber = 0) => {
    if (isFetchingUnread.current) return;
    isFetchingUnread.current = true;
    try {
      const response = await axiosClient.get(URLs.getUnreadMessages(id), {
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

        setShowNewMessagesIndicator(true);
      }
      const { totalPages } = response.data.page;
      setHasMoreUnread(pageNumber + 1 < totalPages);
      return unreadMessagesPage;
    } catch (error) {
      console.error('Error fetching unread messages:', error.message);
    } finally {
      isFetchingUnread.current = false;
    }
  };

  const fetchChatMessages = async () => {
    if (isFetchingRead.current || isFetchingUnread.current) return;

    try {
      if (!isShowJoinBtn) {
        const readMessages = await fetchReadMessages();
        const fetchedUnreadMessages = await fetchUnreadMessages();
        const allMessages = [...fetchedUnreadMessages, ...readMessages].sort(
          (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
        );
        setMessages(allMessages);

        if (fetchedUnreadMessages.length > 0) {
          setUnreadMessages(fetchedUnreadMessages);
          setShowNewMessagesIndicator(true);
          setUnreadCount(fetchUnreadMessages.length);
        }
      } else {
        await fetchPublicMessages();
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  useEffect(() => {
    if (unreadMessages.length > 0) {
      setUnreadCount(unreadMessages.length);
      setShowNewMessagesIndicator(true);
    } else {
      setShowNewMessagesIndicator(false);
    }
  }, [unreadMessages]);

  useEffect(() => {
    if (id) {
      setHasScrolledToEnd(false);
      setMessages([]);
      setUnreadMessages([]);
      setPage(0);
      setUnreadPage(0);
      setShowNewMessagesIndicator(false);
      fetchChatMessages();
    }
  }, [id]);

  const scrollToBottom = () => {
    if (messageBlockRef.current) {
      setIsAutoScrolling(true);
      messageBlockRef.current.scrollTo({
        top: messageBlockRef.current.scrollHeight,
        behavior: 'smooth',
      });
      setTimeout(() => {
        setIsAutoScrolling(false);
      }, 300);
    }
  };
  useEffect(() => {
    if (messages.length > 0 && !hasScrolledToEnd) {
      scrollToBottom();
      setHasScrolledToEnd(true);
    }
  }, [messages, hasScrolledToEnd]);

  useEffect(() => {
    if (isSubscribed && id) {
      subscribeToMessages(URLs.subscriptionToMessages(id), newMessage => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
        if (newMessage.user.id !== userId) {
          setShowNewMessagesIndicator(false);
        }
        if (newMessage.type === MESSAGE_TYPES.TEXT && messageBlockRef.current) {
          const isAtBottom =
            messageBlockRef.current.scrollTop +
              messageBlockRef.current.clientHeight >=
            messageBlockRef.current.scrollHeight - 10;

          if (isAtBottom) {
            setTimeout(() => {
              scrollToBottom();
            }, 100);
            markAsRead(newMessage.id);
          } else {
            setUnreadMessages(prev => [...prev, newMessage]);
            setShowNewMessagesIndicator(true);
          }
        }
      });

      if (!isPrivateChat && selectedCompanion) {
        setSelectedCompanion(null);
      }

      subscribeToUserErrors(URLs.subscriptionToUserErrors(userId), setChatData);

      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [id, isSubscribed, setChatData]);

  const handleScroll = debounce(e => {
    const { scrollHeight, clientHeight, scrollTop } = e.target;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
    const nearTop = scrollTop < 200;

    if (isFetching.current) return;
    if (isAutoScrolling) return;

    if (atBottom && unreadMessages.length > 0) {
      setUnreadMessages([]);
      setShowNewMessagesIndicator(false);
    }

    if (!isShowJoinBtn) {
      if (nearTop && hasMore && !isFetching.current) {
        isFetching.current = true;
        const currentScrollHeight = e.target.scrollHeight;

        fetchReadMessages(page)
          .then(() => {
            e.target.scrollTop = e.target.scrollHeight - currentScrollHeight;
          })
          .finally(() => {
            isFetching.current = false;
          });
      }
    } else if (nearTop && hasMore && !isFetching.current) {
      isFetching.current = true;

      const currentScrollHeight = e.target.scrollHeight;

      fetchPublicMessages(page)
        .then(() => {
          e.target.scrollTop = e.target.scrollHeight - currentScrollHeight;
        })
        .finally(() => {
          isFetching.current = false;
        });
    }

    if (atBottom) {
      setShowNewMessagesIndicator(false);
    }
  }, 300);

  useEffect(() => {
    if (id && unreadMessages.length > 0) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const visibleMessageId = parseInt(
                entry.target.dataset.messageId,
                10
              );
              if (unreadMessages.some(msg => msg.id === visibleMessageId)) {
                markAsRead(visibleMessageId);
                setUnreadCount(prev => Math.max(prev - 1, 0));
                setUnreadMessages(prevUnread =>
                  prevUnread.filter(msg => msg.id !== visibleMessageId)
                );
              }
            }
          });
        },
        {
          root: messageBlockRef.current,
          threshold: 1,
        }
      );

      unreadMessages.forEach(message => {
        const messageElement = document.querySelector(
          `[data-message-id='${message.id}']`
        );

        if (messageElement) {
          observer.observe(messageElement);
        }
      });

      return () => {
        unreadMessages.forEach(message => {
          const messageElement = document.querySelector(
            `[data-message-id='${message.id}']`
          );
          if (messageElement) {
            observer.unobserve(messageElement);
          }
        });
      };
    }
  }, [id, unreadMessages]);
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
        listOfOnlineUsersStatuses={listOfOnlineUsersStatuses}
      />
      <MessageBlock ref={messageBlockRef} onScroll={handleScroll}>
        {isFetchingMore && <Loader size={50} />}
        {messages?.length ? (
          <MessageList
            messages={messages}
            setIsUserTyping={setIsUserTyping}
            setUserNameisTyping={setUserNameisTyping}
            listOfOnlineUsersStatuses={listOfOnlineUsersStatuses}
            lastReadMessageRef={unreadMessageRef}
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
          <span>{unreadCount} new messages</span>
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
  isChatVisible: PropTypes.bool,
  setIsChatVisible: PropTypes.func,
};

export default Chat;
