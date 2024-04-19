import { useSelector } from 'react-redux';
import { getCountryData } from '@/redux-store/selectors.js';
import { ListStyled, Text, Item, ListItems } from './RoomsListStyled';
import { Flag, ScrollBar } from '../SearchInput/SearchInputStyled.js';

const RoomsList = () => {
  const countryRooms = useSelector(getCountryData);

  const handleClick = () => {};

  return (
    <ListStyled>
      <ScrollBar>
        {countryRooms?.length ? (
          <ListItems>
            <ScrollBar>
              {countryRooms.map(room => (
                <Item key={room} onClick={handleClick}>
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
      </ScrollBar>
    </ListStyled>
  );
};

export default RoomsList;
