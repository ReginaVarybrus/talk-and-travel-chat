import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import ULRs from '@/redux-store/constants';
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
  countryChatId,
  groupMessages,
  country,
  setCountryData,
  setSubscriptionCountryRooms,
  isSubscribed,
  isShowJoinBtn,
  setIsShowJoinBtn,
}) => {
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [userNameisTyping, setUserNameisTyping] = useState('');
  const userId = useSelector(getUser)?.id;
  const { subscribeToGroupMessages, subscribeToUserErrors } = useWebSocket();

  useEffect(() => {
    if (isSubscribed) {
      subscribeToGroupMessages(
        ULRs.subscriptionToGroupMessages(countryChatId),
        setCountryData
      );

      subscribeToUserErrors(
        ULRs.subscriptionToUserErrors(userId),
        setCountryData
      );
    }
  }, [countryChatId]);

  return (
    <ChatStyled>
      {!countryName && <ChatFirstLoading />}
      {countryName && (
        <ChatHeader
          countryName={countryName}
          participantsAmount={participantsAmount}
          countryChatId={countryChatId}
          setSubscriptionCountryRooms={setSubscriptionCountryRooms}
          isSubscribed={isSubscribed}
          isUserTyping={isUserTyping}
          userNameisTyping={userNameisTyping}
        />
      )}

      <MessageBlock>
        {groupMessages?.length ? (
          <MessageList
            groupMessages={groupMessages}
            setIsUserTyping={setIsUserTyping}
            setUserNameisTyping={setUserNameisTyping}
          />
        ) : (
          <NoMassegesNotification>
            <Logo src={logo} alt="logo" width="200" height="160" />
            <p>There are no discussions yet. Be the first to start.</p>
          </NoMassegesNotification>
        )}
      </MessageBlock>
      <MessageBar
        countryChatId={countryChatId}
        country={country}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        isUserTyping={isUserTyping}
        setIsUserTyping={setIsUserTyping}
      />
    </ChatStyled>
  );
};

Chat.propTypes = {
  countryName: PropTypes.string,
  participantsAmount: PropTypes.number,
  countryChatId: PropTypes.number,
  groupMessages: PropTypes.array,
  country: PropTypes.shape({
    chatType: PropTypes.oneOf(['GROUP', 'PRIVATE']),
    country: PropTypes.shape({
      flagCode: PropTypes.string,
      name: PropTypes.string,
    }),
    creationDate: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    messages: PropTypes.array,
    name: PropTypes.string,
    usersCount: PropTypes.number,
  }),
  setCountryData: PropTypes.func,
  setSubscriptionCountryRooms: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isShowJoinBtn: PropTypes.bool,
  setIsShowJoinBtn: PropTypes.func,
};

export default Chat;
