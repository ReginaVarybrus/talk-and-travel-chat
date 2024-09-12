import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
import { Flag, ScrollBar } from '../SearchInput/SearchInputStyled.js';
import { ListStyled, Text, Item, ListItems } from './RoomsListStyled';

const RoomsList = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { responseData: dataMainCountryChat } = useFetch(
    selectedCountry ? ULRs.getMainCountryChatByName(selectedCountry, '') : null
  );

  const { setCountryData, subscriptionCountryRooms, setIsSubscribed } =
    useOutletContext();

  useEffect(() => {
    if (dataMainCountryChat) {
      setCountryData(dataMainCountryChat);
      setIsSubscribed(true);
    }
  }, [dataMainCountryChat]);

  const handleOpenCountryRoom = countryName => {
    setSelectedCountry(countryName);
    console.log('country click');
  };

  return (
    <ListStyled>
      {subscriptionCountryRooms.length ? (
        <ListItems>
          <ScrollBar>
            {subscriptionCountryRooms.map(room => (
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
