import { LuLogOut } from 'react-icons/lu';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaRegMessage } from 'react-icons/fa6';
import Modal from '@mui/material/Modal';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
import mapData from '@/data/countries.json';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';

import {
  BoxStyled,
  ContactsList,
  ContactsBoxStyled,
  ButtonsBoxStyled,
  Flag,
  Item,
  Avatar,
  CloseBtn,
  UserBoxStyled,
  MessageBtn,
  NameBoxStyled,
  HeaderStyled,
  ExitBtn,
  ReportBtn,
  Subtitle,
  LetterAvatar,
} from './CountryInfoStyled.js';

const CountryInfo = ({
  isOpen,
  onClose,
  countryName,
  participantsAmount,
  setSubscriptionCountryRooms,
  countryChatId,
}) => {
  const userId = useSelector(getUser)?.id;
  const { sendEvent } = useWebSocket();

  const handleLeaveGroup = () => {
    const dataEventToSend = {
      authorId: userId,
      chatId: countryChatId,
    };
    sendEvent(dataEventToSend, ULRs.leaveOutGroupChat);
    setSubscriptionCountryRooms(prevRooms =>
      prevRooms.filter(room => room.name !== countryName)
    );
    onClose();
  };
  const url = countryChatId && ULRs.getChatsParticipants(countryChatId);
  const { responseData: participants } = useFetch(url, '');

  if (!countryName) {
    return null;
  }

  const countryData = mapData.features.find(
    country =>
      country.properties.ADMIN.toLowerCase() === countryName.toLowerCase()
  );

  const hasMembers = Array.isArray(participants) && participants.length > 0;
  return (
    <Modal
      aria-labelledby="country-info-title"
      aria-describedby="country-info-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
    >
      <BoxStyled>
        <CloseBtn type="button" onClick={onClose}>
          <IoCloseOutline />
        </CloseBtn>
        <HeaderStyled>
          <Flag
            loading="lazy"
            srcSet={`https://flagcdn.com/w40/${countryData.properties.code}.png 2x`}
            src={`https://flagcdn.com/w20/${countryData.properties.code}.png`}
            alt={`${countryData.properties.ADMIN} flag`}
          />
          <NameBoxStyled>
            <h5>{countryName}</h5>
            <p>{`${participantsAmount}`} members</p>
          </NameBoxStyled>
        </HeaderStyled>

        {!hasMembers ? (
          <Subtitle>There are no members here yet. Be the first.</Subtitle>
        ) : (
          <ContactsBoxStyled>
            <ContactsList>
              {participants?.map(user => (
                <Item key={user.id}>
                  <Avatar>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.userName} />
                    ) : (
                      <LetterAvatar>
                        {user.userName.charAt(0).toUpperCase()}
                      </LetterAvatar>
                    )}
                  </Avatar>
                  <UserBoxStyled>
                    <h5>{user.userName}</h5>
                    <p>{user.userEmail}</p>
                  </UserBoxStyled>
                  <MessageBtn type="button">
                    <FaRegMessage />
                  </MessageBtn>
                </Item>
              ))}
            </ContactsList>
          </ContactsBoxStyled>
        )}

        <ButtonsBoxStyled>
          <ExitBtn type="button" onClick={handleLeaveGroup}>
            <LuLogOut />
            Leave group
          </ExitBtn>
          <ReportBtn type="button">
            <HiOutlineExclamationCircle />
            Report
          </ReportBtn>
        </ButtonsBoxStyled>
      </BoxStyled>
    </Modal>
  );
};
export default CountryInfo;
