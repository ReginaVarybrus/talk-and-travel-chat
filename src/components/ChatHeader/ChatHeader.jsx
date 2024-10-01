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
}) => {
  const [openModal, setOpenModal] = useState(false);
  const userName = useSelector(getUser)?.userName;
  const showUserIsTyping = isUserTyping && userNameisTyping !== userName;
  const nameOfChat = isPrivateChat ? selectedCompanion.userName : chatName;
  const firstLetterOfName = selectedCompanion?.userName
    .substr(0, 1)
    .toUpperCase();

  const getMessage = () => {
    if (showUserIsTyping) {
      return `${userNameisTyping} is typing...`;
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
              srcSet={`https://flagcdn.com/w40/${flagCode}.png 2x`}
              src={`https://flagcdn.com/w20/${flagCode}.png`}
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
  chatId: PropTypes.number,
  isPrivateChat: PropTypes.bool,
  setSubscriptionRooms: PropTypes.func,
  isUserTyping: PropTypes.bool,
  userNameisTyping: PropTypes.string,
  setIsShowJoinBtn: PropTypes.func,
  setIsChatVisible: PropTypes.func,
};

export default ChatHeader;
