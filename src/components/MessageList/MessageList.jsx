import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MessageItem from '@/components/MessageItem/MessageItem';
import { MESSAGE_TYPES } from '@/constants/messageTypes.js';
import { MessageListStyled } from './MessageListStyled.js';

const MessageList = ({
  messages,
  setIsUserTyping,
  setUserNameisTyping,
  listOfOnlineUsers,
}) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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

  useEffect(scrollToBottom, [messages]);

  return (
    <MessageListStyled>
      {messages &&
        messages.map((message, id) => {
          const nextUserMessage = messages[id + 1];
          const isLastMessage =
            !nextUserMessage || message.user?.id !== nextUserMessage.user?.id;

          const isShownAvatar =
            message.type === MESSAGE_TYPES.TEXT && isLastMessage;

          const isOnline =
            listOfOnlineUsers.get(message.user.id.toString()) === true;

          return (
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
          );
        })}
      <div ref={messagesEndRef} />
    </MessageListStyled>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array,
  setIsUserTyping: PropTypes.func,
  setUserNameisTyping: PropTypes.func,
};

export default MessageList;
