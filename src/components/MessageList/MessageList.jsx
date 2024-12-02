import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isSameDay } from 'date-fns';
import PropTypes from 'prop-types';
import MessageItem from '@/components/MessageItem/MessageItem';
import { MESSAGE_TYPES } from '@/constants/messageTypes.js';
import { getUser, getUsersStatuses } from '@/redux-store/selectors.js';
import DateSeparator from '@/components/DateSeparator/DateSeparator.jsx';
import { HighlightedMessage, MessageListStyled } from './MessageListStyled.js';

const MessageList = ({
  messages,
  setIsUserTyping,
  setUsersTyping,
  unreadMessages,
  setParticipantsAmount,
  lastVisibleReadMessageRef,
  isPrivateChat,
  chatOpenedTime,
  setReplyToMessage,
  fetchMessageById,
}) => {
  const currentUserName = useSelector(getUser)?.userName;
  const usersStatuses = useSelector(getUsersStatuses);

  const messageTypeStartTyping = MESSAGE_TYPES.START_TYPING;
  const messageTypeStopTyping = MESSAGE_TYPES.STOP_TYPING;
  const messageTypeText = MESSAGE_TYPES.TEXT;
  const messageTypeJoin = MESSAGE_TYPES.JOIN;
  const messageTypeLeave = MESSAGE_TYPES.LEAVE;

  useEffect(() => {
    messages?.forEach(message => {
      const currentUser = message.user?.userName;

      if (
        message.type === messageTypeStartTyping &&
        currentUser !== currentUserName
      ) {
        setUsersTyping(prevUsers => {
          if (!prevUsers.includes(currentUser)) {
            return [...prevUsers, currentUser];
          }
          return prevUsers;
        });
      } else if (message.type === messageTypeStopTyping) {
        setUsersTyping(prevUsers =>
          prevUsers.filter(userName => userName !== currentUser)
        );
      }
    });
  }, [messages, setIsUserTyping, setUsersTyping, currentUserName]);

  const renderMessagesWithDateSeparator = () => {
    const sortedMessages = messages
      .slice()
      .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));

    return sortedMessages.map((message, index) => {
      const currentMessageDate = new Date(message.creationDate);
      const previousMessageDate =
        index > 0 ? new Date(sortedMessages[index - 1].creationDate) : null;

      const isDisplayableMessage =
        message.type === messageTypeText ||
        message.type === messageTypeJoin ||
        message.type === messageTypeLeave;

      const showDateSeparator =
        isDisplayableMessage &&
        (index === 0 ||
          (previousMessageDate &&
            !isSameDay(currentMessageDate, previousMessageDate)));

      let nextUserMessage = null;
      for (let i = index + 1; i < sortedMessages.length; i += 1) {
        if (sortedMessages[i].type === messageTypeText) {
          nextUserMessage = sortedMessages[i];
          break;
        }
      }

      const isLastMessage =
        !nextUserMessage || nextUserMessage.user?.id !== message.user?.id;

      const isShownAvatar = message.type === messageTypeText && isLastMessage;

      const userStatus = usersStatuses.find(
        user => user.userId === message.user.id
      );

      const isOnline = userStatus ? userStatus.status.isOnline : false;

      const isLastVisibleReadMessage =
        index === sortedMessages.length - unreadMessages.length - 1;
      return (
        <HighlightedMessage
          key={message.id || message.creationDate}
          ref={isLastVisibleReadMessage ? lastVisibleReadMessageRef : null}
          data-message-id={message.id}
          id={`message-${message.id}`}
        >
          {showDateSeparator && <DateSeparator date={currentMessageDate} />}
          <MessageItem
            key={message.id || message.creationDate}
            replyMessageId={message.id}
            content={message.content}
            userId={message.user?.id}
            userName={message.user?.userName}
            userAvatarUrl={message.user?.avatar}
            date={message.creationDate}
            type={message.type}
            attachment={message.attachment}
            isShownAvatar={isShownAvatar}
            isOnline={isOnline}
            isPrivateChat={isPrivateChat}
            setParticipantsAmount={setParticipantsAmount}
            chatOpenedTime={chatOpenedTime}
            onReply={setReplyToMessage}
            repliedMessage={message.repliedMessage}
            fetchMessageById={fetchMessageById}
          />
        </HighlightedMessage>
      );
    });
  };

  return (
    <MessageListStyled>{renderMessagesWithDateSeparator()}</MessageListStyled>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array,
  setIsUserTyping: PropTypes.func,
  setUsersTyping: PropTypes.func,
  unreadMessages: PropTypes.array,
  lastVisibleReadMessageRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  chatOpenedTime: PropTypes.instanceOf(Date),
};

export default MessageList;
