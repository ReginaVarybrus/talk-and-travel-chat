import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import { useFetch } from '@/hooks/useFetch.js';
import URLs from '@/constants/constants.js';
import { Flag } from '@/components/SearchInput/SearchInputStyled.js';
import { useChatContext } from '@/providers/ChatProvider';
import {
  ListStyled,
  Item,
  Text,
  ListItemsStyled,
  UnreadMessagesCount,
  ChatNameBox,
  ChatName,
} from './RoomsListStyled';

const RoomsList = () => {
  const isDesktop = useMediaQuery({ query: device.tablet });

  const {
    setChatData,
    setIsSubscribed,
    setIsShowJoinBtn,
    setIsChatVisible,
    setParticipantsAmount,
    setChatOpenedTime,
    selectedChat,
    setSelectedChat,
  } = useOutletContext();

  const { responseData } = useFetch(
    selectedChat ? URLs.getMainCountryChatByName(selectedChat) : null
  );

  const { subscriptionRooms } = useChatContext();

  useEffect(() => {
    if (responseData) {
      setChatData(responseData);
      setParticipantsAmount(responseData.usersCount);
      setIsSubscribed(true);
    }
  }, [responseData, setChatData, setIsSubscribed]);

  const handleOpenCountryRoom = countryName => {
    setSelectedChat(countryName);
    setIsShowJoinBtn(false);
    setChatOpenedTime(new Date());
    if (!isDesktop) {
      setIsChatVisible(true);
    }
  };

  return (
    <ListStyled>
      {subscriptionRooms.length ? (
        <ListItemsStyled>
          {subscriptionRooms.map(room => (
            <Item
              key={room.country.flagCode}
              onClick={() => handleOpenCountryRoom(room.name)}
              $isActive={room.name === selectedChat}
            >
              <ChatNameBox>
                <Flag
                  loading="lazy"
                  width="48"
                  srcSet={`https://flagcdn.com/${room.country.flagCode}.svg 2x`}
                  src={`https://flagcdn.com/${room.country.flagCode}.svg`}
                  alt={`${room.country.flagCode} flag`}
                />
                <ChatName $isActive={room.name === selectedChat}>
                  {room.name}
                </ChatName>
              </ChatNameBox>
              {room.unreadMessagesCount > 0 && (
                <UnreadMessagesCount $isActive={room.name === selectedChat}>
                  {room.unreadMessagesCount}
                </UnreadMessagesCount>
              )}
            </Item>
          ))}
        </ListItemsStyled>
      ) : (
        <Text>
          There are no rooms in the list.
          <br /> Find chat of a country and it will be shown here
        </Text>
      )}
    </ListStyled>
  );
};

export default RoomsList;
