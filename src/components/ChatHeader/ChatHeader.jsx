import CountryInfo from '@/components/CountryInfo/CountryInfo';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getUser } from '@/redux-store/selectors';
import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({
  chatName,
  participantsAmount,
  selectedCompanion,
  isPrivateChat,
  isUserTyping,
  userNameisTyping,
  chatId,
  isSubscribed,
  setSubscriptionRooms,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const userName = useSelector(getUser)?.userName;
  const showUserIsTyping = isUserTyping && userNameisTyping !== userName;

  const handleOpen = () => {
    if (!isPrivateChat) {
      setOpenModal(true);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ChatHeaderStyled onClick={handleOpen}>
        <h5>{isPrivateChat ? selectedCompanion.userName : chatName}</h5>

        <p>
          {showUserIsTyping
            ? `${userNameisTyping} is typing...`
            : !isPrivateChat && `${participantsAmount || '0'} participants`}
        </p>
      </ChatHeaderStyled>
      {!isPrivateChat && (
        <CountryInfo
          isOpen={openModal}
          onClose={handleClose}
          countryName={chatName || 'Country Name'}
          participantsAmount={participantsAmount || 0}
          chatId={chatId}
          setSubscriptionRooms={setSubscriptionRooms}
          isSubscribed={isSubscribed}
        />
      )}
    </>
  );
};

ChatHeader.propTypes = {
  chatName: PropTypes.string,
  participantsAmount: PropTypes.number,
  selectedCompanion: PropTypes.number,
  chatId: PropTypes.number,
  isPrivateChat: PropTypes.bool,
  setSubscriptionRooms: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isUserTyping: PropTypes.bool,
  userNameisTyping: PropTypes.string,
};

export default ChatHeader;
