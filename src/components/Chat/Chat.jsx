import logo from '@/images/logo.svg';
import ChatHeader from '@/components/ChatHeader/ChatHeader';
import MessageList from '@/components/MessageList/MessageList';
import MessageBar from '@/components/MessageBar/MessageBar';
import ChatFirstLoading from '@/components/ChatFirstLoading/ChatFirstLoading';
import {
  ChatStyled,
  MessageBlock,
  NoMassegesNotification,
  Logo,
} from './ChatStyled';

const Chat = ({
  countryName,
  participantsAmount,
  groupMessages,
  country,
  isSubscribed,
  setCountryData,
  setSubscriptionCountryRooms,
}) => (
  <ChatStyled>
    {!countryName && <ChatFirstLoading />}

    <ChatHeader
      countryName={countryName}
      participantsAmount={participantsAmount}
    />
    <MessageBlock>
      {groupMessages?.length ? (
        <MessageList groupMessages={groupMessages} />
      ) : (
        <NoMassegesNotification>
          <Logo src={logo} alt="logo" width="200" height="160" />
          <p>There are no discussions yet. Be the first to start.</p>
        </NoMassegesNotification>
      )}
    </MessageBlock>
    <MessageBar
      countryName={countryName}
      country={country}
      isSubscribed={isSubscribed}
      setCountryData={setCountryData}
      setSubscriptionCountryRooms={setSubscriptionCountryRooms}
    />
  </ChatStyled>
);
export default Chat;
