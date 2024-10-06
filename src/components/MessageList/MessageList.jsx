import { useEffect } from 'react';
import { isSameDay } from 'date-fns';
import PropTypes from 'prop-types';
import MessageItem from '@/components/MessageItem/MessageItem';
import { MESSAGE_TYPES } from '@/constants/messageTypes.js';
import DateSeparator from '@/components/DateSeparator/DateSeparator.jsx';
import { MessageListStyled } from './MessageListStyled.js';

const MessageList = ({
  messages,
  setIsUserTyping,
  setUserNameisTyping,
  listOfOnlineUsers,
}) => {
  useEffect(() => {
    messages?.forEach(message => {
      if (message.type === MESSAGE_TYPES.START_TYPING) {
        setIsUserTyping(true);
        setUserNameisTyping(message.user?.userName);
      } else if (message.type === MESSAGE_TYPES.STOP_TYPING) {
        setIsUserTyping(false);
      }
    });
  }, [messages, setIsUserTyping, setUserNameisTyping]);

  const renderMessagesWithDateSeparator = () => {
    const sortedMessages = messages
      .slice()
      .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));

    return sortedMessages.map((message, index) => {
      const currentMessageDate = new Date(message.creationDate);
      const previousMessageDate =
        index > 0 ? new Date(sortedMessages[index - 1].creationDate) : null;

      const isDisplayableMessage =
        message.type === MESSAGE_TYPES.TEXT ||
        message.type === MESSAGE_TYPES.JOIN ||
        message.type === MESSAGE_TYPES.LEAVE;

      const showDateSeparator =
        isDisplayableMessage &&
        (index === 0 ||
          (previousMessageDate &&
            !isSameDay(currentMessageDate, previousMessageDate)));

      let nextUserMessage = null;
      for (let i = index + 1; i < sortedMessages.length; i++) {
        if (sortedMessages[i].type === MESSAGE_TYPES.TEXT) {
          nextUserMessage = sortedMessages[i];
          break;
        }
      }

      const isLastMessage =
        !nextUserMessage || nextUserMessage.user?.id !== message.user?.id;

      const isShownAvatar =
        message.type === MESSAGE_TYPES.TEXT && isLastMessage;

      const isOnline =
        listOfOnlineUsers.get(message.user.id.toString()) === true;

      return (
        <div key={message.id || message.creationDate}>
          {showDateSeparator && <DateSeparator date={currentMessageDate} />}
          <MessageItem
            key={message.id || message.creationDate}
            content={message.content}
            userId={message.user?.id}
            userName={message.user?.userName}
            date={message.creationDate}
            type={message.type}
            isShownAvatar={isShownAvatar}
            isOnline={isOnline}
          />
        </div>
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
  setUserNameisTyping: PropTypes.func,
};

export default MessageList;
