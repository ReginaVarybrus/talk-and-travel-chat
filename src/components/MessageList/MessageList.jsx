import { useState, useEffect, useRef } from 'react';
import MessageItem from '../MessageItem/MessageItem';

const MessageList = ({ countryData }) => {
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (countryData) {
      setMessageList(countryData.groupMessages);
    }
  }, [countryData]);

  useEffect(scrollToBottom, [messageList]);

  return (
    <div>
      {messageList &&
        messageList.map((message, id) => (
          <MessageItem key={id} message={message} />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
