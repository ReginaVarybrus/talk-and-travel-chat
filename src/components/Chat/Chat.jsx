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
import { useChatContext } from '@/providers/ChatProvider';
import ScrollToBottomButton from '@/components/Buttons/ScrollToBottomButton/ScrollToBottomButton';
import {
  ChatStyled,
  MessageBlock,
  NoMassegesNotification,
  Logo,
  NewMessagesNotification,
  LoaderStyleBox,
  PositionBox,
} from './ChatStyled';

const Chat = ({
  chatData,
  setChatData,
  isSubscribed,
  isShowJoinBtn,
  setIsShowJoinBtn,
  selectedCompanion,
  setSelectedCompanion,
  participantsAmount,
  setParticipantsAmount,
  isChatVisible,
  setIsChatVisible,
  chatOpenedTime,
}) => {
  const userId = useSelector(getUser)?.id;
  const { id, name, chatType, country } = chatData || {};
  const isPrivateChat = chatType === CHAT_TYPES.PRIVATE;

  const [isUserTyping, setIsUserTyping] = useState(false);
  const [usersTyping, setUsersTyping] = useState([]);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [unreadPage, setUnreadPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreUnread, setHasMoreUnread] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [hasInitialScrolled, setHasInitialScrolled] = useState(false);
  const [showNewMessagesIndicator, setShowNewMessagesIndicator] =
    useState(false);
  const [messagesToMarkAsRead, setMessagesToMarkAsRead] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyToMessage, setReplyToMessage] = useState(null);

  const lastVisibleReadMessageRef = useRef(null);
  const messageBlockRef = useRef(null);
  const isFetching = useRef(false);
  const isFetchingRead = useRef(false);
  const isFetchingUnread = useRef(false);
  const previousChatIdRef = useRef(null);
  const fromMessageIdRef = useRef(null);

  const {
    subscribeToMessages,
    subscribeToUserErrors,
    unsubscribeFromMessages,
  } = useWebSocket();

  const { updateUnreadMessagesCount, unreadRoomsCount } = useChatContext();

  const debouncedMarkAsRead = useRef(
    debounce(async (chatId, lastMessageId) => {
      if (!chatId || !lastMessageId) return;
      try {
        await axiosClient.patch(URLs.lastReadMessage(chatId), {
          lastReadMessageId: lastMessageId,
        });
        const remainingUnread = unreadMessages.length - 1;
        updateUnreadMessagesCount(id, remainingUnread, isPrivateChat);
      } catch (error) {
        console.error('Error updating last read message:', error);
      }
    }, 1000)
  ).current;

  const fetchPublicMessages = async (pageNumber = 0) => {
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
    }
  };

  const fetchReadMessages = async (pageNumber = 0) => {
    if (isFetchingRead.current) {
      console.warn('Already fetching messages. Skipping.');
      return [];
    }
    isFetchingRead.current = true;

    try {
      const params = {
        size: 20,
        page: pageNumber,
        sort: 'creationDate,desc',
      };

      if (fromMessageIdRef.current !== null) {
        params['from-message-id'] = fromMessageIdRef.current;
      }

      const response = await axiosClient.get(URLs.getReadMessages(id), {
        params,
      });

      const { content, page: pageData } = response.data;

      if (pageNumber === 0 && content.length > 0) {
        fromMessageIdRef.current = content[0].id;
      }

      setMessages(prevMessages => [...content, ...prevMessages]);

      setPage(pageData.number + 1);
      setHasMore(pageData.number + 1 < pageData.totalPages);

      return content;
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    } finally {
      isFetchingRead.current = false;
    }
  };

  const scrollToLastVisibleReadMessage = () => {
    if (!messageBlockRef.current || !lastVisibleReadMessageRef.current) return;

    lastVisibleReadMessageRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  };

  const scrollToMessageElement = messageId => {
    setTimeout(() => {
      const targetElement = document.getElementById(`message-${messageId}`);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        targetElement.classList.add('highlight');
        setTimeout(() => targetElement.classList.remove('highlight'), 1000);
      } else {
        console.warn('Message element not found in DOM.');
      }
    }, 100);
  };

  const fetchMessageById = async (messageId, currentPage = page) => {
    try {
      let targetMessage = messages.find(msg => msg.id === messageId);

      if (targetMessage) {
        scrollToMessageElement(messageId);
        return;
      }

      if (hasMore) {
        const newMessages = await fetchReadMessages(currentPage);

        if (!newMessages || newMessages.length === 0) {
          return;
        }

        setMessages(prevMessages => {
          const uniqueMessages = newMessages.filter(
            newMsg => !prevMessages.some(msg => msg.id === newMsg.id)
          );
          return [...prevMessages, ...uniqueMessages];
        });

        targetMessage = [...messages, ...newMessages].find(
          msg => msg.id === messageId
        );

        if (targetMessage) {
          scrollToMessageElement(messageId);
          return;
        }

        await fetchMessageById(messageId, currentPage + 1);
      }
    } catch (error) {
      console.error('Error in fetchMessageById:', error);
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

    setIsLoading(true);

    try {
      if (!isShowJoinBtn) {
        const initialMessages = await fetchReadMessages();
        const fetchedUnreadMessages = await fetchUnreadMessages();

        const combinedMessages = [
          ...initialMessages,
          ...fetchedUnreadMessages,
        ].sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));

        setMessages(combinedMessages);

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
    } finally {
      setIsLoading(false);
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
      const currentChatId = previousChatIdRef.current;

      setMessages([]);
      setUnreadMessages([]);
      setPage(0);
      setUnreadPage(0);
      setShowNewMessagesIndicator(false);
      setMessagesToMarkAsRead([]);
      setHasInitialScrolled(false);
      setReplyToMessage(null);
      if (currentChatId && messagesToMarkAsRead.length > 0) {
        const lastMessageId =
          messagesToMarkAsRead[messagesToMarkAsRead.length - 1];
        debouncedMarkAsRead(currentChatId, lastMessageId);
        debouncedMarkAsRead.flush();
        setMessagesToMarkAsRead([]);
      }

      fromMessageIdRef.current = null;
      previousChatIdRef.current = id;

      setTimeout(() => {
        fetchChatMessages();
      }, 300);
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

  // useEffect(() => {
  //   if (isSubscribed && id) {
  //     subscribeToMessages(URLs.subscriptionToMessages(id), newMessage => {
  //       setMessages(prevMessages => [...prevMessages, newMessage]);

  //       if (newMessage.type === MESSAGE_TYPES.TEXT && messageBlockRef.current) {
  //         const isAtBottom =
  //           messageBlockRef.current.scrollTop +
  //             messageBlockRef.current.clientHeight >=
  //           messageBlockRef.current.scrollHeight - 10;
  //         if (isAtBottom) {
  //           messageBlockRef.current.scrollTo({
  //             top: messageBlockRef.current.scrollHeight,
  //             behavior: 'smooth',
  //           });
  //           setMessagesToMarkAsRead(prev => [...prev, newMessage.id]);
  //         } else if (newMessage.user.id !== userId) {
  //           setUnreadMessages(prev => [...prev, newMessage]);
  //           setShowNewMessagesIndicator(true);
  //         }
  //         if (newMessage.user.id === userId) {
  //           setMessagesToMarkAsRead(prev => [...prev, newMessage.id]);
  //         }
  //       }
  //     });

  //     if (!isPrivateChat && selectedCompanion) {
  //       setSelectedCompanion(null);
  //     }

  //     subscribeToUserErrors(URLs.subscriptionToUserErrors(userId), setChatData);

  //     return () => {
  //       unsubscribeFromMessages();
  //     };
  //   }
  // }, [id, isSubscribed, setChatData]);

  useEffect(() => {
    if (messagesToMarkAsRead.length > 0) {
      const timer = setTimeout(() => {
        const lastMessageId =
          messagesToMarkAsRead[messagesToMarkAsRead.length - 1];

        debouncedMarkAsRead(id, lastMessageId);
        setMessagesToMarkAsRead([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messagesToMarkAsRead, id]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (messagesToMarkAsRead.length > 0 && previousChatIdRef.current) {
        const lastMessageId =
          messagesToMarkAsRead[messagesToMarkAsRead.length - 1];
        debouncedMarkAsRead(previousChatIdRef.current, lastMessageId);
        debouncedMarkAsRead.flush();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [messagesToMarkAsRead]);

  useEffect(() => {
    if (id && unreadMessages.length > 0 && !hasInitialScrolled) {
      scrollToLastVisibleReadMessage();
      setHasInitialScrolled(true);
    }
  }, [id, unreadMessages]);

  const handleScroll = e => {
    const { scrollHeight, clientHeight, scrollTop } = e.target;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    const nearTop = scrollHeight + scrollTop <= clientHeight + 300;

    if (isFetching.current) return;

    if (!isShowJoinBtn) {
      if (nearTop && hasMore && !isFetching.current) {
        isFetching.current = true;
        const previousScrollHeight = e.target.scrollHeight;
        fetchReadMessages(page)
          .then(() => {
            const newScrollHeight = e.target.scrollHeight;
            e.target.scrollBottom = newScrollHeight - previousScrollHeight;
          })
          .finally(() => {
            isFetching.current = false;
          });
      }
    } else if (nearTop && hasMore && !isFetching.current) {
      isFetching.current = true;

      const previousScrollHeight = e.target.scrollHeight;

      fetchPublicMessages(page)
        .then(() => {
          const newScrollHeight = e.target.scrollHeight;
          e.target.scrollBottom = newScrollHeight - previousScrollHeight;
        })
        .finally(() => {
          isFetching.current = false;
        });
    }

    if (isAtBottom) {
      setShowNewMessagesIndicator(false);
    }
  };

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
                const remainingUnread = unreadMessages.length - 1;
                debouncedMarkAsRead(id, visibleMessageId);
                updateUnreadMessagesCount(id, remainingUnread, isPrivateChat);
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
  }, [id, unreadMessages, updateUnreadMessagesCount]);

  // useEffect(() => {
  //   const adjustViewportHeight = () => {
  //     const vh = window.visualViewport
  //       ? window.visualViewport.height
  //       : window.innerHeight;
  //     document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
  //   };

  //   adjustViewportHeight();

  //   if (window.visualViewport) {
  //     window.visualViewport.addEventListener('resize', adjustViewportHeight);
  //   } else {
  //     window.addEventListener('resize', adjustViewportHeight);
  //   }

  //   return () => {
  //     if (window.visualViewport) {
  //       window.visualViewport.removeEventListener(
  //         'resize',
  //         adjustViewportHeight
  //       );
  //     } else {
  //       window.removeEventListener('resize', adjustViewportHeight);
  //     }
  //   };
  // }, []);

  const handleScrollToBottom = () => {
    if (messageBlockRef.current) {
      messageBlockRef.current.scrollTo({
        top: messageBlockRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (unreadMessages.length > 0) {
      const lastMessageId = unreadMessages[0].id;

      debouncedMarkAsRead(id, lastMessageId);

      updateUnreadMessagesCount(id, 0, isPrivateChat);
      setUnreadMessages([]);
      setUnreadCount(0);
      setShowNewMessagesIndicator(false);
    }
  };

  return (
    <ChatStyled $isChatVisible={isChatVisible}>
      {!name && <ChatFirstLoading />}
      <ChatHeader
        chatName={name}
        chatData={chatData}
        participantsAmount={participantsAmount}
        setParticipantsAmount={setParticipantsAmount}
        flagCode={country?.flagCode}
        selectedCompanion={selectedCompanion}
        isPrivateChat={isPrivateChat}
        usersTyping={usersTyping}
        chatId={id}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setIsChatVisible={setIsChatVisible}
        isShowJoinBtn={isShowJoinBtn}
        setChatData={setChatData}
      />
      <MessageBlock ref={messageBlockRef} onScroll={handleScroll}>
        {isLoading ? (
          <LoaderStyleBox>
            <Loader size={50} />
          </LoaderStyleBox>
        ) : !messages.length ? (
          <NoMassegesNotification>
            <Logo src={logo} alt="logo" width="200" height="160" />
            <p>There are no discussions yet. Be the first to start.</p>
          </NoMassegesNotification>
        ) : (
          <MessageList
            messages={messages}
            unreadMessages={unreadMessages}
            setIsUserTyping={setIsUserTyping}
            setUsersTyping={setUsersTyping}
            setParticipantsAmount={setParticipantsAmount}
            lastVisibleReadMessageRef={lastVisibleReadMessageRef}
            isPrivateChat={isPrivateChat}
            chatOpenedTime={chatOpenedTime}
            setReplyToMessage={setReplyToMessage}
            fetchMessageById={fetchMessageById}
          />
        )}
      </MessageBlock>
      <PositionBox>
        <ScrollToBottomButton targetRef={messageBlockRef} />
        {showNewMessagesIndicator && (
          <NewMessagesNotification>
            <button
              type="button"
              className="scroll-button"
              onClick={handleScrollToBottom}
              aria-label="Scroll to bottom"
            >
              <span aria-hidden="true">
                <IoIosArrowDown />
              </span>
              <span>{unreadCount} new messages</span>
            </button>
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
          isShowJoinBtn={isShowJoinBtn}
          setIsShowJoinBtn={setIsShowJoinBtn}
          isUserTyping={isUserTyping}
          setIsUserTyping={setIsUserTyping}
          setParticipantsAmount={setParticipantsAmount}
          scrollToBottom={scrollToBottom}
          setShowNewMessagesIndicator={setShowNewMessagesIndicator}
          setReplyToMessage={setReplyToMessage}
          replyToMessage={replyToMessage}
        />
      </PositionBox>
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
  chatOpenedTime: PropTypes.instanceOf(Date),
};

export default Chat;
