import { useEffect, useRef } from 'react';
import { MessageItem } from '../MessageItem/MessageItem';

export const MessageList = ({ messages, username }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      {messages &&
        messages.map((message, idx) => (
          <MessageItem key={idx} message={message} username={username} />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
