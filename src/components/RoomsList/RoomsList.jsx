import React from 'react';

import {
  RoomsListStyled,
  Text,
  Item,
  ListItems,
  ScrollBar,
} from './RoomsListStyled';

function RoomsList() {
  const rooms = [];

  const handleClick = () => {};

  return (
    <RoomsListStyled>
      {rooms?.length && (
        <Text>
          There are no rooms in the list.
          <br /> Find chat of a country and it will be shown here
        </Text>
      )}
      <ListItems>
        <ScrollBar>
          {rooms.map(room => (
            <Item key={room} onClick={handleClick}>
              <p>{room}</p>
            </Item>
          ))}
        </ScrollBar>
      </ListItems>
    </RoomsListStyled>
  );
}

export default RoomsList;
