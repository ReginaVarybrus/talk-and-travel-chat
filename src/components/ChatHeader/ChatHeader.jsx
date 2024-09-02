import { useState } from 'react';
import CountryInfo from '../CountryInfo/CountryInfo';
import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({
  countryName,
  participantsAmount,
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
        <h5>{countryName || 'Country Name'}</h5>
        <p>{`${participantsAmount || '0'} participants`}</p>
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
