import { ChatStyled, MessageBlock } from './ChatStyled';

import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageBar from '../MessageBar/MessageBar';

const Chat = ({ countryData, currentCountryRoom }) => (
  <ChatStyled>
    <ChatHeader countryData={countryData} />
    <MessageBlock>
      <MessageList countryData={countryData} />
    </MessageBlock>
    <MessageBar
      countryData={countryData}
      currentCountryRoom={currentCountryRoom}
    />
  </ChatStyled>
);

export default Chat;
