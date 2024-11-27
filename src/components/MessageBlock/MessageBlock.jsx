import { useRef } from 'react';
import PropTypes from 'prop-types';
import logo from '@/images/logo.svg';
import MessageList from '@/components/MessageList/MessageList';
import Loader from '@/components/Loader/Loader';

import {
  MessageBlockStyled,
  NoMassegesNotification,
  Logo,
  LoaderStyleBox,
} from './MessageBlockStyled';

const MessageBlock = ({
  messageBlockRef,
  lastVisibleReadMessageRef,
  messages,
  isLoading,
  isShowJoinBtn,
  isPrivateChat,
  page,
  hasMore,
  setIsUserTyping,
  setUsersTyping,
  unreadMessages,
  setParticipantsAmount,
  setReplyToMessage,
  chatOpenedTime,
  fetchReadMessages,
  setMessages,
  fetchPublicMessages,
  setShowNewMessagesIndicator,
}) => {
  const isFetching = useRef(false);

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

  return (
    <MessageBlockStyled ref={messageBlockRef} onScroll={handleScroll}>
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
    </MessageBlockStyled>
  );
};

MessageBlock.propTypes = {
  messages: PropTypes.array,
};

export default MessageBlock;
