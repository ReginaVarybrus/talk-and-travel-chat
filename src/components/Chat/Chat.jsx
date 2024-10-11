import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { axiosClient } from '@/services/api';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';
import ULRs from '@/constants/constants';
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
  setIsSubscribed,
  isShowJoinBtn,
  setIsShowJoinBtn,
  selectedCompanion,
  setSelectedCompanion,
  participantsAmount,
  setParticipantsAmount,
  listOfOnlineUsers,
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

  const messagesEndRef = useRef(null);
  const messageBlockRef = useRef(null);
  const isFetching = useRef(false);
  const unreadMessageRef = useRef(null);
  const topMessageRef = useRef(null);
  const isFetchingRead = useRef(false);
  const isFetchingUnread = useRef(false);

  const {
    subscribeToMessages,
    subscribeToUserErrors,
    unsubscribeFromMessages,
  } = useWebSocket();

  const context = useOutletContext();
  const isChatVisible = context?.isChatVisible;
  const setIsChatVisible = context?.setIsChatVisible;

  const markAsRead = async messageId => {
    try {
      await axiosClient.patch(ULRs.lastReadMessage(id), {
        lastReadMessageId: messageId,
      });
    } catch (error) {
      console.error('Error updating last read message:', error);
    }
  };

  const fetchPublicMessages = async (pageNumber = 0) => {
    setIsFetchingMore(true);
    try {
      const response = await axiosClient.get(ULRs.getMessages(id), {
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
      const response = await axiosClient.get(ULRs.getReadMessages(id), {
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
      const response = await axiosClient.get(ULRs.getUnreadMessages(id), {
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
        const [readMessages, fetchedUnreadMessages] = await Promise.all([
          fetchReadMessages(),
          fetchUnreadMessages(),
        ]);
        console.log('Read messages:', readMessages);
        console.log('Unread messages:', fetchedUnreadMessages);
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
      messageBlockRef.current.scrollTo({
        top: messageBlockRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

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

      subscribeToUserErrors(ULRs.subscriptionToUserErrors(userId), setChatData);

      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [id, isSubscribed, setChatData]);

  // const handleScroll = e => {
  //   const { scrollHeight, clientHeight, scrollTop } = e.target;
  //   const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
  //   const atTop = scrollTop === 0;

  //   const nearTop = scrollTop < 300;

  //   if (atBottom && unreadMessages.length > 0) {
  //     setUnreadMessages([]);
  //     setShowNewMessagesIndicator(false);
  //   }

  //   if (!isShowJoinBtn) {
  //     if (nearTop && hasMore && !isFetching.current) {
  //       const currentScrollHeight = e.target.scrollHeight;
  //       fetchReadMessages(page).then(() => {
  //         e.target.scrollTop = e.target.scrollHeight - currentScrollHeight;
  //       });
  //     }
  //   } else if (nearTop && hasMore && !isFetching.current) {
  //     const currentScrollHeight = e.target.scrollHeight;
  //     fetchPublicMessages(page).then(() => {
  //       e.target.scrollTop = e.target.scrollHeight - currentScrollHeight;
  //     });
  //   }

  //   if (atBottom) {
  //     setShowNewMessagesIndicator(false);
  //   }
  // };

  useEffect(() => {
    if (!hasMore || !messages.length) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isFetching.current) {
          const currentScrollHeight = messageBlockRef.current.scrollHeight;
          fetchReadMessages(page).then(() => {
            messageBlockRef.current.scrollTop =
              messageBlockRef.current.scrollHeight - currentScrollHeight;
          });
        }
      },
      { root: messageBlockRef.current, threshold: 0.5 }
    );

    if (topMessageRef.current) {
      observer.observe(topMessageRef.current);
    }

    return () => {
      if (topMessageRef.current) {
        observer.unobserve(topMessageRef.current);
      }
    };
  }, [topMessageRef.current, hasMore, page, messages]);

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
        listOfOnlineUsers={listOfOnlineUsers}
      />
      <MessageBlock ref={messageBlockRef}>
        {isFetchingMore && <Loader size={50} />}
        {messages?.length ? (
          <MessageList
            messages={messages}
            setIsUserTyping={setIsUserTyping}
            userNameisTyping={userNameisTyping}
            setUserNameisTyping={setUserNameisTyping}
            listOfOnlineUsers={listOfOnlineUsers}
            lastReadMessageRef={unreadMessageRef}
            topMessageRef={topMessageRef}
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
