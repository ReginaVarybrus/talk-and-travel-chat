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
  const { responseData: dataUserCountries } = useFetch(ULRs.userCountries, '');
  const { responseData: dataMainCountryChat } = useFetch(
    selectedCountry ? ULRs.getMainCountryChatByName(selectedCountry, '') : null
  );

  const {
    setCountryData,
    subscriptionCountryRooms,
    setSubscriptionCountryRooms,
    setIsSubscribed,
  } = useOutletContext();

  useEffect(() => {
    if (dataUserCountries && userId) {
      setSubscriptionCountryRooms(dataUserCountries);
    }
  }, [dataUserCountries, userId]);

  useEffect(() => {
    if (dataMainCountryChat) {
      setCountryData(dataMainCountryChat);
      setIsSubscribed(true);
    }
  }, [dataMainCountryChat]);

  const handleOpenCountryRoom = countryName => {
    setSelectedCountry(countryName);
  };

  return (
    <ListStyled>
      {subscriptionCountryRooms.length ? (
        <ListItems>
          <ScrollBar>
            {subscriptionCountryRooms.map(room => (
              <Item
                key={room.id}
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
