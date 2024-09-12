import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MessageItem from '@/components/MessageItem/MessageItem';
import { MESSAGE_TYPES } from '@/constants/messageTypes.js';
import { MessageListStyled } from './MessageListStyled.js';

const MessageList = ({
  groupMessages,
  setIsUserTyping,
  setUserNameisTyping,
}) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  groupMessages?.forEach(message => {
    if (message.type === MESSAGE_TYPES.START_TYPING) {
      setIsUserTyping(true);
      setUserNameisTyping(message.user?.userName);
    } else if (message.type === MESSAGE_TYPES.STOP_TYPING) {
      setIsUserTyping(false);
    }
  });

  useEffect(scrollToBottom, [groupMessages]);

  return (
    <MessageListStyled>
      {groupMessages &&
        groupMessages.map((message, id) => {
          const nextUserMessage = groupMessages[id + 1];
          const isLastMessage =
            !nextUserMessage || message.user?.id !== nextUserMessage.user?.id;

          const isShownAvatar =
            message.type === MESSAGE_TYPES.TEXT && isLastMessage;

          return (
            <MessageItem
              key={message.id}
              content={message.content}
              userId={message.user?.id}
              userName={message.user?.userName}
              date={message.creationDate}
              type={message.type}
              isShownAvatar={isShownAvatar}
            />
          );
        })}
      <div ref={messagesEndRef} />
    </MessageListStyled>
  );
};

MessageList.propTypes = {
  groupMessages: PropTypes.array,
  setIsUserTyping: PropTypes.func,
  setUserNameisTyping: PropTypes.func,
};

export default MessageList;
