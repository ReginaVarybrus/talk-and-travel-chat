import { ChatStyled, MessageBlock } from './ChatStyled';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageBar from '../MessageBar/MessageBar';

const Chat = ({
  countryData,
  currentCountryRoom,
  setCountryData,
  subscriptionCountryRooms,
  setSubscriptionCountryRooms,
}) => (
  <ChatStyled>
    <ChatHeader countryData={countryData} />
    <MessageBlock>
      {countryData?.country?.groupMessages ? (
        <MessageList countryData={countryData} />
      ) : (
        <div>There are no discussions yet. Be the first to start.</div>
      )}
    </MessageBlock>
    <MessageBar
      countryData={countryData}
      currentCountryRoom={currentCountryRoom}
      setCountryData={setCountryData}
      subscriptionCountryRooms={subscriptionCountryRooms}
      setSubscriptionCountryRooms={setSubscriptionCountryRooms}
    />
  </ChatStyled>
);
export default Chat;
