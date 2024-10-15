import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/constants/constants';
import { Flag, ScrollBar } from '@/components/SearchInput/SearchInputStyled.js';
import {
  ListStyled,
  Item,
  Text,
  ListItems,
  UnreadMessagesCount,
  ChatNameBox,
} from './RoomsListStyled';

const RoomsList = () => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { responseData } = useFetch(
    selectedCountry ? ULRs.getMainCountryChatByName(selectedCountry) : null
  );

  const {
    setChatData,
    subscriptionRooms,
    setIsSubscribed,
    setIsShowJoinBtn,
    setIsChatVisible,
    setParticipantsAmount,
  } = useOutletContext();

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
                    srcSet={`https://flagcdn.com/w40/${room.country.flagCode}.png 2x`}
                    src={`https://flagcdn.com/w20/${room.country.flagCode}.png`}
                    alt={`${room.country.flagCode} flag`}
                  />
                  <p>{room.name}</p>
                </ChatNameBox>
                {room.unreadMessagesCount > 0 && (
                  <UnreadMessagesCount>
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
