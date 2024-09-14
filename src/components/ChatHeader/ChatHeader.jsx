import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getUser } from '@/redux-store/selectors';
import { ChatHeaderStyled } from './ChatHeaderStyled';
import CountryInfo from '../CountryInfo/CountryInfo';

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
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
  };

  const showUserIsTyping = isUserTyping && userNameisTyping !== userName;

  return (
    <>
      <ChatHeaderStyled onClick={handleOpen}>
        {isPrivateChat ? (
          <h5>{selectedCompanion.userName}</h5>
        ) : (
          <h5>{chatName || 'Country Name'}</h5>
        )}
        <p>
          {showUserIsTyping
            ? `${userNameisTyping} is typing...`
            : !isPrivateChat && `${participantsAmount || '0'} participants`}
        </p>
      </ChatHeaderStyled>
      {isPrivateChat && !isPrivateChat && (
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

export default ChatHeader;

// add online status for dms chat
