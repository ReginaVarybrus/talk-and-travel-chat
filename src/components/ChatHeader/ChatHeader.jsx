import { useState } from 'react';
import CountryInfo from '../CountryInfo/CountryInfo';
import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({
  countryName = 'Country Name',
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
        <h5>{countryName}</h5>
        <p>{`${participantsAmount} participants`}</p>
      </ChatHeaderStyled>
      <CountryInfo
        isOpen={openModal}
        onClose={handleClose}
        countryName={countryName}
        participantsAmount={participantsAmount}
        countryChatId={countryChatId}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
      />
    </>
  );
};

export default ChatHeader;
