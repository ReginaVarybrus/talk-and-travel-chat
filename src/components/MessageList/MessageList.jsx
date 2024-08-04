import { useEffect, useRef } from 'react';
import MessageItem from '@/components/MessageItem/MessageItem';
import { MessageListStyled } from './MessageListStyles.js';

const MessageList = ({ groupMessages }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [groupMessages]);

  return (
    <MessageListStyled>
      {groupMessages &&
        groupMessages.map((message, id) => {
          const isShownAvatar =
            id === groupMessages.length - 1 ||
            (id < groupMessages.length - 1 &&
              message.user.id !== groupMessages[id + 1].user.id);

          return (
            <MessageItem
              key={id}
              content={message.content}
              userId={message.user.id}
              date={message.creationDate}
              isShownAvatar={isShownAvatar}
            />
          );
        })}
      <div ref={messagesEndRef} />
    </MessageListStyled>
  );
};

export default MessageList;
