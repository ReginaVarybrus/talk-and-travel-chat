import React from 'react';
// import { useSelector } from 'react-redux';
// import { countryRooms } from 'redux-store/AuthOperations/selectors';

import { Wrapper, Text, Item, ListItems } from './RoomsListStyled';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function RoomsList() {
  // const rooms = useSelector(countryRooms);
  const rooms = [];
  // const rooms = [
  //   'Ukraine', 
  //   'Ireland', 
  //   'Poland', 
  //   'Germany', 
  //   'Austria',
  //   'Canada',
  //   'China',
  //   'Georgia',
  //   'Latvia'
  // ];
  // const [countryRoom, setCountryRoom] = useState([]);

  //   const addCountry = () => {
  //     setCountryRoom([...countryRoom]);
  // };

  const handleClick = () => {

  };

  return (
    <Wrapper>
      {rooms.length === 0 && (
        <Text>
          There are no rooms in the list.
          <br /> Find chat of a country and it will be shown here
        </Text>
      )}
      <ListItems>
        <SimpleBar style={{ maxHeight: 570 }}>
          {rooms.map(room => (
            <Item key={room} onClick={handleClick}>
              {/* <Flag
            loading="lazy"
            width="32"
            srcSet={`https://flagcdn.com/w40/${country.properties.code}.png 2x`}
            src={`https://flagcdn.com/w20/${country.properties.code}.png`}
            alt={`${country.properties.ADMIN} flag`}
            /> */}
              <p>{room}</p>
            </Item>
          ))}
        </SimpleBar>
      </ListItems>
    </Wrapper>
  );
}
