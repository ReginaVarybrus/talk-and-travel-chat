import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';

import { Flag, ScrollBar } from '../SearchInput/SearchInputStyled.js';
import { ListStyled, Text, Item, ListItems } from './RoomsListStyled';

const RoomsList = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const userId = useSelector(getUser)?.id;

  const { responseData: dataUserCountries } = useFetch(
    ULRs.userCountries(userId, '')
  );
  const { responseData: dataMainCountryChat } = useFetch(
    selectedCountry ? ULRs.getMainCountryChatByName(selectedCountry, '') : null
  );

  const {
   
    setChatData,
    setIsSubscribed,
    setIsShowJoinBtn,
   
    subscriptionRooms,
   
    setSubscriptionRooms,
 , setIsChatVisible,
  } = useOutletContext();

  useEffect(() => {
    if (dataUserCountries && userId) {
      setSubscriptionRooms(dataUserCountries);
    }
  }, [dataUserCountries, userId]);

  useEffect(() => {
    if (dataMainCountryChat) {
      setChatData(dataMainCountryChat);
      setIsSubscribed(true);
    }
  }, [dataMainCountryChat, setChatData, setIsSubscribed]);

  const handleOpenCountryRoom = countryName => {
    setSelectedCountry(countryName);
    setIsShowJoinBtn(false);
    setIsChatVisible(true);
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
