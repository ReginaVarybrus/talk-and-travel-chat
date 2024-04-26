import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import { axiosClient } from '@/services/api';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { getUser } from '@/redux-store/selectors.js';
import { ListStyled, Text, Item, ListItems } from './RoomsListStyled';
import { Flag, ScrollBar } from '../SearchInput/SearchInputStyled.js';

const RoomsList = () => {
  const [countryRooms, setCountryRooms] = useState([]);
  const userId = useSelector(getUser)?.id;
  const { openCountryRoom } = useWebSocket();
  // const countryRooms = useSelector(getCountryData)?.countryRooms;

  const getCountryRooms = async () => {
    try {
      const { data } = await axiosClient.get(
        `countries/all-by-user/${userId}/participating`
      );
      setCountryRooms(data);
    } catch (error) {
      console.error('Error fetching country rooms:', error);
    }
  };

  useEffect(() => {
    getCountryRooms();
  }, [userId]);

  const handleOpenCountryRoom = () => {
    openCountryRoom();
  };

  return (
    <ListStyled>
      {countryRooms.length ? (
        <ListItems>
          <ScrollBar>
            {countryRooms.map(room => (
              <Item key={room.id} onClick={handleOpenCountryRoom}>
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
