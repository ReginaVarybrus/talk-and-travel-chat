import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import { LuLogOut, LuLogIn } from 'react-icons/lu';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaRegMessage } from 'react-icons/fa6';
import Modal from '@mui/material/Modal';
import URLs from '@/constants/constants';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { useSelector } from 'react-redux';
import { getUser, getUsersStatuses } from '@/redux-store/selectors.js';
import { routesPath } from '@/routes/routesConfig.jsx';
import { axiosClient } from '@/services/api.js';
import { useChatContext } from '@/providers/ChatProvider';

import { Badge } from '@/components/MessageItem/MessageItemStyled.js';
import Loader from '@/components//Loader/Loader.jsx';
import {
  BoxStyled,
  ContactsList,
  ContactsBoxStyled,
  ButtonsBoxStyled,
  Flag,
  Item,
  Avatar,
  ImgAvatar,
  CloseBtn,
  InfoBoxStyled,
  HeaderStyled,
  ExitOrJoinBtn,
  ReportBtn,
  Subtitle,
  LetterAvatar,
  UserContactInfo,
  SendMessageBtn,
} from './CountryInfoStyled.js';

const CountryInfo = ({
  chatData,
  setChatData,
  isOpen,
  onClose,
  countryName,
  participantsAmount,
  setParticipantsAmount,
  chatId,
  setIsShowJoinBtn,
  setIsChatVisible,
  isShowJoinBtn,
  participants,
  loading,
}) => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  const currentUserId = useSelector(getUser)?.id;
  const usersStatuses = useSelector(getUsersStatuses);
  const { sendMessageOrEvent } = useWebSocket();
  const navigate = useNavigate();
  const { setSubscriptionRooms, dataUserChats, updateUserChats } =
    useChatContext();

  const checkExistingPrivateChat = id => {
    const isExist = dataUserChats?.find(chat => chat.companion.id === id);
    return isExist && isExist.chat.id;
  };

  const handleCreatePrivateChat = async (id, userName, userEmail) => {
    try {
      const existingChatId = checkExistingPrivateChat(id);

      if (existingChatId) {
        navigate(routesPath.DMS, {
          state: {
            privateChatId: existingChatId,
            companionObject: { id, userName, userEmail },
          },
        });
      } else {
        const response = await axiosClient.post(URLs.createPrivateChat, {
          companionId: id,
        });
        const privateChatId = response.data;
        await updateUserChats();
        navigate(routesPath.DMS, {
          state: {
            privateChatId,
            companionObject: { id, userName, userEmail },
          },
        });
      }
    } catch (error) {
      console.error('Error creating or navigating to private chat:', error);
    }
    onClose();
  };

  const handleLeaveGroup = () => {
    const dataEventToSend = {
      chatId,
    };
    sendMessageOrEvent(dataEventToSend, URLs.leaveOutGroupChat);
    setSubscriptionRooms(prevRooms =>
      prevRooms.filter(room => room.name !== countryName)
    );
    setParticipantsAmount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    if (!isDesktop) {
      setIsChatVisible(false);
    }
    setIsShowJoinBtn(true);
    setChatData(null);
    onClose();
  };

  const handleJoinToChat = () => {
    const dataEventToSend = {
      chatId,
    };
    sendMessageOrEvent(dataEventToSend, URLs.joinToGroupChat);
    setIsShowJoinBtn(false);
    setSubscriptionRooms(prevRooms => [...prevRooms, chatData]);
    setParticipantsAmount(prevCount => prevCount + 1);
    onClose();
  };

  if (!isOpen || !countryName || !chatId) {
    return null;
  }

  const hasParticipants =
    Array.isArray(participants) && participants.length > 0;

  return (
    <Modal
      aria-labelledby="country-info-title"
      aria-describedby="country-info-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
    >
      <BoxStyled>
        <CloseBtn onClick={onClose}>
          <IoCloseOutline />
        </CloseBtn>
        <HeaderStyled>
          <Flag
            loading="lazy"
            srcSet={`https://flagcdn.com/${chatData.country.flagCode.toLowerCase()}.svg 2x`}
            src={`https://flagcdn.com/${chatData.country.flagCode.toLowerCase()}.svg`}
            alt={`${countryName} flag`}
          />
          <InfoBoxStyled>
            <h5>{countryName}</h5>
            <p>{participantsAmount} members</p>
          </InfoBoxStyled>
        </HeaderStyled>
        <ContactsBoxStyled>
          {loading ? (
            <Loader size={40} />
          ) : !hasParticipants ? (
            <Subtitle>There are no members here yet. Be the first.</Subtitle>
          ) : (
            <ContactsList>
              {participants?.map(user => {
                const userStatus = usersStatuses.find(
                  userFind => userFind.userId === user.id
                );

                const isOnline = userStatus
                  ? userStatus.status.isOnline
                  : false;

                return (
                  <Item key={user.id}>
                    <Avatar>
                      {user.avatar ? (
                        <ImgAvatar
                          src={user.avatar.image50x50}
                          alt={`${user.userName}'s avatar`}
                        />
                      ) : (
                        <LetterAvatar>
                          {user.userName[0].toUpperCase()}
                        </LetterAvatar>
                      )}
                      {isOnline && <Badge />}
                    </Avatar>
                    <UserContactInfo>
                      <h5>{user.userName}</h5>
                      <p title={user.userEmail}>{user.userEmail}</p>
                    </UserContactInfo>
                    {user.id !== currentUserId && (
                      <SendMessageBtn
                        onClick={() =>
                          handleCreatePrivateChat(
                            user.id,
                            user.userName,
                            user.userEmail
                          )
                        }
                      >
                        <FaRegMessage />
                      </SendMessageBtn>
                    )}
                  </Item>
                );
              })}
            </ContactsList>
          )}
        </ContactsBoxStyled>

        <ButtonsBoxStyled>
          {isShowJoinBtn ? (
            <ExitOrJoinBtn onClick={handleJoinToChat}>
              <LuLogIn />
              Join to chat
            </ExitOrJoinBtn>
          ) : (
            <ExitOrJoinBtn onClick={handleLeaveGroup}>
              <LuLogOut />
              Leave group
            </ExitOrJoinBtn>
          )}
          <ReportBtn>
            <HiOutlineExclamationCircle />
            Report
          </ReportBtn>
        </ButtonsBoxStyled>
      </BoxStyled>
    </Modal>
  );
};

CountryInfo.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  countryName: PropTypes.string,
  participantsAmount: PropTypes.number,
  chatId: PropTypes.number,
  setIsShowJoinBtn: PropTypes.func,
};

export default CountryInfo;
