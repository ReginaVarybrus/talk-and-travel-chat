import { useEffect, useRef } from 'react';
import { MessageItem } from '../MessageItem/MessageItem';

const MessageList = ({ countryData, messageList }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messageList]);

  if (countryData) {
    console.log('CountryData in message list', countryData);
    console.log('MessageList:', messageList);
  }

  return (
    <div>
      {messageList &&
        messageList.map(message => (
          <MessageItem
            key={message.id}
            message={message.content}
            date={message.creationDate}
          />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
