import { useEffect, useRef } from 'react';
import MessageItem from '@/components/MessageItem/MessageItem';
import { MessageListStyled } from './MessageListStyled.js';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  // console.log('messages', messages);
  return (
    <MessageListStyled>
      {messages &&
        messages.map((message, id) => {
          const nextUserMessage = messages[id + 1];
          const isLastMessage =
            !nextUserMessage || message.user?.id !== nextUserMessage.user?.id;

          const isShownAvatar = message.type === 'TEXT' && isLastMessage;
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

export default MessageList;
