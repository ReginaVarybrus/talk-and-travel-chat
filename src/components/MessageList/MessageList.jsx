import { useEffect, useRef } from 'react';
// import { getUser } from '@/redux-store/selectors';
// import { useSelector } from 'react-redux';
import { MessageListStyled } from './MessageListStyled.js';
import { MessageItem } from '../MessageItem/MessageItem';

export const MessageList = ({ messageList, username }) => {
  const messagesEndRef = useRef(null);
  // const username = useSelector(getUser)?.name;
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messageList]);

  return (
    <MessageListStyled>
      <MessageItem />
      {messageList &&
        messageList.map((message, idx) => (
          <MessageItem key={idx} message={message} username={username} />
        ))}
      <div ref={messagesEndRef} />
    </MessageListStyled>
  );
};

export default MessageList;
