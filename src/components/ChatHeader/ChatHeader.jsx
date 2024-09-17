import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import CountryInfo from '../CountryInfo/CountryInfo';
import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({
  countryName = 'Country Name',
  participantsAmount = 0,
  setParticipantsAmount,
  countryChatId,
  setSubscriptionCountryRooms,
  isSubscribed,
  isUserTyping,
  userNameisTyping,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const userName = useSelector(getUser)?.userName;
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
  };

  const showUserIsTyping = isUserTyping && userNameisTyping !== userName;

  return (
    <>
      <ChatHeaderStyled onClick={handleOpen}>
        <h5>{countryName}</h5>
        <p>
          {showUserIsTyping
            ? `${userNameisTyping} is typing...`
            : `${participantsAmount} participants`}
        </p>
      </ChatHeaderStyled>
      <CountryInfo
        isOpen={openModal}
        onClose={handleClose}
        countryName={countryName}
        participantsAmount={participantsAmount}
        setParticipantsAmount={setParticipantsAmount}
        countryChatId={countryChatId}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
      />
    </>
  );
};

ChatHeader.propTypes = {
  countryName: PropTypes.string,
  participantsAmount: PropTypes.number,
  countryChatId: PropTypes.number,
  setSubscriptionCountryRooms: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isUserTyping: PropTypes.bool,
  userNameisTyping: PropTypes.string,
};

export default ChatHeader;
