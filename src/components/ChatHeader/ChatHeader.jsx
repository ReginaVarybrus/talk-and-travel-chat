import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { axiosClient } from '@/services/api';
import URLs from '@/constants/constants';
import { getUser, getUsersStatuses } from '@/redux-store/selectors.js';
import CountryInfo from '@/components/CountryInfo/CountryInfo';
import { formatDateOfLastSeen } from '@/components/utils/dateUtil.js';
import UserInfoModal from '@/components/UserInfoModal/UserInfoModal';
import {
  ChatHeaderStyled,
  MobileHeaderStyled,
  DesktopHeaderStyled,
  MobileHeaderContentStyled,
  LetterAvatarStyled,
  BackIcon,
  FlagImg,
  OpenCountryInfoIcon,
  HeaderButtonBack,
  HeaderButtonOpenMenu,
  FlagBoxStyled,
  MobileAvatarImg,
} from './ChatHeaderStyled';

const ChatHeader = ({
  chatName = 'Country name',
  chatData,
  setChatData,
  participantsAmount,
  setParticipantsAmount,
  flagCode,
  selectedCompanion,
  isPrivateChat,
  usersTyping,
  chatId,
  setIsShowJoinBtn,
  setIsChatVisible,
  isShowJoinBtn,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDMs, setOpenModalDMs] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUserName = useSelector(getUser)?.userName;
  const [userInfo, setUserInfo] = useState(null);
  const usersStatuses = useSelector(getUsersStatuses);
  const nameOfChat = isPrivateChat ? selectedCompanion.userName : chatName;
  const userStatus = usersStatuses.find(
    user => user.userId === selectedCompanion?.id
  );

  const isOnline = userStatus ? userStatus.status.isOnline : false;

  const getMessage = () => {
    const usersTypingWithoutCurrent = usersTyping.filter(
      user => user !== currentUserName
    );
    if (!usersTyping || usersTypingWithoutCurrent.length === 0) {
      if (isPrivateChat && isOnline) {
        return 'online';
      }
      if (isPrivateChat && userStatus.status.lastSeenOn) {
        return formatDateOfLastSeen(userStatus.status.lastSeenOn);
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

  const fetchParticipants = async () => {
    if (!chatId) return;
    setLoading(true);
    try {
      const response = await axiosClient.get(URLs.getChatsParticipants(chatId));
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = async userId => {
    try {
      const userInfoResponse = await axiosClient.get(URLs.userInfo(userId));
      setUserInfo(userInfoResponse.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleOpen = () => {
    if (!isPrivateChat) {
      fetchParticipants();
      setOpenModal(true);
    } else {
      fetchUserInfo(selectedCompanion.id);
      setOpenModalDMs(true);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalDMs(false);
  };

  const handleBackToSearchBar = () => {
    setIsChatVisible(false);
  };

  return (
    <ChatHeaderStyled>
      <MobileHeaderStyled>
        <HeaderButtonBack onClick={handleBackToSearchBar}>
          <BackIcon />
        </HeaderButtonBack>
        <MobileHeaderContentStyled onClick={handleOpen}>
          {isPrivateChat ? (
            selectedCompanion.avatar ? (
              <MobileAvatarImg
                src={selectedCompanion.avatar?.image50x50}
                alt={selectedCompanion.userName}
              />
            ) : (
              <LetterAvatarStyled>
                {selectedCompanion.userName[0].toUpperCase()}
              </LetterAvatarStyled>
            )
          ) : (
            <FlagBoxStyled>
              <FlagImg
                loading="lazy"
                width="36"
                srcSet={`https://flagcdn.com/${flagCode}.svg 2x`}
                src={`https://flagcdn.com/${flagCode}.svg`}
                alt={`${flagCode} flag`}
              />
            </FlagBoxStyled>
          )}
          <div>
            <h5>{nameOfChat}</h5>
            <p>{getMessage()}</p>
          </div>
          <HeaderButtonOpenMenu>
            <OpenCountryInfoIcon />
          </HeaderButtonOpenMenu>
        </MobileHeaderContentStyled>
      </MobileHeaderStyled>
      <DesktopHeaderStyled onClick={handleOpen}>
        <h5>{nameOfChat}</h5>
        <p>{getMessage()}</p>
      </DesktopHeaderStyled>
      <CountryInfo
        chatData={chatData}
        setChatData={setChatData}
        isOpen={openModal}
        onClose={handleClose}
        countryName={chatName}
        participantsAmount={participantsAmount || 0}
        setParticipantsAmount={setParticipantsAmount}
        chatId={chatId}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setIsChatVisible={setIsChatVisible}
        isShowJoinBtn={isShowJoinBtn}
        participants={participants}
        loading={loading}
      />
      <UserInfoModal
        open={openModalDMs}
        handleClose={handleClose}
        isPrivateChat={isPrivateChat}
        chatId={chatId}
        chatData={chatData}
        setChatData={setChatData}
        userAvatarUrl={userInfo?.avatar?.image256x256}
        userName={userInfo?.userName}
        userEmail={userInfo?.userEmail}
        about={userInfo?.about}
        id={userInfo?.id}
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
  isShowJoinBtn: PropTypes.bool,
};

export default ChatHeader;
