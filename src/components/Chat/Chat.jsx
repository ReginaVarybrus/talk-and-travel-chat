import { ChatStyled, MessageBlock } from './ChatStyled';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageBar from '../MessageBar/MessageBar';

const Chat = ({ countryData, currentCountryRoom, setCountryData }) => (
  <ChatStyled>
    <ChatHeader countryData={countryData} />
    <MessageBlock>
      <MessageList countryData={countryData} />
    </MessageBlock>
    <MessageBar
      countryData={countryData}
      currentCountryRoom={currentCountryRoom}
      setCountryData={setCountryData}
    />
  </ChatStyled>
);
export default Chat;
