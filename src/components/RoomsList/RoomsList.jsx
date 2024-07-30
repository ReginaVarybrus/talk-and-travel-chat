import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import ULRs from '@/redux-store/constants';
import { getUser } from '@/redux-store/selectors.js';
import { ListStyled, Text, Item, ListItems } from './RoomsListStyled';
import { Flag, ScrollBar } from '../SearchInput/SearchInputStyled.js';

const RoomsList = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const userId = useSelector(getUser)?.id;
  const { stompClient, subscribeToCountryRoom, openCountryRoom } =
    useWebSocket();
  const { responseData } = useFetch(ULRs.userCountries(userId));
  const context = useOutletContext();
  const {
    onCountryRoomDataReceived,
    subscriptionCountryRooms,
    setSubscriptionCountryRooms,
  } = context;

  useEffect(() => {
    if (responseData && userId) {
      setSubscriptionCountryRooms(responseData);
    } else {
      console.log('responseData & userID', responseData, userId);
    }
  }, [responseData, userId]);

  useEffect(() => {
    if (stompClient && selectedCountry) {
      const countryRoom = subscriptionCountryRooms.find(
        room => room.name === selectedCountry
      );
      const dataToSend = {
        countryName: countryRoom?.name,
        flagCode: countryRoom?.flagCode,
        userId,
      };

      subscribeToCountryRoom(
        userId,
        selectedCountry,
        onCountryRoomDataReceived
      );
      openCountryRoom(dataToSend);
    }
  }, [stompClient, selectedCountry]);

  const handleOpenCountryRoom = countryName => {
    setSelectedCountry(countryName);
  };

  return (
    <ListStyled>
      {subscriptionCountryRooms.length ? (
        <ListItems>
          <ScrollBar>
            {subscriptionCountryRooms.map((room, id) => (
              <Item key={id} onClick={() => handleOpenCountryRoom(room.name)}>
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
