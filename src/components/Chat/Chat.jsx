import { useState, useEffect } from 'react';
import { ChatStyled, MessageBlock } from './ChatStyled';

import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageBar from '../MessageBar/MessageBar';

const Chat = ({ countryData }) => {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    console.log('MessageList:', messageList);
  }, [messageList]);

  return (
    <ChatStyled>
      <ChatHeader countryData={countryData} />
      <MessageBlock>
        <MessageList messageList={messageList} />
      </MessageBlock>
      <MessageBar countryData={countryData} setMessageList={setMessageList} />
    </ChatStyled>
  );
};

export default Chat;
