import {
  RoomsListStyled,
  Text,
  Item,
  ListItems,
  ScrollBar,
} from './RoomsListStyled';

const RoomsList = () => {
  const rooms = [];

  const handleClick = () => {};

  return (
    <RoomsListStyled>
      {rooms?.length ? (
        <ListItems>
          <ScrollBar>
            {rooms.map(room => (
              <Item key={room} onClick={handleClick}>
                <p>{room}</p>
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
    </RoomsListStyled>
  );
};

export default RoomsList;
