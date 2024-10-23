import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import CountryInfo from '@/components/CountryInfo/CountryInfo';
import {
  ChatHeaderStyled,
  MobileHeaderStyled,
  DesktopHeaderStyled,
  MobileHeaderContentStyled,
  LetterAvatarStyled,
  HeaderButton,
  BackIcon,
  FlagImg,
  OpenCountryInfoIcon,
} from './ChatHeaderStyled';

const ChatHeader = ({
  chatName = 'Country name',
  participantsAmount,
  setParticipantsAmount,
  flagCode,
  selectedCompanion,
  isPrivateChat,
  isUserTyping,
  userNameisTyping,
  chatId,
  setSubscriptionRooms,
  setIsShowJoinBtn,
  setIsChatVisible,
  listOfOnlineUsersStatuses,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const userName = useSelector(getUser)?.userName;
  const showUserIsTyping = userNameisTyping !== userName && isUserTyping;
  const nameOfChat = isPrivateChat ? selectedCompanion.userName : chatName;
  const userStatus = listOfOnlineUsersStatuses.get(
    selectedCompanion?.id.toString()
  );

  const isOnline = userStatus ? userStatus.isOnline : false;

  const firstLetterOfName = selectedCompanion?.userName
    .substr(0, 1)
    .toUpperCase();

  const getMessage = () => {
    if (showUserIsTyping) {
      return `${userNameisTyping} is typing...`;
    }

    if (isPrivateChat && isOnline) {
      return 'online';
    }

    if (isPrivateChat) {
      return '';
    }

    return `${participantsAmount} participants`;
  };

  const handleOpen = () => {
    if (!isPrivateChat) {
      setOpenModal(true);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleBackToSearchBar = () => {
    setIsChatVisible(false);
  };

  return (
    <ChatHeaderStyled>
      <MobileHeaderStyled>
        <HeaderButton onClick={handleBackToSearchBar}>
          <BackIcon />
        </HeaderButton>
        <MobileHeaderContentStyled>
          {isPrivateChat ? (
            <LetterAvatarStyled>{firstLetterOfName}</LetterAvatarStyled>
          ) : (
            <FlagImg
              loading="lazy"
              width="36"
              srcSet={`https://flagcdn.com/${flagCode}.svg 2x`}
              src={`https://flagcdn.com/${flagCode}.svg`}
              alt={`${flagCode} flag`}
            />
          )}

          <div>
            <h5>{nameOfChat}</h5>
            <p>{getMessage()}</p>
          </div>
        </MobileHeaderContentStyled>
        {!isPrivateChat && (
          <HeaderButton onClick={handleOpen}>
            <OpenCountryInfoIcon />
          </HeaderButton>
        )}
      </MobileHeaderStyled>

      <DesktopHeaderStyled onClick={handleOpen}>
        <h5>{nameOfChat}</h5>
        <p>{getMessage()}</p>
      </DesktopHeaderStyled>

      <CountryInfo
        isOpen={openModal}
        onClose={handleClose}
        countryName={chatName}
        participantsAmount={participantsAmount || 0}
        setParticipantsAmount={setParticipantsAmount}
        chatId={chatId}
        setSubscriptionRooms={setSubscriptionRooms}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setIsChatVisible={setIsChatVisible}
      />
    </ChatHeaderStyled>
  );
};

ChatHeader.propTypes = {
  chatName: PropTypes.string,
  participantsAmount: PropTypes.number,
  setParticipantsAmount: PropTypes.func,
  flagCode: PropTypes.string,
  selectedCompanion: PropTypes.shape({
    id: PropTypes.number,
    userName: PropTypes.string,
    userEmail: PropTypes.string,
  }),
  isPrivateChat: PropTypes.bool,
  isUserTyping: PropTypes.bool,
  userNameisTyping: PropTypes.string,
  chatId: PropTypes.number,
  setSubscriptionRooms: PropTypes.func,
  setIsShowJoinBtn: PropTypes.func,
  setIsChatVisible: PropTypes.func,
};

export default ChatHeader;
