import { LuLogOut } from 'react-icons/lu';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaRegMessage } from 'react-icons/fa6';
import Modal from '@mui/material/Modal';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
import mapData from '@/data/countries.json';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { routesPath } from '@/routes/routesConfig.jsx';
import { axiosClient } from '@/services/api.js';

import {
  BoxStyled,
  ContactsList,
  ContactsBoxStyled,
  ButtonsBoxStyled,
  Flag,
  Item,
  Avatar,
  CloseBtn,
  InfoBoxStyled,
  HeaderStyled,
  ExitBtn,
  ReportBtn,
  Subtitle,
  LetterAvatar,
  UserContactInfo,
  SendMessageBtn,
} from './CountryInfoStyled.js';

const CountryInfo = ({
  isOpen,
  onClose,
  countryName,
  participantsAmount,
  setSubscriptionCountryRooms,
  chatId,
}) => {
  const currentUserId = useSelector(getUser)?.id;
  const { sendEvent } = useWebSocket();
  const navigate = useNavigate();

  const { responseData: dataUserChats } = useFetch(
    ULRs.getPrivateChats(currentUserId, '')
  );

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
        const response = await axiosClient.post(ULRs.createPrivateChat, {
          userId: currentUserId,
          companionId: id,
        });
        const privateChatId = response.data;
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
      authorId: currentUserId,
      chatId,
    };
    sendEvent(dataEventToSend, ULRs.leaveOutGroupChat);
    setSubscriptionCountryRooms(prevRooms =>
      prevRooms.filter(room => room.name !== countryName)
    );
    onClose();
  };
  const url = chatId && ULRs.getChatsParticipants(chatId);
  const { responseData: participants } = useFetch(url, '');

  if (!isOpen || !countryName || !chatId) {
    return null;
  }

  const countryData = mapData.features.find(
    country =>
      country.properties.ADMIN.toLowerCase() === countryName.toLowerCase()
  );

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
            srcSet={`https://flagcdn.com/w40/${countryData.properties.code}.png 2x`}
            src={`https://flagcdn.com/w20/${countryData.properties.code}.png`}
            alt={`${countryData.properties.ADMIN} flag`}
          />
          <InfoBoxStyled>
            <h5>{countryName}</h5>
            <p>{participantsAmount} members</p>
          </InfoBoxStyled>
        </HeaderStyled>

        {!hasParticipants ? (
          <Subtitle>There are no members here yet. Be the first.</Subtitle>
        ) : (
          <ContactsBoxStyled>
            <ContactsList>
              {participants?.map(user => (
                <Item key={user.id}>
                  <Avatar>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.userName}
                        width="48"
                        height="48"
                      />
                    ) : (
                      <LetterAvatar>
                        {user.userName.charAt(0).toUpperCase()}
                      </LetterAvatar>
                    )}
                  </Avatar>
                  <UserContactInfo>
                    <h5>{user.userName}</h5>
                    <p>{user.userEmail}</p>
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
              ))}
            </ContactsList>
          </ContactsBoxStyled>
        )}

        <ButtonsBoxStyled>
          <ExitBtn onClick={handleLeaveGroup}>
            <LuLogOut />
            Leave group
          </ExitBtn>
          <ReportBtn>
            <HiOutlineExclamationCircle />
            Report
          </ReportBtn>
        </ButtonsBoxStyled>
      </BoxStyled>
    </Modal>
  );
};
export default CountryInfo;
