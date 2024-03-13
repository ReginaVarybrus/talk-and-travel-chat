import { useEffect, useRef } from 'react';
// import { getUserName } from '@/redux-store/AuthOperations/selectors';
// import { useSelector } from 'react-redux';

import { MessageItem } from '../MessageItem/MessageItem';

export const MessageList = ({ messageList, username }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messageList]);

  return (
    <div>
      {messageList.map((message, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <MessageItem key={idx} message={message} username={username} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

// const MessageList = ({ messages }) => {
//   const userName = useSelector(getUserName);

//   return (
//     <ul>
//       {messages.map((message, i) => (
//         <li key={i}>
//           <span>{userName}</span>
//           <div>{message}</div>
//         </li>
//       ))}
//     </ul>
//   );
// };

export default MessageList;
