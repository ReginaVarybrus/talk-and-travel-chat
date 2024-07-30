import logo from '@/images/logo.svg';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageBar from '../MessageBar/MessageBar';
import {
  ChatStyled,
  MessageBlock,
  NoMassegesNotification,
  Logo,
} from './ChatStyled';

const Chat = ({ countryData, setCountryData, setSubscriptionCountryRooms }) => (
  <ChatStyled>
    <ChatHeader countryData={countryData} />
    <MessageBlock>
      {countryData?.country?.groupMessages.length ? (
        <MessageList countryData={countryData} />
      ) : (
        <NoMassegesNotification>
          <Logo src={logo} alt="logo" />
          <p>There are no discussions yet. Be the first to start.</p>
        </NoMassegesNotification>
      )}
    </MessageBlock>
    <MessageBar
      countryData={countryData}
      setCountryData={setCountryData}
      setSubscriptionCountryRooms={setSubscriptionCountryRooms}
    />
  </ChatStyled>
);
export default Chat;
