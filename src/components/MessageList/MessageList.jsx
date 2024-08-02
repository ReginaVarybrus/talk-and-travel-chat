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
        groupMessages.map((message, id) => (
          <MessageItem
            key={id}
            content={message.content}
            userId={message.user.id}
            date={message.creationDate}
          />
        ))}
      <div ref={messagesEndRef} />
    </MessageListStyled>
  );
};

export default MessageList;
