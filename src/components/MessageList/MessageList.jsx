import { useEffect, useRef } from 'react';
import { MessageItem } from '../MessageItem/MessageItem';

const MessageList = ({ messageList }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messageList]);

  if (messageList) {
    console.log('MessageList:', messageList);
  }

  return (
    <div>
      {messageList &&
        messageList.map(message => (
          <MessageItem
            key={message.id}
            avatar={message.user.avatar}
            message={message.content}
            date={message.creationDate}
          />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
