import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
import { getUser } from '@/redux-store/selectors.js';
import { ListStyled, Text, Item, ListItems } from './RoomsListStyled';
import { Flag, ScrollBar } from '../SearchInput/SearchInputStyled.js';

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
                  width="32"
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
