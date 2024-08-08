import { useEffect, useRef } from 'react';
import MessageItem from '@/components/MessageItem/MessageItem';
import { MessageListStyled } from './MessageListStyled.js';

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
          const nextUserMessage = groupMessages[id + 1];
          const isShownAvatar =
            !nextUserMessage || message.user.id !== nextUserMessage.user.id;

          return (
            <MessageItem
              key={message.id}
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
