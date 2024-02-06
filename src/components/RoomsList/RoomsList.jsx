import React from 'react';

import { Wrapper, Text, Item, ListItems } from './RoomsListStyled';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const RoomsList = () => {
  const rooms = [];

  const handleClick = () => {};

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
              <p>{room}</p>
            </Item>
          ))}
        </SimpleBar>
      </ListItems>
    </Wrapper>
  );
};

export default RoomsList;
