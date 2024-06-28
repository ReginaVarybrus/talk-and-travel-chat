// import { useState, useEffect } from 'react';
import { ChatStyled, MessageBlock } from './ChatStyled';

import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageBar from '../MessageBar/MessageBar';

const Chat = ({ countryData, setCountryData }) => (
  <ChatStyled>
    <ChatHeader countryData={countryData} />
    <MessageBlock>
      <MessageList countryData={countryData} />
    </MessageBlock>
    <MessageBar countryData={countryData} setCountryData={setCountryData} />
  </ChatStyled>
);

export default Chat;
