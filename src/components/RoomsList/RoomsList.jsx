import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import { useFetch } from '@/hooks/useFetch.js';
import URLs from '@/constants/constants.js';
import {
  Flag,
  ScrollBar,
  Item,
} from '@/components/SearchInput/SearchInputStyled.js';
import { ListStyled, Text, ListItems } from './RoomsListStyled';

const RoomsList = () => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { responseData } = useFetch(
    selectedCountry ? URLs.getMainCountryChatByName(selectedCountry) : null
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
                key={room.flagCode}
                onClick={() => handleOpenCountryRoom(room.name)}
              >
                <Flag
                  loading="lazy"
                  width="48"
                  srcSet={`https://flagcdn.com/w40/${room.flagCode}.png 2x`}
                  src={`https://flagcdn.com/w20/${room.flagCode}.png`}
                  alt={`${room.flagCode} flag`}
                />
                <p>{room.name}</p>
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
