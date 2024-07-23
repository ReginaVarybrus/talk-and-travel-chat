import { useState } from 'react';
import { ChatStyled, MessageBlock } from './ChatStyled';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageBar from '../MessageBar/MessageBar';

const Chat = ({ countryData, currentCountryRoom }) => {
  const [messagesList, setMessagesList] = useState([]);

  return (
    <ChatStyled>
      <ChatHeader countryData={countryData} />
      <MessageBlock>
        <MessageList countryData={countryData} messagesList={messagesList} />
      </MessageBlock>
      <MessageBar
        countryData={countryData}
        currentCountryRoom={currentCountryRoom}
        setMessagesList={setMessagesList}
      />
    </ChatStyled>
  );
};

export default Chat;
