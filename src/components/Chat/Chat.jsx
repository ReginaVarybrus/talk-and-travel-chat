import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { ChatStyled, MessageBlock } from './ChatStyled';

import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageBar from '../MessageBar/MessageBar';

const Chat = ({ countryData }) => {
  const [messageList, setMessageList] = useState(
    countryData.groupMessages || []
  );
  const userName = useSelector(getUser)?.name;

  return (
    <ChatStyled>
      <ChatHeader countryData={countryData} />
      <MessageBlock>
        <MessageList
          countryData={countryData}
          messageList={messageList}
          username={userName}
        />
      </MessageBlock>
      <MessageBar countryData={countryData} setMessageList={setMessageList} />
    </ChatStyled>
  );
};

export default Chat;
