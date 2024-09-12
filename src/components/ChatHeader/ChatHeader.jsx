import { useState } from 'react';
import CountryInfo from '../CountryInfo/CountryInfo';
import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({
  chatName,
  participantsAmount = 0,
  countryChatId,
  setSubscriptionCountryRooms,
  isSubscribed,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <ChatHeaderStyled onClick={handleOpen}>
        <h5>{chatName}</h5>
        <p>{`${participantsAmount} participants`}</p>
      </ChatHeaderStyled>
      <CountryInfo
        isOpen={openModal}
        onClose={handleClose}
        countryName={chatName}
        participantsAmount={participantsAmount}
        countryChatId={countryChatId}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
      />
    </>
  );
};

export default ChatHeader;

// add online status for dms chat
