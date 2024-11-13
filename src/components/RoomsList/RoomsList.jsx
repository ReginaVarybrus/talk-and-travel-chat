import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import { useFetch } from '@/hooks/useFetch.js';
import URLs from '@/constants/constants.js';
import { Flag, ScrollBar } from '@/components/SearchInput/SearchInputStyled.js';
import { useChatContext } from '@/providers/ChatProvider';
import {
  ListStyled,
  Item,
  Text,
  ListItems,
  UnreadMessagesCount,
  ChatNameBox,
  ChatName,
} from './RoomsListStyled';

const RoomsList = () => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { responseData } = useFetch(
    selectedCountry ? URLs.getMainCountryChatByName(selectedCountry) : null
  );

  const {
    setChatData,
    setIsSubscribed,
    setIsShowJoinBtn,
    setIsChatVisible,
    setParticipantsAmount,
    setChatOpenedTime,
  } = useOutletContext();
  const { subscriptionRooms } = useChatContext();

  useEffect(() => {
    if (responseData) {
      setChatData(responseData);
      setParticipantsAmount(responseData.usersCount);
      setIsSubscribed(true);
    }
  }, [responseData, setChatData, setIsSubscribed]);

  const handleOpenCountryRoom = countryName => {
    setSelectedCountry(countryName);
    setIsShowJoinBtn(false);
    setChatOpenedTime(new Date());
    if (!isDesktop) {
      setIsChatVisible(true);
    }
  };

  return (
    <ListStyled>
      {subscriptionRooms.length ? (
        <ListItems>
          <ScrollBar>
            {subscriptionRooms.map(room => (
              <Item
                key={room.country.flagCode}
                onClick={() => handleOpenCountryRoom(room.name)}
                $isActive={room.name === selectedCountry}
              >
                <ChatNameBox>
                  <Flag
                    loading="lazy"
                    width="48"
                    srcSet={`https://flagcdn.com/${room.country.flagCode}.svg 2x`}
                    src={`https://flagcdn.com/${room.country.flagCode}.svg`}
                    alt={`${room.country.flagCode} flag`}
                  />
                  <ChatName $isActive={room.name === selectedCountry}>
                    {room.name}
                  </ChatName>
                </ChatNameBox>
                {room.unreadMessagesCount > 0 && (
                  <UnreadMessagesCount
                    $isActive={room.name === selectedCountry}
                  >
                    {room.unreadMessagesCount}
                  </UnreadMessagesCount>
                )}
              </Item>
            ))}
          </ScrollBar>
        </ListItems>
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
