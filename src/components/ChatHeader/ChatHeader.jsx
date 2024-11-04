import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import CountryInfo from '@/components/CountryInfo/CountryInfo';
import { formatDateOfLastSeen } from '@/components/utils/dateUtil.js';
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
  chatData,
  participantsAmount,
  setParticipantsAmount,
  flagCode,
  selectedCompanion,
  isPrivateChat,
  usersTyping,
  chatId,
  setIsShowJoinBtn,
  setIsChatVisible,
  listOfOnlineUsersStatuses,
  isShowJoinBtn,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const currentUserName = useSelector(getUser)?.userName;
  const nameOfChat = isPrivateChat ? selectedCompanion.userName : chatName;
  const userStatus = listOfOnlineUsersStatuses.get(
    selectedCompanion?.id.toString()
  );

  const isOnline = userStatus ? userStatus.isOnline : false;

  const firstLetterOfName = selectedCompanion?.userName
    .substr(0, 1)
    .toUpperCase();

  const getMessage = () => {
    const usersTypingWithoutCurrent = usersTyping.filter(
      user => user !== currentUserName
    );
    if (!usersTyping || usersTypingWithoutCurrent.length === 0) {
      if (isPrivateChat && isOnline) {
        return 'online';
      }
      if (isPrivateChat && userStatus.lastSeenOn) {
        return formatDateOfLastSeen(userStatus.lastSeenOn);
      }
      if (isPrivateChat) {
        return '';
      }
      if (!isPrivateChat) {
        return `${participantsAmount} participants`;
      }
    }

    const firstUser = usersTyping[0];
    const othersCount = usersTyping.length - 1;

    if (othersCount === 0) {
      return `${firstUser} is typing...`;
    }
    if (othersCount === 1) {
      return `${firstUser} and 1 other are typing...`;
    }
    return `${firstUser} and ${othersCount} others are typing...`;
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
        chatData={chatData}
        isOpen={openModal}
        onClose={handleClose}
        countryName={chatName}
        participantsAmount={participantsAmount || 0}
        setParticipantsAmount={setParticipantsAmount}
        listOfOnlineUsersStatuses={listOfOnlineUsersStatuses}
        chatId={chatId}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setIsChatVisible={setIsChatVisible}
        isShowJoinBtn={isShowJoinBtn}
      />
    </ChatHeaderStyled>
  );
};

ChatHeader.propTypes = {
  chatName: PropTypes.string,
  chatData: PropTypes.shape({
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
  participantsAmount: PropTypes.number,
  setParticipantsAmount: PropTypes.func,
  flagCode: PropTypes.string,
  selectedCompanion: PropTypes.shape({
    id: PropTypes.number,
    userName: PropTypes.string,
    userEmail: PropTypes.string,
  }),
  isPrivateChat: PropTypes.bool,
  usersTyping: PropTypes.array,
  chatId: PropTypes.number,
  setIsShowJoinBtn: PropTypes.func,
  setIsChatVisible: PropTypes.func,
  listOfOnlineUsersStatuses: PropTypes.instanceOf(Map),
  isShowJoinBtn: PropTypes.bool,
};

export default ChatHeader;
