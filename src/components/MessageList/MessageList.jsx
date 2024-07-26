import { useEffect, useRef } from 'react';

import MessageItem from '../MessageItem/MessageItem';

import { MessageListStyled } from './MessageListStyles.js';

const MessageList = ({ countryData }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const messagesList = countryData?.country?.groupMessages;
  useEffect(scrollToBottom, [messagesList]);

  return (
    <MessageListStyled>
      {messagesList &&
        messagesList.map((message, id) => (
          <MessageItem key={id} message={message} />
        ))}
      <div ref={messagesEndRef} />
    </MessageListStyled>
  );
};

export default MessageList;
